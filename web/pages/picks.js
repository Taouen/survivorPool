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
        <div className="flex flex-wrap justify-center">
          {players.map(({ name, picks, mvp }) => {
            return (
              <table
                key={name}
                className="flex flex-col w-full md:w-1/4 md:mx-2 mb-8 md:mb-4 "
              >
                <thead className="flex text-lg justify-center">
                  <tr className="flex pb-2">
                    <th>{name}</th>
                  </tr>
                </thead>
                <tbody className="flex flex-col">
                  <tr className="flex justify-center border border-grey-500 py-1">
                    <td className="flex">MVP: {mvp}</td>
                  </tr>
                  <tr className="flex justify-around border border-grey-500 border-t-0">
                    {picks.map((pick) => (
                      <td
                        key={pick}
                        className="flex p-2 border-r border-grey-500 last:border-r-0 w-1/4 justify-center"
                      >
                        {pick}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
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
