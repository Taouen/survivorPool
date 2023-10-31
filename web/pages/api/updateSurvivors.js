import Client from '../../components/Client';

export default async function handler(req, res) {
  const { survivors } = req.body;

  const survivorRequests = survivors.map((survivor) => {
    return Client.patch(survivor._id)
      .set({ eliminated: survivor.eliminated })
      .set({ episodeScores: survivor.episodeScores })
      .set({ totalScore: survivor.totalScore })
      .set({ tribeColor: survivor.tribeColor })
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
    const result = await Promise.all([...survivorRequests]);
    res.status(200).send(`Updates completed successfully. Result: ${result}`);
  } catch (err) {
    res.status(500).send({
      error: `An error occurred in one or more update requests: ${err}`,
    });
  }
}
