import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex items-center justify-around w-full h-24 ">
      <h1 className="text-4xl">Survivor Fantasy Pool</h1>
      <ul className="flex">
        <li className="px-4 text-gray-400 hover:text-white">
          <Link href="/">Standings</Link>
        </li>
        <li className="px-4 text-gray-400 hover:text-white">
          <Link href="/picks">Player Picks</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
