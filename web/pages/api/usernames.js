import Client from '../../components/Client';
import { sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  try {
    const usernames = await Client.fetch('*[_type == "player"] {username}');
    sendSuccessResponse(res, 'Usernames retrieved', usernames);
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, 'Error fetching usernames');
  }
}
