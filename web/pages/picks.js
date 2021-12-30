import { survivors as survivorsList } from '../components/survivors';
import { players as playersList } from '../components/players';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function picks({ players, survivors }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Player Picks</title>
      </Head>
      <Layout>
        <table className="w-full">
          <thead className="bg-black flex text-white w-full">
            <tr className="flex text-left w-full items-center ">
              <th className="p-2 w-1/6">Player</th>
              <th className="p-2 w-1/6">MVP</th>
              <th className="p-2 w-1/6"></th>
              <th className="p-2 w-1/6"></th>
              <th className="p-2 w-1/6"></th>
              <th className="p-2 w-1/6"></th>
            </tr>
          </thead>

          <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full max-h-96">
            {players.map(({ name, mvp, picks }, index) => {
              return (
                <tr key={index} className="flex w-full text-center ">
                  <td className="p-2 text-left w-1/6 ">{name}</td>
                  <td className="p-2 text-left w-1/6">{mvp}</td>
                  {picks.map((pick) => {
                    return <td className="p-2 text-left w-1/6">{pick}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const players = playersList;
  const survivors = survivorsList;
  return {
    props: {
      survivors,
      players,
    },
  };
}
