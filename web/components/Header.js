import Link from 'next/link';

const Header = () => {
  const linkStyles = 'px-2 md:px-4 text-gray-400 hover:text-white';

  const pages = [
    {
      title: 'Standings',
      path: '/',
    },
    {
      title: 'Player Picks',
      path: '/picks',
    },
    {
      title: 'Sign Up',
      path: '/signup',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-around w-full mb-4 h-24 p-2">
      <h1 className="text-2xl md:text-4xl">Survivor Fantasy Pool</h1>
      <ul className="flex">
        {pages.map((page) => (
          <li className={linkStyles}>
            <Link href={page.path}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
