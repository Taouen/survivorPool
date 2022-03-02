const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'development',
  apiVersion: '2022-02-08', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

export default async function handler(req, res) {
  const { picks, username, email, mvp } = req.body;
  picks.splice(picks.indexOf(mvp), 1);
  client
    .create({
      _type: 'player',
      _id: `${username}`,
      username: username,
      email: email,
      picks: picks,
      mvp: mvp,
      episodeScores: [],
      totalScore: 0,
      rank: 0,
      paid: false,
    })
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      console.error(err);
    });
}
