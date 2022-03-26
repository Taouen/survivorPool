import Client from '../../components/Client';

export default async function handler(req, res) {
  const { values, players } = req.body;
  const { episode } = values;
  players.forEach(async (player) => {
    const { _id } = player;

    const scoreToDelete = await Client.getDocument(_id).then((player) => {
      return player.episodeScores[episode - 2];
    });

    Client.patch(_id)
      .unset([`episodeScores[${episode - 2}]`])
      .dec({ totalScore: scoreToDelete })
      .commit();
  });

  res.status(201).json(req.body);
}
