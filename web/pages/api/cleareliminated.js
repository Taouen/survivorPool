import Client from '../../components/Client';
import {
  createBatchRequests,
  executeBatchRequests,
  sendSuccessResponse,
  sendErrorResponse,
} from '../../lib/apiHelpers';

export default async function handler(req, res) {
  const { survivors } = req.body;

  const survivorRequests = createBatchRequests(survivors, (survivor) => {
    const { _id, name } = survivor;

    return Client.patch(_id)
      .set({ eliminated: false })
      .commit()
      .then(() => console.log(`Reset eliminated for ${name}`))
      .catch((err) => {
        console.error(err);
        throw err;
      });
  });

  try {
    const result = await executeBatchRequests(survivorRequests);
    sendSuccessResponse(
      res,
      'Successfully reset eliminated status for all survivors',
      result,
    );
  } catch (err) {
    sendErrorResponse(
      res,
      `An error occurred in one or more update requests: ${err}`,
    );
    console.error(err);
  }
}
