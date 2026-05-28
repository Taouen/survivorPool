import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { sendSuccessResponse, sendErrorResponse } from '../../lib/apiHelpers';

async function loginRoute(req, res) {
  const { password } = await req.body;

  try {
    if (password === process.env.ADMIN_PASSWORD) {
      const user = { isLoggedIn: true };
      req.session.user = user;
      await req.session.save();
      sendSuccessResponse(res, 'Login successful', user);
    } else {
      const user = { isLoggedIn: false };
      sendErrorResponse(res, 'Invalid password', 403);
    }
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
