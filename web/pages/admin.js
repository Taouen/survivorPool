import Head from 'next/head';
import { useState } from 'react';
import { Formik, Field } from 'formik';
import { ClipLoader } from 'react-spinners';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import Layout from '../components/Layout';
import Client from '../components/Client.js';

const deletePlayers = (setIsSubmitting) => {
  setIsSubmitting(true);
  if (window.confirm('Are you sure you want to delete all players?')) {
    if (window.confirm('Are you really sure?')) {
      try {
        fetch('/api/deleteplayers').then(() => {
          setIsSubmitting(false);
          window.alert('All players have been deleted.');
        });
      } catch {
        console.error(error);
      }
    }
  }
};

const resetScores = (players, survivors, setIsSubmitting) => {
  const data = { players, survivors };

  if (
    window.confirm(
      'Are you sure you want to reset all player and survivor scores?'
    )
  ) {
    if (window.confirm('Are you really sure?')) {
      setIsSubmitting(true);
      fetch('/api/resetScores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          setIsSubmitting(false);
        })
        .catch((err) => console.log(err));
    }
  }
};

const updateScores = (values, setIsSubmitting, players, survivors) => {
  const scores = { ...values.scores };

  for (const score in scores) {
    scores[score] = scores[score] === '' ? 0 : scores[score];
  }

  const updatedSurvivors = survivors.map((survivor) => {
    const updatedSurvivor = { ...survivor };

    if (!updatedSurvivor.episodeScores) {
      updatedSurvivor.episodeScores = [];
    }

    if (!updatedSurvivor.totalScore) {
      updatedSurvivor.totalScore = 0;
    }

    updatedSurvivor.episodeScores.push(scores[updatedSurvivor.name]);
    updatedSurvivor.totalScore += scores[updatedSurvivor.name];
    updatedSurvivor.eliminated = values.eliminated.includes(
      updatedSurvivor.name
    );

    return updatedSurvivor;
  });

  const updatedPlayers = players.map((player) => {
    const updatedPlayer = { ...player };
    const { mvp, picks, episodeScores } = updatedPlayer;

    const pickScores = [];

    picks.forEach((pick) => {
      pickScores.push(scores[pick.name]);
    });
    pickScores.push(scores[mvp.name]);

    const episodeScore = [...pickScores]
      .sort((a, b) => b - a) // sort highest to lowest
      .slice(0, 3) // remove everything after the first 3 scores
      .reduce((a, b) => a + b, 0); // sum up scores

    episodeScores.push(episodeScore);
    updatedPlayer.totalScore = episodeScores.reduce((a, b) => a + b, 0);

    return updatedPlayer;
  });

  // Determine ranks by sorting players by totalScore
  const sortedPlayers = [...updatedPlayers].sort(
    (a, b) => b.totalScore - a.totalScore
  );

  let rank = 1;
  let prevScore = sortedPlayers[0].totalScore;

  sortedPlayers.forEach((player, i) => {
    player.rank.push(prevScore === player.totalScore ? rank : (rank = i + 1));
    prevScore = player.totalScore;
  });

  const data = {
    players: sortedPlayers,
    survivors: updatedSurvivors,
  };
  setIsSubmitting(true);
  fetch('/api/updatescores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      setIsSubmitting(false);
      if (window.confirm('Scores updated. Do you want to reload the page?')) {
        window.location.reload(true);
      }
    })
    .catch((err) => console.log(err));
};

const deleteLatestScore = (players, survivors, setIsSubmitting) => {
  const data = { players, survivors };
  setIsSubmitting(true);
  fetch('/api/deletelatestscore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      setIsSubmitting(false);
    })
    .catch((err) => console.log(err));
};

const clearEliminated = (survivors, setIsSubmitting) => {
  const data = { survivors };
  setIsSubmitting(true);
  fetch('/api/cleareliminated', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      setIsSubmitting(false);
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
  const request = await fetch('/api/copyemails').then((data) => data.json());
  console.log(request.message);
};

export default withPageAuthRequired(function admin({ players, survivors }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            updateScores(values, setIsSubmitting, players, survivors);
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
              {isSubmitting && <ClipLoader color={'lime'} />}
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
              onClick={() =>
                deleteLatestScore(players, survivors, setIsSubmitting)
              }
            >
              Delete latest score
            </button>
            <button
              className="p-1 mb-2 border rounded md:ml-2"
              onClick={() => copyEmails(setIsSubmitting)}
            >
              Copy Player Emails
            </button>

            <button
              className="p-1 mb-2 border rounded md:ml-2"
              onClick={() => clearEliminated(survivors, setIsSubmitting)}
            >
              Clear Eliminated
            </button>
            <button
              className="p-1 mb-2 border rounded md:ml-2"
              onClick={() => resetScores(players, survivors, setIsSubmitting)}
            >
              Reset scores
            </button>
            <button
              className="p-1 mb-2 border rounded md:ml-2"
              onClick={() => deletePlayers(setIsSubmitting)}
            >
              Delete all players
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
});

export async function getStaticProps() {
  const survivors = await Client.fetch(
    '*[_type == "survivor"] | order(name, asc)'
  ).catch((err) => console.error(err));
  const players = await Client.fetch(
    '*[_type == "player"] | order(username asc) {..., mvp->{...}, picks[]->{...}}'
  ).catch((err) => console.error(err));
  return {
    props: {
      survivors,
      players,
    },
    revalidate: 10,
  };
}
