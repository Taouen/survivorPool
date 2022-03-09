import Head from 'next/head';
import { useState } from 'react';

import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';
import Client from '../components/Client';

export default function signup({ survivors }) {
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
            setSignupComplete={setSignupComplete}
          />
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const survivors = await Client.fetch('*[_type == "survivor"] {name}')
    .then((data) =>
      data.sort((a, b) => (a.name - b.name < 0 ? 1 : b.name > a.name ? -1 : 0))
    )
    .catch((err) => console.error(err));

  return {
    props: {
      survivors,
    },
  };
}
