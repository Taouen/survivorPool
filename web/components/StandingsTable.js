export default function StandingsTable({ episode, players }) {
  return (
    <div>
      <h2 className="mb-4 text-xl">Episode {episode}</h2>
      <table className="w-full">
        <thead className="bg-black flex text-white w-full">
          <tr className="flex w-full text-center md:text-left  items-center ">
            <th className="p-2 text-left w-2/5">Name</th>
            <th className="p-2 w-1/5">Rank</th>
            <th className="p-2 w-1/5">Episode Score</th>
            <th className="p-2 w-1/5">Total Score</th>
          </tr>
        </thead>

        <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
          {players
            .filter((player) => player.paid)
            .sort((a, b) => a.rank - b.rank)
            .map(({ username, rank, episodeScores, totalScore }, index) => {
              return (
                <tr
                  key={index}
                  className={`flex w-full text-center md:text-left mb-1 even:bg-black/10 dark:even:bg-white/10`}
                >
                  <td className="p-2 text-left w-2/5">{username}</td>
                  <td className="p-2 w-1/5">{rank}</td>
                  <td className="p-2 w-1/5">{episodeScores[episode - 2]}</td>
                  <td className="p-2 w-1/5">
                    {episodeScores
                      .slice(0, episode - 1)
                      .reduce((a, b) => a + b, 0)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
