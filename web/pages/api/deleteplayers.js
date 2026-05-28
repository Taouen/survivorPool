import Client from '../../components/Client';
import { sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  try {
    await Client.delete({ query: '*[_type == "player"]' });
    sendSuccessResponse(res, 'All players successfully deleted');
  } catch (err) {
    console.log(`An error occurred with the request: ${err}`);
    sendErrorResponse(res, `An error occurred with the request: ${err}`);
  }
}
