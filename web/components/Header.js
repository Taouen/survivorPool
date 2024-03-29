import Link from 'next/link';

const Header = () => {
  const linkStyles =
    'px-2 md:px-4 hover:text-red-500 dark:hover:text-red-400 hover:underline';

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
    <div className="flex flex-col items-center justify-around w-full h-24 p-2 mb-4 md:flex-row">
      <h1 className="text-2xl md:text-4xl">Survivor Fantasy Pool</h1>
      <ul className="flex">
        {pages.map((page) => (
          <li key={page.title} className={linkStyles}>
            <Link href={page.path}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
