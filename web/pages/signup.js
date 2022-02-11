import Head from 'next/head';
import { useState } from 'react';

import { survivors as survivorsList } from '../components/survivors';
import { players as playersList } from '../components/players';
import client from '../components/Client';
import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';

export default function picks({ survivors }) {
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
            client={client}
            survivors={survivors}
            setSignupComplete={setSignupComplete}
          />
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const survivors = await client
    .fetch('*[_type == "survivor"] {name}')
    .catch((err) => console.error(err));

  return {
    props: {
      survivors,
    },
  };
}
