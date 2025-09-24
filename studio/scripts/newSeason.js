#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const seasonNumber = process.argv[2];
if (!seasonNumber) {
  console.error('❌ Please provide a season number');
  process.exit(1);
}

const datasetName = `season${seasonNumber}`;
const prevSeasonNumber = parseInt(seasonNumber) - 1;
const prevDatasetName = `season${prevSeasonNumber}`;

// Step 1: Export previous season
console.log('🔄 Exporting previous season...');
const seasonDataDir = path.join(__dirname, '../season_data');
if (!fs.existsSync(seasonDataDir)) {
  fs.mkdirSync(seasonDataDir, { recursive: true });
}
try {
  const exportPath = path.join(
    __dirname,
    '../season_data',
    `${prevDatasetName}.tar.gz`
  );
  execSync(`sanity dataset export ${prevDatasetName} ${exportPath}`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });
  console.log('✅ Previous season exported successfully');
} catch (error) {
  console.error('❌ Failed to export previous season:');
  console.error(error.message);
  process.exit(1);
}

// Step 2: Delete previous dataset
console.log('🔄 Deleting previous dataset...');
try {
  execSync(`sanity dataset delete ${prevDatasetName} --force`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });
  console.log('✅ Previous dataset deleted successfully');
} catch (error) {
  console.error('❌ Failed to delete previous dataset:');
  console.error(error.message);
  process.exit(1);
}

// Step 3: Create new dataset
console.log('🔄 Creating new dataset...');
try {
  execSync(`sanity dataset create ${datasetName} --visibility private`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });
  console.log('✅ New dataset created successfully');
} catch (error) {
  console.error('❌ Failed to create new dataset:');
  console.error(error.message);
  process.exit(1);
}

// Step 4: Backup and update sanity.json
console.log('🔄 Updating sanity.json...');
const backupDir = path.join(__dirname, '../backup_data');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}
try {
  const sanityConfigPath = path.join(__dirname, '../sanity.json');
  const sanityConfig = require(sanityConfigPath);
  const backupFile = path.join(
    backupDir,
    path.basename(sanityConfigPath) + `-${prevDatasetName}_backup.json`
  );

  // Create backup
  fs.copyFileSync(sanityConfigPath, backupFile);

  // Update configuration
  sanityConfig.api.dataset = datasetName;
  sanityConfig.__experimental_spaces[1].name = datasetName;
  sanityConfig.__experimental_spaces[1].api.dataset = datasetName;
  sanityConfig.__experimental_spaces[1].title = `Season ${seasonNumber}`;

  fs.writeFileSync(sanityConfigPath, JSON.stringify(sanityConfig, null, 2));
  console.log('✅ sanity.json updated successfully');
} catch (error) {
  console.error('❌ Failed to update sanity.json:');
  console.error(error.message);
  process.exit(1);
}

// Step 5: Backup and update Client.js
console.log('🔄 Updating Client.js...');
try {
  const clientPath = path.join(__dirname, '../../web/components/Client.js');
  const clientBackupFile = path.join(
    backupDir,
    path.basename(clientPath) + `-${prevDatasetName}_backup.js`
  );

  // Create backup
  fs.copyFileSync(clientPath, clientBackupFile);

  // Update file
  const clientContent = `
const sanityClient = require('@sanity/client');
const Client = sanityClient({
  projectId: '806pz8zb',
  dataset: process.env.SANITY_DEVELOPMENT_DATASET || '${datasetName}',
  apiVersion: '2022-02-08', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // 'false' if you want to ensure fresh data
});

export default Client;

`;
  fs.writeFileSync(clientPath, clientContent);
  console.log('✅ Client.js updated successfully');
} catch (error) {
  console.error('❌ Failed to update Client.js:');
  console.error(error.message);
  process.exit(1);
}

// Step 6: Redeploy studio
console.log('🔄 Redeploying Sanity Studio...');
try {
  execSync('sanity undeploy && sanity deploy', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });
  console.log('✅ Sanity Studio redeployed successfully');
} catch (error) {
  console.error('❌ Failed to redeploy Sanity Studio:');
  console.error(error.message);
  process.exit(1);
}

console.log(`
✅ Season ${seasonNumber} setup complete!

📝 Manual steps remaining:
1. Update sign-up hide time in web/pages/signup.js
2. Update season link in web/pages/index.js
3. Add new survivors in studio
4. Set up weekly reminders
`);
