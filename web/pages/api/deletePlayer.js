import Client from '../../components/Client';
import { sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  const { player } = req.body;

  try {
    await Client.delete(player);
    sendSuccessResponse(res, 'Player successfully deleted');
  } catch (err) {
    console.log(`An error occurred with the request: ${err}`);
    sendErrorResponse(res, `An error occurred with the request: ${err}`);
  }
}
