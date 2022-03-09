import Client from '../../components/Client';

export default async function handler(req, res) {
  const { picks, username, email, mvp } = req.body;
  picks.splice(picks.indexOf(mvp), 1);
  Client.create({
    _type: 'player',
    _id: `${username}`,
    username: username,
    email: email,
    picks: picks.sort(),
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
