import Link from 'next/link';

const EpisodeSelector = () => {
  const episodes = [];
  for (let i = 1; i <= 13; i++) {
    episodes.push(i);
  }
  // Try flickity for carousel
  return (
    <ul className=" w-full flex overflow-x-scroll py-2">
      {episodes.map((episode) => (
        <div key={episode} className="w-auto p-1 flex-none mr-4 last:mr-0">
          Episode {episode}
        </div>
      ))}
    </ul>
  );
};

export default EpisodeSelector;
