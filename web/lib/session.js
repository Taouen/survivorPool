export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'surivivor-fantasy-pool',
  // secure: true should be used in prod (HTTPS) but can't be used locally (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
};
