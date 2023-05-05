import Client from '../../components/Client';

export default async function handler(req, res) {
  const { players, survivors } = req.body;

  const playerRequests = players.map((player) => {
    const { _id, username, episodeScores, rank } = player;

    const scoreToDelete = episodeScores[episodeScores.length - 1];

    return Client.patch(_id)
      .unset([
        `episodeScores[${episodeScores.length - 1}]`,
        `rank[${rank.length - 1}]`,
      ])
      .dec({ totalScore: scoreToDelete })
      .commit()
      .then(() => {
        console.log(`Successfully deleted latest score for ${username}`);
      })
      .catch((err) => {
        console.log(
          `An error occurred while deleting latest score for ${username}: ${err}`
        );
      });
  });

  const survivorRequests = survivors.map((survivor) => {
    const { _id, episodeScores } = survivor;

    const scoreToDelete = episodeScores[episodeScores.length - 1];

    return Client.patch(_id)
      .unset([`episodeScores[${episodeScores.length - 1}]`])
      .dec({ totalScore: scoreToDelete })
      .commit()
      .then(() => {
        console.log(`Successfully deleted latest score for ${survivor.name}`);
      })
      .catch((err) => {
        console.log(
          `An error occurred while deleting latest score for ${survivor.name}: ${err}`
        );
        console.error(err);
      });
  });

  try {
    const result = await Promise.all([...playerRequests, ...survivorRequests]);
    res.status(200).send(`Updates completed successfully. Result: ${result}`);
  } catch (err) {
    res
      .status(500)
      .send({ error: 'An error occurred in one or more update requests:' });
    console.error(err);
  }
}
