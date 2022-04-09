export default function StandingsTable({ episode, players }) {
  const rankedPlayers = [...players].sort(
    (a, b) => a.rank[episode - 2] - b.rank[episode - 2]
  );
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
          {rankedPlayers
            .filter((player) => player.paid)
            .map(({ username, rank, episodeScores }, index) => {
              const rankDifferential = Math.abs(
                rank[episode - 2] - rank[episode - 3]
              );
              const rankChange =
                rank[episode - 2] > rank[episode - 3] ? '-' : '+';

              return (
                <tr
                  key={index}
                  className={`flex w-full text-center md:text-left mb-1 even:bg-black/10 dark:even:bg-white/10`}
                >
                  <td className="p-2 text-left w-2/5">{username}</td>
                  <td className="p-2 w-1/5">
                    {rank[episode - 2]}{' '}
                    {episode > 2 && (
                      <span
                        className={`text-sm ${
                          rankChange === '+' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {rankChange}
                        {rankDifferential}
                      </span>
                    )}
                  </td>
                  <td className="p-2 w-1/5">{episodeScores[episode - 2]} </td>
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
