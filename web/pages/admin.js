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

const updateScores = (values, setSubmitted) => {
  fetch('/api/updatescores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(() => {
      setSubmitted(true);
    })
    .catch((err) => console.log(err));
};

export default function picks({ players, survivors }) {
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
          onSubmit={(values, { setSubmitting, resetForm }) => {
            updateScores(values, setSubmitted);
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
                        disabled={survivor.eliminated}
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
                        checked={formik.values.eliminated.includes(
                          survivor.name
                        )}
                      />
                    </div>
                  </div>
                );
              })}
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
          <h3 className="text-xl">Danger Zone</h3>
          <button className="border mt-4 p-1 rounded" onClick={deletePlayers}>
            Delete all players
          </button>
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
