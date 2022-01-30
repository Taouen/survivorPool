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
import '@fortawesome/fontawesome-svg-core/styles.css';

/* const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'production',
  apiVersion: '2021-12-11', // use current UTC date - see "specifying API version"!
  token: '', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
}); */

export default function Home(props) {
  const [currentEpisode, setCurrentEpidsode] = useState(2);
  const [players, setPlayers] = useState([...props.players]);
  const [survivors, setSurvivors] = useState([...props.survivors]);

  const getScores = (
    { mvp, picks, episodeScores, totalScore },
    survivors,
    episode
  ) => {
    // run for each player

    const episodeScore = 0;
    survivors.forEach((survivor) => {
      if (mvp === survivor.name) episodeScore += survivor.scores[episode - 2];
      picks.forEach((pick) => {
        if (pick === survivor.name) {
          episodeScore += survivor.scores[episode - 1];
        }
      });
    });
    episodeScores.push(episodeScore);
    totalScore += episodeScore;
  };
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

  const updateStandings = () => {
    const people = [...players];

    people.forEach((person) => {
      getScores(person, survivors, currentEpisode);
    });
    setPlayers(people);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Standings</title>
      </Head>
      <Layout>
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
          <StandingsTable
            players={players}
            survivors={survivors}
            getScores={getScores}
            episode={2}
          />
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
