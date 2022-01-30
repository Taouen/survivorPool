export default function StandingsTable({
  episode,
  players,
  survivors,
  getScores,
}) {
  return (
    <div>
      <h2 className="mb-2">Episode {episode}</h2>
      <table className="w-full">
        <thead className="bg-black flex text-white w-full">
          <tr className="flex w-full text-center md:text-left  items-center ">
            <th className="p-2 text-left w-1/4">Name</th>
            <th className="p-2 w-1/4">Rank</th>
            <th className="p-2 w-1/4">Episode Score</th>
            <th className="p-2 w-1/4">Total Score</th>
          </tr>
        </thead>

        <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full max-h-96">
          {players.map(({ name, rank, episodeScores, totalScore }, index) => {
            return (
              <tr
                key={index}
                className="flex w-full text-center md:text-left mb-1"
              >
                <td className="p-2 text-left w-1/4">{name}</td>
                <td className="p-2 w-1/4">{rank}</td>
                <td className="p-2 w-1/4">{episodeScores[0]}</td>
                <td className="p-2 w-1/4">{totalScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
