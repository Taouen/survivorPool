import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import Carousel from 'nuka-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Layout from '../components/Layout';
import StandingsTable from '../components/StandingsTable';

const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'development',
  apiVersion: '2022-02-08', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

export default function Home({ players, survivors }) {
  const [currentEpisode, setCurrentEpidsode] = useState(
    players[0]
      ? players[0].episodeScores
        ? players[0].episodeScores.length + 1
        : 1
      : 0
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Standings</title>
      </Head>
      <Layout>
        {currentEpisode === 0 && (
          <p>Nobody has signed up yet, check back later!</p>
        )}

        {currentEpisode === 1 && (
          <p>
            Points begin to accumulate starting with episode 2. Check back
            later!
          </p>
        )}
        {currentEpisode > 1 && (
          <Carousel
            renderTopLeftControls={({ previousSlide }) => (
              <button onClick={previousSlide}>
                <FontAwesomeIcon icon={faChevronLeft} /> Previous
              </button>
            )}
            renderTopRightControls={({ nextSlide }) => (
              <button onClick={nextSlide}>
                Next <FontAwesomeIcon icon={faChevronRight} />
              </button>
            )}
            renderCenterLeftControls={null}
            renderCenterRightControls={null}
            renderBottomCenterControls={null}
            slideIndex={currentEpisode - 1}
          >
            {players[0].episodeScores.map((episode, index) => (
              <StandingsTable
                key={index}
                players={players}
                episode={index + 2}
              />
            ))}
          </Carousel>
        )}
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const survivors = await client
    .fetch('*[_type == "survivor"] {name}')
    .then((data) =>
      data.sort((a, b) => (a.name - b.name < 0 ? 1 : b.name > a.name ? -1 : 0))
    )
    .catch((err) => console.error(err));
  const players = await client
    .fetch('*[_type == "player"]')
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
    revalidate: 60,
  };
}
