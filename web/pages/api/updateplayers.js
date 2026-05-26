import Client from '../../components/Client';
import { createBatchRequests, executeBatchRequests, sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  const { players } = req.body;

  const playerRequests = createBatchRequests(players, (player) => {
    return Client.patch(player._id)
      .set({ paid: player.paid })
      .commit()
      .then((player) => console.log(`Updated player ${player.username}`))
      .catch((err) => {
        console.log(`An error occurred while updating player ${player.username}: ${err}`);
        throw err;
      });
  });

  try {
    const result = await executeBatchRequests(playerRequests);
    sendSuccessResponse(res, 'Updates completed successfully', result);
  } catch (err) {
    sendErrorResponse(res, `An error occurred in one or more update requests: ${err}`);
  }
}
