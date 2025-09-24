#!/usr/bin/env node
const sanityClient = require('@sanity/client');

const fs = require('fs');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../web/.env.local'),
});
const seasonNumber = process.argv[2];
if (!seasonNumber) {
  console.error('❌ Please provide a season number');
  process.exit(1);
}

const datasetName = `season${seasonNumber}`;

async function createSurvivors() {
  try {
    // Read survivors from config
    const survivorsConfigPath = path.join(__dirname, 'survivors.json');
    if (!fs.existsSync(survivorsConfigPath)) {
      console.error('❌ survivors.json not found');
      process.exit(1);
    }

    const survivorsConfig = require(survivorsConfigPath);
    const survivors = survivorsConfig[`season${seasonNumber}`];

    if (!survivors || survivors.length === 0) {
      console.error(
        `❌ No survivors found for season${seasonNumber} in config`
      );
      process.exit(1);
    }

    // Initialize Sanity client
    const client = sanityClient({
      projectId: '806pz8zb',
      dataset: datasetName,
      apiVersion: '2022-02-08',
      token: process.env.SANITY_TOKEN,
      useCdn: false,
    });

    // Create survivors
    console.log('🔄 Creating survivors...');
    for (const survivor of survivors) {
      await client.create({
        _type: 'survivor',
        eliminated: false,
        episodeScores: [],
        totalScore: 0,
        name: survivor.name,
        nickname: survivor.nickname || '',
        tribeColor: 'none',
      });
      console.log(`✅ Created survivor: ${survivor.name}`);
    }

    console.log('✅ All survivors created successfully');
  } catch (error) {
    console.error('❌ Failed to create survivors:');
    console.error(error.message);
    process.exit(1);
  }
}

createSurvivors();
