import Client from '../../components/Client';

export default async function handler(req, res) {
  const { players, eliminatedThisEpisode } = req.body;
  const updateRequests = []; // array to push all requests to

  players.forEach((player) => {
    updateRequests.push(
      // Update each player's total score, episode scores, rank
      Client.patch(player._id)
        .set({ episodeScores: player.episodeScores })
        .set({ totalScore: player.totalScore })
        .set({ rank: player.rank })
        .commit()
        .then((player) => console.log(`Updated player ${player.username}`))
        .catch((err) =>
          console.log(
            `An error occurred while updating player ${player.name}: ${err}`
          )
        )
    );
  });

  eliminatedThisEpisode.forEach((survivor) => {
    updateRequests.push(
      Client.patch(survivor._id)
        .set({ eliminated: true })
        .commit()
        .then((survivor) => {
          console.log(`Updated eliminated for survivor ${survivor.name}`);
        })
        .catch((err) => {
          console.log(
            `An error occurred while updating survivor ${survivor.name}: ${err}`
          );
        })
    );
  });

  try {
    const result = await Promise.all(updateRequests);
    res.status(200).send(`Updates completed successfully. Result: ${result}`);
  } catch (err) {
    res
      .status(500)
      .send({ error: 'An error occurred in one or more update requests:' });

    console.error(err);
  }
}
