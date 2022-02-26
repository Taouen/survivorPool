const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'development',
  apiVersion: '2022-02-08', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

export default async function handler(req, res) {
  const usernames = await client.fetch('*[_type == "player"] {username}');

  res.status(200).json(usernames);
}
