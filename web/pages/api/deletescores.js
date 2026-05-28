import Client from '../../components/Client';
import { createBatchRequests, executeBatchRequests, sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  const { players } = req.body;

  const updateRequests = createBatchRequests(players, (player) => {
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
        throw err;
      });
  });

  try {
    const result = await executeBatchRequests(updateRequests);
    sendSuccessResponse(res, 'Scores successfully reset for all players', result);
  } catch (err) {
    console.error(err);
    sendErrorResponse(res, `An error occurred in one or more update requests: ${err}`);
  }
}
