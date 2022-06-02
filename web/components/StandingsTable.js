import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function StandingsTable({ episode, players }) {
  const rankedPlayers = [...players].sort(
    (a, b) => a.rank[episode - 2] - b.rank[episode - 2]
  );
  return (
    <div>
      <h2 className="mb-4 text-xl">Episode {episode}</h2>
      <table className="w-full">
        <thead className="flex w-full text-white bg-black">
          <tr className="flex items-center w-full text-center md:text-left ">
            <th className="w-2/5 p-2 text-left">Name</th>
            <th className="w-1/5 p-2">Rank</th>
            <th className="w-1/5 p-2">Episode Score</th>
            <th className="w-1/5 p-2">Total Score</th>
          </tr>
        </thead>

        <tbody className="flex flex-col items-center justify-between w-full bg-grey-light">
          {rankedPlayers
            .filter((player) => player.paid)
            .map(({ username, rank, episodeScores }, index) => {
              const rankDifferential =
                Math.abs(rank[episode - 2] - rank[episode - 3]) === 0
                  ? 0
                  : Math.abs(rank[episode - 2] - rank[episode - 3]);
              const rankChange =
                rank[episode - 2] > rank[episode - 3] ? (
                  <FontAwesomeIcon icon={faCaretDown} />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} />
                );

              return (
                <tr
                  key={index}
                  className={`flex w-full text-center md:text-left mb-1 even:bg-black/10 dark:even:bg-white/10`}
                >
                  <td className="w-2/5 p-2 text-left truncate">{username}</td>
                  <td className="w-1/5 p-2">
                    {rank[episode - 2]}{' '}
                    {episode > 2 && (
                      <span
                        className={` ml-2 ${
                          rank[episode - 2] - rank[episode - 3] < 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {rankDifferential === 0 ? null : rankChange}{' '}
                        {rankDifferential === 0 ? null : rankDifferential}
                      </span>
                    )}
                  </td>
                  <td className="w-1/5 p-2">{episodeScores[episode - 2]} </td>
                  <td className="w-1/5 p-2">
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
