import Client from '../../components/Client';

export default async function handler(req, res) {
  const { players } = req.body;
  const requests = [];

  players.forEach((player) => {
    const { _id, username } = player;

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
    const result = await Promise.all(requests);

    res.status(200);
  } catch (err) {
    console.log(`An error occured during one or more requests: ${err}`);
  }
}
