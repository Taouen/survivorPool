import Client from '../../components/Client';
import { sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

export default async function handler(req, res) {
  const { picks, username, email, mvp } = req.body;

  const id = username.replace(/ /g, '_');
  const request = Client.create({
    _type: 'player',
    _id: `${id}`,
    username: username,
    email: email,
    picks: picks,
    mvp: mvp,
    episodeScores: [],
    totalScore: 0,
    rank: [],
    paid: false,
  });

  try {
    const result = await request;
    sendSuccessResponse(res, 'Successfully created new player', result, 201);
  } catch (err) {
    console.error(
      `An error occured while trying to create a new player: ${err}`
    );
    sendErrorResponse(res, `An error occured while trying to create a new player: ${err}`);
  }
}
