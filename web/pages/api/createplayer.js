import Client from '../../components/Client';

export default async function handler(req, res) {
  const { picks, username, email, mvp } = req.body;

  const id = username.replace(/ /g, '_');
  const request = Client.create({
    _type: 'player',
    _id: `${id}`,
    username: username,
    email: email,
    picks: picks,
    mvp: mvp,
    episodeScores: [],
    totalScore: 0,
    rank: [],
    paid: false,
  });

  try {
    const result = await request;
    res.status(201).send(`Successfully created new player. Result: ${result}`);
  } catch (err) {
    res.status(500).send({
      error: `An error occured while trying to create a new player: ${err}`,
    });
  }
}
