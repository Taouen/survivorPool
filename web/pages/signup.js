import { survivors as survivorsList } from '../components/survivors';
import { players as playersList } from '../components/players';
import Head from 'next/head';
import Layout from '../components/Layout';

function Form() {
  const registerUser = (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
  };
}

export default function picks({ players, survivors }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Sign Up</title>
      </Head>
      <Layout>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log('submitted');
          }}
          className="flex flex-col"
        >
          <div className="flex flex flex-col items-start mb-4">
            <label htmlFor="name" className="mb-1">
              Username:
            </label>
            <input
              className="text-black p-1"
              id="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>

          <div className="flex flex-col items-start mb-4">
            <label htmlFor="name" className="mb-1">
              Email Address:
            </label>
            <input
              className="text-black p-1"
              id="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <fieldset>
            <legend className="mb-2 text-left">
              Select 5 Survivors for your tribe (you'll select your MVP in the
              next step)
            </legend>

            {survivors.map((survivor) => (
              <div className="flex">
                <input
                  type="checkbox"
                  id={survivor.name}
                  name="picks"
                  value={survivor.name}
                  className="mr-2"
                />
                {'  '}
                <label htmlFor={survivor.name}>{survivor.name}</label>
              </div>
            ))}
          </fieldset>

          <button className="bg-gray-700 p-1 w-20 rounded" type="submit">
            Sign Up
          </button>
        </form>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const players = playersList;
  const survivors = survivorsList;

  return {
    props: {
      players,
      survivors,
    },
  };
}
