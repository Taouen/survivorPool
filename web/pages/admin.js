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
  const data = {
    values,
    players,
    survivors,
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
  const emails = await fetch('/api/copyemails').then((data) => data.json());
  const emailList = [];
  emails.forEach((item) => {
    emailList.push(item.email);
  });

  navigator.clipboard.writeText(emailList.join(','));
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
                    className="w-20 p-1 mb-2 text-black border rounded outline-none md:ml-4 focus:ring focus:ring-lime-500"
                    onChange={formik.handleChange}
                  />
                  <button
                    className="p-1 mb-2 ml-2 border rounded"
                    onClick={formik.handleSubmit}
                    type="submit"
                  >
                    Delete Episode Scores
                  </button>
                </form>
              )}
            </Formik>
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
