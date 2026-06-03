import { getIronSession } from 'iron-session';
import { sessionOptions } from '../../lib/session';

async function loginRoute(req, res) {
  const { password } = req.body;

  try {
    if (password === process.env.ADMIN_PASSWORD) {
      const session = await getIronSession(req, res, sessionOptions);
      const user = { isLoggedIn: true };
      session.user = user;
      await session.save();
      res.json(user);
    } else {
      const user = { isLoggedIn: false };
      res.status(403).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default loginRoute;
