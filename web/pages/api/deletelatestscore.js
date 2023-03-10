import Client from '../../components/Client';

export default async function handler(req, res) {
  const { players } = req.body;
  const requests = [];

  players.forEach((player) => {
    const { _id, username, episodeScores, rank } = player;

    const scoreToDelete = player.episodeScores[episodeScores.length - 1];

    requests.push(
      Client.patch(_id)
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
        })
    );
  });

  try {
    Promise.all(requests).then((result) => {
      res
        .status(200)
        .send(
          `Successfully reset latest score for all players. Result: ${result}`
        );
    });
  } catch (err) {
    res
      .status(500)
      .send({ error: 'An error occurred in one or more update requests:' });
    console.error(err);
  }
}
