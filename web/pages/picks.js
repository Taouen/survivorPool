import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/Layout';
import Client from '../components/Client';

const getTribeColorClassname = (color) => {
  switch (color) {
    case 'red':
      return 'ring-2 ring-inset ring-red-600';
    case 'blue':
      return 'ring-2 ring-inset ring-blue-600';
    case 'green':
      return 'ring-2 ring-inset ring-green-500';
    case 'yellow':
      return 'ring-2 ring-inset ring-yellow-300';
    case 'orange':
      return 'ring-2 ring-inset ring-yellow-600';
    case 'purple':
      return 'ring-2 ring-inset ring-purple-600';
    default:
      return '';
  }
};

export default function picks({ players }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-neutral-800">
      <Head>
        <title>Survivor Fantasy Pool | Player Picks</title>
      </Head>
      <Layout>
        <div className="flex flex-wrap justify-center w-full">
          {players.length === 0 && (
            <p>Nobody has signed up yet, check back later!</p>
          )}
          {players.length > 0 &&
            players.sort((a,b) => a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1).map(({ username, picks, mvp }) => {
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
                      className={`flex justify-center p-2 border border-grey-500 ${
                        mvp.tribeColor
                          ? `${getTribeColorClassname(mvp.tribeColor)}`
                          : ''
                      }`}
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
                        <p className="relative z-0">
                          MVP: {mvp.nickname ? mvp.nickname : mvp.name}
                        </p>
                      </td>
                    </tr>
                    <tr className="flex justify-around border border-t-0 border-grey-500">
                      {picks
                        .sort((a, b) => {
                          const aName = a.nickname || a.name;
                          const bName = b.nickname || b.name;
                          return aName > bName ? 1 : -1;
                        })
                        .map((pick) => (
                          <td
                            key={pick.nickname ? pick.nickname : pick.name}
                            className={`flex justify-center w-1/4 p-2 border-r border-grey-500 last:border-r-0 ${
                              pick.tribeColor
                                ? `${getTribeColorClassname(pick.tribeColor)}`
                                : ''
                            }`}
                          >
                            <div
                              className={`flex justify-center ${
                                pick.eliminated
                                  ? 'line-through opacity-50'
                                  : null
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
                              <p className="relative z-0">
                                {pick.nickname ? pick.nickname : pick.name}
                              </p>
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

export async function getServerSideProps() {
  const players = await Client.fetch(
    '*[_type == "player"] | order(username asc) {..., mvp->{...}, picks[]->{...}}'
  ).catch((err) => console.error(err));

  return {
    props: {
      players,
    },
  };
}
