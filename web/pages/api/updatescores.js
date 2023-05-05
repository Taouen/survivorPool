import Client from '../../components/Client';

export default async function handler(req, res) {
  const { players, survivors } = req.body;

  const playerRequests = players.map((player) => {
    // Update each player's total score, episode scores, rank
    return Client.patch(player._id)
      .set({ episodeScores: player.episodeScores })
      .set({ totalScore: player.totalScore })
      .set({ rank: player.rank })
      .commit()
      .then((player) => console.log(`Updated player ${player.username}`))
      .catch((err) =>
        console.log(
          `An error occurred while updating player ${player.name}: ${err}`
        )
      );
  });

  const survivorRequests = survivors.map((survivor) => {
    return Client.patch(survivor._id)
      .set({ eliminated: survivor.eliminated })
      .set({ episodeScores: survivor.episodeScores })
      .set({ totalScore: survivor.totalScore })
      .commit()
      .then((survivor) => {
        console.log(`Updated eliminated for survivor ${survivor.name}`);
      })
      .catch((err) => {
        console.log(
          `An error occurred while updating survivor ${survivor.name}: ${err}`
        );
      });
  });

  try {
    const result = await Promise.all([...playerRequests, ...survivorRequests]);
    res.status(200).send(`Updates completed successfully. Result: ${result}`);
  } catch (err) {
    res.status(500).send({
      error: `An error occurred in one or more update requests: ${err}`,
    });
  }
}
