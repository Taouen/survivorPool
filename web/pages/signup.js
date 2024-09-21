import Head from 'next/head';
import { useState } from 'react';

import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';
import Client from '../components/Client';

export default function signup({ survivors }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  // https://currentmillis.com/?now use Milliseconds since Unix Epoch
  const hideTime = 1727913600788; // Season 46 specific
  const hideSignup = Date.now() > hideTime;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Sign Up</title>
      </Head>
      <Layout>
        {hideSignup ? (
          <h3>Sign up has ended for this season!</h3>
        ) : isError ? (
          <div className="flex flex-col items-start">
            <h2 className="self-center mb-8 text-xl">Oops!</h2>

            <p className="mb-4 text-left">
              Sorry, something went wrong when trying to complete your signup.
              Please refresh the page and try again. If the problem persists,
              please contact me at{' '}
              <a
                href="mailto:tanner.wiltshire@gmail.com"
                subject="Signup error"
              >
                tanner.wiltshire@gmail.com
              </a>
            </p>
          </div>
        ) : isSubmitted ? (
          <div className="flex flex-col items-start">
            <h2 className="self-center mb-8 text-xl">Thanks for signing up!</h2>
            <h3 className="mb-4 text-lg">Next Steps</h3>
            <p className="mb-4 text-left">
              Send your $20 entry fee via eTransfer to{' '}
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
          <SignupForm
            survivors={survivors}
            setIsSubmitted={setIsSubmitted}
            setIsError={setIsError}
          />
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const survivors = await Client.fetch(
    '*[_type == "survivor"] | order(name asc)'
  ).catch((err) => console.error(err));

  return {
    props: {
      survivors,
    },
  };
}
