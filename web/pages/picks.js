import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';

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
                    <tr
                      className={`flex justify-center p-2 border border-grey-500`}
                    >
                      <td
                        className={`flex justify-center ${
                          mvp.eliminated ? 'line-through opacity-50' : null
                        }`}
                      >
                        {mvp.eliminated && (
                          <FontAwesomeIcon
                            icon={faSkull}
                            style={{ color: '#7f7f7f80' }}
                            size="2x"
                            className="absolute self-center text-black -z-1 justify-self-center"
                          />
                        )}
                        <p className="relative z-0">MVP: {mvp.name}</p>
                      </td>
                    </tr>
                    <tr className="flex justify-around border border-t-0 border-grey-500">
                      {picks.map((pick) => (
                        <td
                          key={pick.name}
                          className={`flex justify-center w-1/4 p-2 border-r border-grey-500 last:border-r-0`}
                        >
                          <div
                            className={`flex justify-center ${
                              pick.eliminated ? 'line-through opacity-50' : null
                            }`}
                          >
                            {pick.eliminated && (
                              <FontAwesomeIcon
                                icon={faSkull}
                                style={{ color: '#7f7f7f80' }}
                                size="2x"
                                className="absolute self-center text-black -z-1 justify-self-center"
                              />
                            )}
                            <p className="relative z-0">{pick.name}</p>
                          </div>
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
  const players = await Client.fetch(
    '*[_type == "player"]{..., mvp->{...}, picks[]->{...}}'
  )
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
