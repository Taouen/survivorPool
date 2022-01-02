import Head from 'next/head';
import Layout from '../components/Layout';
import { useState, useEffect, useCallback } from 'react';
import { survivors as survivorsList } from '../components/survivors';
import { players as playersList } from '../components/players';
import StandingsTable from '../components/StandingsTable';
import Carousel from 'nuka-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

/* const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'production',
  apiVersion: '2021-12-11', // use current UTC date - see "specifying API version"!
  token: '', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
}); */

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
        <Carousel
          renderTopLeftControls={({ previousSlide }) => (
            <button onClick={previousSlide}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}
          renderTopRightControls={({ nextSlide }) => (
            <button onClick={nextSlide}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
          renderCenterLeftControls={null}
          renderCenterRightControls={null}
          renderBottomCenterControls={null}
          slideIndex={2}
        >
          <StandingsTable players={players} episode="1" />
          <StandingsTable players={players} episode="2" />
          <StandingsTable players={players} episode="3" />
        </Carousel>
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
