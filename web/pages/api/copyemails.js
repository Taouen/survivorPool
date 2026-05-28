import Client from '../../components/Client';
import { sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  try {
    const players = await Client.fetch('*[_type == "player"] {email}').then(data => 
      data.map(player => player.email));
    
    console.log(players);

    if (!players?.length) {
      console.log('No player documents found.');
    }

    sendSuccessResponse(res, 'Player emails retrieved', { message: 'Request completed.' });
  } catch (err) {
    console.error('Fetch failed:', err);
    sendErrorResponse(res, 'Error fetching emails');
  }
}
