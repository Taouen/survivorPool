import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { Carousel } from 'nuka-carousel';

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
    const tables = [];
    for (let i = 0; i < episode - 1; i++) {
      tables.push(
        <StandingsTable key={'episode' + i} players={players} episode={i + 2} />
      );
    }
    return tables;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-neutral-800">
      <Head>
        <title>Survivor Fantasy Pool | Standings</title>
      </Head>
      <Layout>
        {/* -------- Delete this when I've fixed the api 

        Leaving in place in case I need to use it again.


        <p className="mb-8 text-left text-red-600">
          I've made some changes to the site and broken something. Standings
          information may be incorrect. Please bear with me while I figure out
          what went wrong and get the site working properly again.
          <br />
          <br /> I will do my best to have everything fixed this week, but due
          to the holiday I may be delayed in getting everything sorted out.
          Thank you for your patience!
        </p>
      -------- Delete this when I've fixed the api */}
        {players.length === 0 && (
          <p>Nobody has signed up yet, check back later!</p>
        )}
        {currentEpisode === 1 && (
          <p>
            Points begin to accumulate starting with episode 3. Check back
            later!
          </p>
        )}
        {currentEpisode > 1 && (
          <>
            <p className="mb-8 text-left ">
              Don't see yourself in the standings? Make sure you've sent your
              entry fee via eTransfer to{' '}
              <strong>tanner.wiltshire@gmail.com</strong>. If you have sent your
              payment already and believe this is an error, please{' '}
              <a
                className="text-red-600 dark:text-red-400 hover:underline"
                href="mailto:tanner.wiltshire@gmail.com?subject=User missing from standings"
              >
                contact me
              </a>
              .
            </p>
            <Carousel
              className="max-w-full md:max-w-3/4"
              initialPage={currentEpisode - 2}
              scrollDistance="slide"
              showDots
              showArrows="hover"
            >
              {createTables(currentEpisode)}
            </Carousel>
          </>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const survivors = await Client.fetch(
    '*[_type == "survivor"] | order(name asc) {name}'
  ).catch((err) => console.error(err));
  const players = await Client.fetch(
    '*[_type == "player"] | order(username asc) {..., mvp->{...}, picks[]->{...}}'
  ).catch((err) => console.error(err));
  return {
    props: {
      survivors,
      players,
    },
  };
}
