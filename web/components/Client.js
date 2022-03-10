const sanityClient = require('@sanity/client');
const Client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'season42',
  apiVersion: '2022-02-08', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

export default Client;
