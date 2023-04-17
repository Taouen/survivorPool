import Client from '../../components/Client';

export default async function handler(req, res) {
  const { players } = req.body;
  const updateRequests = [];

  players.forEach((player) => {
    const { _id } = player;
    updateRequests.push(
      Client.patch(_id)
        .set({ totalScore: 0, episodeScores: [], rank: [] })
        .commit()
        .then((player) => {
          console.log(`Successfully reset score for ${player.username}`);
        })
        .catch((err) => {
          console.log(
            `An error occurred while resetting scores for ${player.username}: ${err}`
          );
        })
    );
  });

  try {
    const result = await Promise.all(updateRequests);
    res
      .status(200)
      .send(`Scores successfully reset for all players. Result :${result}`);
  } catch (err) {
    res
      .status(500)
      .send({ error: 'An error occurred in one or more update requests:' });
    console.error(err);
  }
}
