import Client from '../../components/Client';
import { createBatchRequests, executeBatchRequests, sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  const { players, survivors } = req.body;

  const playerRequests = createBatchRequests(players, (player) => {
    return Client.patch(player._id)
      .set({ episodeScores: player.episodeScores })
      .set({ totalScore: player.totalScore })
      .set({ rank: player.rank })
      .commit()
      .then((player) => console.log(`Updated player ${player.username}`))
      .catch((err) => {
        console.log(`An error occurred while updating player ${player.username}: ${err}`);
        throw err;
      });
  });

  const survivorRequests = createBatchRequests(survivors, (survivor) => {
    if (survivor.eliminated) {
      survivor.tribeColor = 'none';
    }
    return Client.patch(survivor._id)
      .set({ eliminated: survivor.eliminated })
      .set({ tribeColor: survivor.tribeColor })
      .set({ winner: survivor.winner })
      .set({ episodeScores: survivor.episodeScores })
      .set({ totalScore: survivor.totalScore })
      .commit()
      .then((survivor) => console.log(`Updated survivor ${survivor.name}`))
      .catch((err) => {
        console.log(`An error occurred while updating survivor ${survivor.name}: ${err}`);
        throw err;
      });
  });

  try {
    const result = await executeBatchRequests([...playerRequests, ...survivorRequests]);
    sendSuccessResponse(res, 'Updates completed successfully', result);
  } catch (err) {
    sendErrorResponse(res, `An error occurred in one or more update requests: ${err}`);
  }
}
