import Client from '../../components/Client';
import { createBatchRequests, executeBatchRequests, sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  const { players, survivors } = req.body;
  const winnerSelected = survivors.some((survivor) => survivor.winner);

  const playerRequests = createBatchRequests(players, (player) => {
    const { _id, username, episodeScores, rank } = player;

    let scoreToDelete = episodeScores[episodeScores.length - 1];
    if (winnerSelected) {
      if (
        player.mvp.name === survivors.find((survivor) => survivor.winner)?.name
      ) {
        scoreToDelete += 30;
      }
    }

    return Client.patch(_id)
      .unset([
        `episodeScores[${episodeScores.length - 1}]`,
        `rank[${rank.length - 1}]`,
      ])
      .dec({ totalScore: scoreToDelete })
      .commit()
      .then(() => console.log(`Successfully deleted latest score for ${username}`))
      .catch((err) => {
        console.log(`An error occurred while deleting latest score for ${username}: ${err}`);
        throw err;
      });
  });

  const survivorRequests = createBatchRequests(survivors, (survivor) => {
    const { _id, episodeScores } = survivor;
    const scoreToDelete = episodeScores[episodeScores.length - 1];

    return Client.patch(_id)
      .set({ winner: false })
      .unset([`episodeScores[${episodeScores.length - 1}]`])
      .dec({ totalScore: scoreToDelete })
      .commit()
      .then(() => console.log(`Successfully deleted latest score for ${survivor.name}`))
      .catch((err) => {
        console.log(`An error occurred while deleting latest score for ${survivor.name}: ${err}`);
        throw err;
      });
  });

  try {
    const result = await executeBatchRequests([...playerRequests, ...survivorRequests]);
    sendSuccessResponse(res, 'Updates completed successfully', result);
  } catch (err) {
    sendErrorResponse(res, `An error occurred in one or more update requests: ${err}`);
    console.error(err);
  }
}
