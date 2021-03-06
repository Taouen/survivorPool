import Client from '../../components/Client';

export default async function handler(req, res) {
  const { players } = req.body;

  players.forEach((player) => {
    const { _id } = player;
    Client.patch(_id)
      .set({ totalScore: 0, episodeScores: [], rank: [] })
      .commit();
  });

  res.status(201).json(req.body);
}
