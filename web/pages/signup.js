import Head from 'next/head';
import { useState } from 'react';

import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';
import Client from '../components/Client';

export default function signup({ survivors }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Sign Up</title>
      </Head>
      <Layout>
        {isSubmitted ? (
          <div className="flex flex-col items-start">
            <h2 className="text-xl mb-8 self-center">Thanks for signing up!</h2>
            <h3 className="text-lg mb-4">Next Steps</h3>
            <p className="text-left mb-4">
              Send your $20 entry fee via eTransfer to Tanner at{' '}
              <strong>tanner.wiltshire@gmail.com</strong>. Set the password to
              "survivor". You won't show up in the standings until your entry
              fee is received!
            </p>
            <p className="text-left">
              Then check back each week to see how you did and where you are in
              the standings!
            </p>
          </div>
        ) : (
          <SignupForm survivors={survivors} setIsSubmitted={setIsSubmitted} />
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
