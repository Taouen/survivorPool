import { getIronSession } from 'iron-session';
import { sessionOptions } from '../../lib/session';

async function userRoute(req, res) {
  const session = await getIronSession(req, res, sessionOptions);
  
  if (session.user) {
    res.json({
      ...session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}

export default userRoute;
