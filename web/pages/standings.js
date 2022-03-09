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
import Client from '../components/Client';

export default function Home({ players }) {
  const [currentEpisode, setCurrentEpidsode] = useState(
    players[0]
      ? players[0].episodeScores
        ? players[0].episodeScores.length + 1
        : 1
      : 0
  );

  const createTables = (episode) => {
    for (let i = 0; i < episode - 1; i++) {
      return (
        <StandingsTable
          key={'episode' + i}
          players={players}
          episode={episode}
        />
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Standings</title>
      </Head>
      <Layout>
        {players.length === 0 && (
          <p>Nobody has signed up yet, check back later!</p>
        )}

        {currentEpisode === 1 && (
          <p>
            Points begin to accumulate starting with episode 2. Check back
            later!
          </p>
        )}
        {currentEpisode > 1 && (
          <>
            <p className=" text-left mb-8">
              Don't see yourself in the standings? Make sure you've sent your
              entry fee via eTransfer to{' '}
              <strong>tanner.wiltshire@gmail.com</strong>. If you have sent your
              payment already and believe this is an error, please{' '}
              <a
                className=" text-red-600 dark:text-red-400  hover:underline"
                href="mailto:tanner.wiltshire@gmail.com?subject=User missing from standings"
              >
                contact me
              </a>
              .
            </p>
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
              {createTables(currentEpisode)}
            </Carousel>
          </>
        )}
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
