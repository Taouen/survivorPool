import Client from '../../components/Client';
import { createBatchRequests, executeBatchRequests, sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  const { survivors } = req.body;

  const survivorRequests = createBatchRequests(survivors, (survivor) => {
    return Client.patch(survivor._id)
      .set({ eliminated: survivor.eliminated })
      .set({ episodeScores: survivor.episodeScores })
      .set({ totalScore: survivor.totalScore })
      .set({ tribeColor: survivor.tribeColor })
      .commit()
      .then((survivor) => {
        console.log(`Updated survivor ${survivor.name}`);
      })
      .catch((err) => {
        console.log(`An error occurred while updating survivor ${survivor.name}: ${err}`);
        throw err;
      });
  });

  try {
    const result = await executeBatchRequests(survivorRequests);
    sendSuccessResponse(res, 'Survivors updated successfully', result);
  } catch (err) {
    sendErrorResponse(res, `An error occurred in one or more update requests: ${err}`);
  }
}
