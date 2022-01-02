import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around w-full mb-4 h-24 p-2">
      <h1 className="text-2xl md:text-4xl">Survivor Fantasy Pool</h1>
      <ul className="flex">
        <li className="px-2 md:px-4 text-gray-400 hover:text-white">
          <Link href="/">Standings</Link>
        </li>
        <li className="px-2 md:px-4 text-gray-400 hover:text-white">
          <Link href="/picks">Player Picks</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
