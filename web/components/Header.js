import Link from 'next/link';

const Header = () => {
  const linkStyles = 'hover:underline';

  const pages = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Sign Up',
      path: '/signup',
    },
    {
      title: 'Standings',
      path: '/standings',
    },
    {
      title: 'Player Picks',
      path: '/picks',
    },
    {
      title: 'Admin',
      path: '/admin',
    },
  ];

  return (
    <div className="mb-4 shadow-sm navbar bg-base-100">
      <h1 className="p-2 text-xl navbar-start md:text-2xl ">
        Survivor Fantasy Pool
      </h1>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="w-32 p-2 mt-3 shadow menu menu-md dropdown-content bg-base-100 rounded-box z-1"
          >
            {pages.map((page) => (
              <li key={page.title} className={linkStyles}>
                <Link href={page.path} legacyBehavior>
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden navbar-end md:flex">
        <ul className="px-1 w-max menu menu-horizontal md:menu-md lg:menu-lg">
          {pages.map((page) => (
            <li key={page.title} className={linkStyles}>
              <Link href={page.path} legacyBehavior>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
/* 
<div className="flex flex-col items-center justify-between w-full h-24 p-2 mb-4 lg:justify-around md:flex-row">
      <h1 className="p-2 text-xl md:text-2xl">Survivor Fantasy Pool</h1>
      <ul className="menu md:menu-horizontal md:menu-md lg:menu-lg">
        {pages.map((page) => (
          <li key={page.title} className={linkStyles}>
            <Link href={page.path} legacyBehavior>
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
*/
