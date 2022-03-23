import Client from '../../components/Client';

export default async function handler(req, res) {
  const { values, players } = req.body;
  const { episode } = values;
  players.forEach((player) => {
    const { _id } = player;
    Client.patch(_id)
      .unset([`episodeScores[${episode - 2}]`])
      .commit();
  });

  res.status(201).json(req.body);
}
