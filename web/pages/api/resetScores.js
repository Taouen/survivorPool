import Client from '../../components/Client';

export default async function handler(req, res) {
  const { players, survivors } = req.body;

  const playerRequests = players.map((player) => {
    const { _id } = player;

    return Client.patch(_id)
      .set({ totalScore: 0, episodeScores: [], rank: [] })
      .commit()
      .then((player) => {
        console.log(`Successfully reset score for ${player.username}`);
      })
      .catch((err) => {
        console.log(
          `An error occurred while resetting scores for ${player.username}: ${err}`
        );
      });
  });

  const survivorRequests = survivors.map((survivor) => {
    const { _id } = survivor;

    return Client.patch(_id)
      .set({ totalScore: 0, episodeScores: [], eliminated: false })
      .commit()
      .then((survivor) => {
        console.log(`Successfully reset score for ${survivor.name}`);
      })
      .catch((err) => {
        console.log(
          `An error occurred while resetting scores for ${survivor.name}: ${err}`
        );
      });
  });

  try {
    const result = await Promise.all([...playerRequests, ...survivorRequests]);
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
