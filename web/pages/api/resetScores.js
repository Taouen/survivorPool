import Client from '../../components/Client';
import { createBatchRequests, executeBatchRequests, sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  const { players, survivors } = req.body;

  const playerRequests = createBatchRequests(players, (player) => {
    const { _id } = player;

    return Client.patch(_id)
      .set({ totalScore: 0, episodeScores: [], rank: [] })
      .commit()
      .then((player) => console.log(`Successfully reset score for ${player.username}`))
      .catch((err) => {
        console.log(`An error occurred while resetting scores for ${player.username}: ${err}`);
        throw err;
      });
  });

  const survivorRequests = createBatchRequests(survivors, (survivor) => {
    const { _id } = survivor;

    return Client.patch(_id)
      .set({ totalScore: 0, episodeScores: [], eliminated: false })
      .commit()
      .then((survivor) => console.log(`Successfully reset score for ${survivor.name}`))
      .catch((err) => {
        console.log(`An error occurred while resetting scores for ${survivor.name}: ${err}`);
        throw err;
      });
  });

  try {
    const result = await executeBatchRequests([...playerRequests, ...survivorRequests]);
    sendSuccessResponse(res, 'Scores successfully reset for all players', result);
  } catch (err) {
    sendErrorResponse(res, `An error occurred in one or more update requests: ${err}`);
    console.error(err);
  }
}
