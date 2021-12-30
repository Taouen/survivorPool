import Head from 'next/head';
import Layout from '../components/Layout';
// import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useCallback } from 'react';
import { survivors as survivorsList } from '../components/survivors';
import { players as playersList } from '../components/players';
import EpisodeSelector from '../components/EpisodeSelector';

const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'production',
  apiVersion: '2021-12-11', // use current UTC date - see "specifying API version"!
  token: '', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});

export default function Home({ players, survivors }) {
  /* const getData = useCallback(async () => {
    const playerList = await client
      .fetch('*[_type == "player"] {name, score, picks}')
      .catch((err) => console.error(err));

    setPlayers(playerList);

    const survivorsList = await client
      .fetch('*[_type == "survivor"] {name, scores, totalScore, eliminated}')
      .catch((err) => console.error(err));

    setSurvivors(survivorsList);
  }, []); */

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Standings</title>
      </Head>
      <Layout>
        <EpisodeSelector />

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
