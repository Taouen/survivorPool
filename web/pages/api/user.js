import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { sendSuccessResponse } from '../../lib/apiHelpers';

async function userRoute(req, res) {
  const userData = req.session.user
    ? { ...req.session.user, isLoggedIn: true }
    : { isLoggedIn: false };
  sendSuccessResponse(res, 'User data retrieved', userData);
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
