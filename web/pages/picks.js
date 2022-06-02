import Head from 'next/head';

import Layout from '../components/Layout';
import Client from '../components/Client';

export default function picks({ players, survivors }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Player Picks</title>
      </Head>
      <Layout>
        <div className="flex flex-wrap justify-center w-full">
          {players.length === 0 && (
            <p>Nobody has signed up yet, check back later!</p>
          )}
          {players.length > 0 &&
            players.map(({ username, picks, mvp }) => {
              return (
                <table
                  key={username}
                  className="flex flex-col w-full mb-8 md:w-1/3 md:mx-2 md:mb-4 "
                >
                  <thead className="flex justify-center text-lg">
                    <tr className="flex pb-2">
                      <th>{username}</th>
                    </tr>
                  </thead>
                  <tbody className="flex flex-col">
                    <tr className="flex justify-center py-1 border border-grey-500">
                      <td className="flex">MVP: {mvp}</td>
                    </tr>
                    <tr className="flex justify-around border border-t-0 border-grey-500">
                      {picks.map((pick) => (
                        <td
                          key={pick}
                          className="flex justify-center w-1/4 p-2 border-r border-grey-500 last:border-r-0"
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
  const survivors = await Client.fetch('*[_type == "survivor"] {name}')
    .then((data) =>
      data.sort((a, b) => (a.name - b.name < 0 ? 1 : b.name > a.name ? -1 : 0))
    )
    .catch((err) => console.error(err));
  const players = await Client.fetch('*[_type == "player"]')
    .then((data) =>
      data.sort((a, b) =>
        a.username.toLowerCase() - b.username.toLowerCase() < 0
          ? 1
          : b.username.toLowerCase() > a.username.toLowerCase()
          ? -1
          : 0
      )
    )
    .catch((err) => console.error(err));

  return {
    props: {
      survivors,
      players,
    },
    revalidate: 10,
  };
}
