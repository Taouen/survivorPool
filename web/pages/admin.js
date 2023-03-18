import Head from 'next/head';
import { useState } from 'react';
import { Formik, Field } from 'formik';

import Layout from '../components/Layout';
import Client from '../components/Client.js';

const deletePlayers = () => {
  if (window.confirm('Are you sure you want to delete all players?')) {
    if (window.confirm('Are you really sure?')) {
      try {
        fetch('/api/deleteplayers').then(() =>
          window.alert('All players have been deleted.')
        );
      } catch {
        console.error(error);
      }
    }
  }
};

const resetPlayerScores = (players) => {
  const data = { players };
  if (window.confirm('Are you sure you want to delete all player scores?')) {
    if (window.confirm('Are you really sure?')) {
      fetch('/api/deletescores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).catch((err) => console.log(err));
    }
  }
};

const updateScores = (values, setSubmitted, players, survivors) => {
  const { eliminated } = values;

  const scores = { ...values.scores };

  for (const score in scores) {
    scores[score] = scores[score] === '' ? 0 : scores[score];
  }

  const totalScores = [];

  players.forEach((player) => {
    const { mvp, picks, episodeScores } = player;

    // Calculate episode score for player
    const episodeScore = Object.values(
      // get an array of just the scores without the survivor name
      Object.fromEntries(
        // convert the filtered array back into an object
        Object.entries(scores).filter(
          // convert scores object to an array and filter all scores down to just the players picks and MVP
          (survivor) => picks.includes(survivor[0]) || survivor[0] === mvp
        )
      )
    )
      .filter((value) => typeof value === 'number') // filter out any '' scores from eliminated survivors
      .sort((a, b) => b - a) // sort highest to lowest
      .splice(3) // remove everything after the first 3 scores
      .reduce((a, b) => a + b, 0); // sum up scores

    episodeScores.push(episodeScore);
    player.totalScore += episodeScore;
    totalScores.push(player.totalScore);
  });

  // Create array of Unique total scores sorted from higest to lowest to find ranks, then for each player, find their total score in the array and set their rank for this episode as the index + 1

  totalScores.sort((a, b) => b - a);
  const ranks = [];

  totalScores.forEach((score) => {
    if (ranks.indexOf(score) === -1) {
      ranks.push(score);
    } else {
      ranks.push('skip');
    }
  });

  players.forEach((player) => {
    player.rank.push(ranks.indexOf(player.totalScore) + 1);
  });

  // compare values.eliminated to eliminated value of survivors, find any survivors who were eliminated this episode and update only those.
  const eliminatedThisEpisode = [];
  survivors
    .filter((survivor) => survivor.eliminated === false)
    .forEach((survivor) => {
      if (eliminated.includes(survivor.name)) {
        eliminatedThisEpisode.push(survivor);
      }
    });

  const data = {
    players,
    eliminatedThisEpisode,
  };

  fetch('/api/updatescores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      setSubmitted(true);
      if (window.confirm('Scores updated. Do you want to reload the page?')) {
        window.location.reload(true);
      }
    })
    .catch((err) => console.log(err));
};

const deleteLatestScore = (players) => {
  const data = { players };

  fetch('/api/deletelatestscore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((err) => console.log(err));
};

const clearEliminated = (survivors) => {
  const data = { survivors };
  fetch('/api/cleareliminated', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      if (
        window.confirm(
          'Reset eliminated survivors. Do you want to reload the page?'
        )
      ) {
        window.location.reload(true);
      }
    })
    .catch((err) => console.log(err));
};

const copyEmails = async () => {
  fetch('/api/copyemails');
};

export default function admin({ players, survivors }) {
  const [Submitted, setSubmitted] = useState(false);
  const [emails, setEmails] = useState('');

  const initialValues = {
    scores: {},
    eliminated: [],
  };

  survivors.forEach((survivor) => {
    if (survivor.eliminated) {
      initialValues.eliminated.push(survivor.name);
    }
    initialValues.scores[survivor.name] = '';
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Admin</title>
      </Head>
      <Layout>
        <h2 className="mb-8 text-xl md:text-2xl">Welcome to the admin page.</h2>
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            updateScores(values, setSubmitted, players, survivors);
            resetForm();
          }}
        >
          {(formik) => (
            /* --- FORM START --- */

            <form
              className="flex flex-col items-center mb-8 text-lg md:text-base"
              onSubmit={formik.handleSubmit}
            >
              {survivors.map((survivor) => {
                return (
                  <div
                    key={survivor.name}
                    className="flex items-center justify-between w-full p-1"
                  >
                    <label htmlFor={survivor.name + ' Episode Score'}>
                      {survivor.name}
                    </label>
                    <div>
                      <Field
                        type="number"
                        name={`scores.${survivor.name}`}
                        id={survivor.name + ' Episode Score'}
                        onChange={formik.handleChange}
                        aria-label={survivor.name}
                        disabled={survivor.eliminated} // set disabled based on server data rather than the current formik value for eliminated.
                        className="w-20 p-1 ml-4 text-black border rounded outline-none focus:ring focus:ring-lime-500"
                      />
                      <Field
                        type="checkbox"
                        id={survivor.name + ' Eliminated'}
                        name="eliminated"
                        value={survivor.name}
                        className="w-6 h-6 ml-2 outline-none md:w-4 md:h-4 focus:ring focus:ring-lime-500"
                        onChange={formik.handleChange}
                        disabled={survivor.eliminated} // set disabled based on server data rather than the current formik value for eliminated.
                        checked={formik.values.eliminated.includes(
                          survivor.name
                        )}
                      />
                    </div>
                  </div>
                );
              })}
              {formik.errors.scores && formik.touched.scores ? (
                <div className="text-sm text-left text-red-400">
                  {formik.errors.scores}
                </div>
              ) : null}
              {formik.errors.eliminated && formik.touched.eliminated ? (
                <div className="text-sm text-left text-red-400">
                  {formik.errors.eliminated}
                </div>
              ) : null}
              <button
                className="p-1 mt-4 border rounded"
                onClick={formik.handleSubmit}
                type="submit"
              >
                Update Scores
              </button>
            </form>
          )}
        </Formik>

        {/* --- DANGER ZONE --- */}

        <div className="w-full p-2 border border-red-500 rounded">
          <h3 className="mb-4 text-xl ">Danger Zone</h3>
          <div className="flex flex-col justify-center w-full md:flex-row">
            <button
              className="p-1 mb-2 border rounded md:ml-2"
              onClick={() => deleteLatestScore()}
            >
              Delete latest score
            </button>
            <button
              className="p-1 mb-2 border rounded md:ml-2"
              onClick={() => copyEmails()}
            >
              Copy Player Emails
            </button>

            <button
              className="p-1 mb-2 border rounded md:ml-2"
              onClick={() => clearEliminated(survivors)}
            >
              Clear Eliminated
            </button>
            <button
              className="p-1 mb-2 border rounded md:ml-2"
              onClick={() => resetPlayerScores(players)}
            >
              Reset player scores
            </button>
            <button
              className="p-1 mb-2 border rounded md:ml-2"
              onClick={deletePlayers}
            >
              Delete all players
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const survivors = await Client.fetch('*[_type == "survivor"]')
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
