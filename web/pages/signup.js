import Head from 'next/head';
import { useState } from 'react';

import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';

const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'development',
  apiVersion: '2022-02-08', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

export default function signup({ players, survivors }) {
  const [signupComplete, setSignupComplete] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Sign Up</title>
      </Head>
      <Layout>
        {signupComplete ? (
          <p>Thanks for signing up!</p>
        ) : (
          <SignupForm
            survivors={survivors}
            players={players}
            setSignupComplete={setSignupComplete}
          />
        )}
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const survivors = await client
    .fetch('*[_type == "survivor"] {name}')
    .catch((err) => console.error(err));
  const players = await client
    .fetch('*[_type == "player"] {username}')
    .catch((err) => console.error(err));

  return {
    props: {
      players,
      survivors,
    },
    revalidate: 5,
  };
}
