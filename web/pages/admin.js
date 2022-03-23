import Head from 'next/head';
import { useState } from 'react';
import { Formik, Field } from 'formik';

import Layout from '../components/Layout';
import Client from '../components/Client.js';

const validate = (values) => {
  const errors = {};

  if (
    !Object.values(values.scores).every((score) => typeof score === 'number')
  ) {
    errors.scores = 'Please enter only numbers in the score boxes.';
  }
  return errors;
};

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

const updateScores = (values, setSubmitted, players) => {
  const data = {
    values,
    players,
  };
  if (window.confirm('Are you sure you want to delete all player scores?')) {
    if (window.confirm('Are you really sure?')) {
      fetch('/api/updatescores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          setSubmitted(true);
        })
        .catch((err) => console.log(err));
    }
  }
};

const deleteEpisodeScores = (players, values) => {
  const data = {
    players,
    values,
  };

  fetch('/api/deleteepisodescore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((err) => console.log(err));
};

export default function admin({ players, survivors }) {
  const [Submitted, setSubmitted] = useState(false);

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
        <h2 className="text-xl md:text-2xl mb-8">Welcome to the admin page.</h2>
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          validate={validate}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            updateScores(values, setSubmitted, players);
            resetForm();
          }}
        >
          {(formik) => (
            <form
              className="flex flex-col text-lg md:text-base items-center mb-8"
              onSubmit={formik.handleSubmit}
            >
              {survivors.map((survivor) => {
                return (
                  <div
                    key={survivor.name}
                    className="flex w-full items-center justify-between
                     p-1"
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
                        className="text-black p-1 ml-4 w-20 
                       focus:ring focus:ring-lime-500 outline-none rounded border"
                      />
                      <Field
                        type="checkbox"
                        id={survivor.name + ' Eliminated'}
                        name="eliminated"
                        value={survivor.name}
                        className="ml-2 w-6 h-6 md:w-4 md:h-4 outline-none focus:ring focus:ring-lime-500"
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
                className="border mt-4 p-1 rounded"
                onClick={formik.handleSubmit}
                type="submit"
              >
                Update Scores
              </button>
            </form>
          )}
        </Formik>
        <div className="border border-red-500 rounded w-full p-2">
          <h3 className="text-xl mb-4 ">Danger Zone</h3>
          <div className="flex w-full justify-center">
            <Formik
              initialValues={{ episode: '' }}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={(values, { resetForm }) => {
                deleteEpisodeScores(players, values);
                resetForm();
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <Field
                    type="number"
                    id="episode"
                    name="episode"
                    className="text-black p-1 ml-4 w-20 
                       focus:ring focus:ring-lime-500 outline-none rounded border"
                    onChange={formik.handleChange}
                  />
                  <button
                    className="border ml-2 p-1 rounded"
                    onClick={formik.handleSubmit}
                    type="submit"
                  >
                    Delete Episode Scores
                  </button>
                </form>
              )}
            </Formik>
            <button
              className="border p-1 ml-2 rounded"
              onClick={() => resetPlayerScores(players)}
            >
              Reset player scores
            </button>
            <button className="border ml-2 p-1 rounded" onClick={deletePlayers}>
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
