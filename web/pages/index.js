import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/Layout';

export default function Home(props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Home</title>
      </Head>
      <Layout>
        <h2 className="mb-8 text-xl md:text-2xl">
          Welcome to the Survivor Fantasy Pool!
        </h2>

        <div className="flex flex-col items-start justify-start w-full px-4 md:px-16">
          <section className="mb-4 text-left">
            <h3 className="mb-2 text-xl">Rules</h3>
            <p>Entry Fee: $20</p>
            <ol className="flex flex-col items-start ml-6 text-left list-decimal md:ml-4">
              <li>
                <p>
                  Head over to the{' '}
                  <Link href="/signup">
                    <a className="text-red-600 dark:text-red-400 hover:underline">
                      Sign Up
                    </a>
                  </Link>{' '}
                  page.
                </p>
              </li>
              <li>
                <p>
                  Enter your information. Select 5 survivors to be your "Fantasy
                  Tribe", then select one of those survivors to be your MVP (the
                  person you think will win).
                </p>
              </li>
              <li>
                <p>
                  Send your $20 entry fee via eTransfer to{' '}
                  <strong>tanner.wiltshire@gmail.com</strong>. Set the password
                  to "survivor". You won't show up in the standings until your
                  entry fee is received!
                </p>
              </li>
              <li>
                <p>
                  Check the{' '}
                  <Link href="/standings">
                    <a className="text-red-600 dark:text-red-400 hover:underline">
                      standings page
                    </a>
                  </Link>{' '}
                  each week to see how you did!
                </p>
              </li>
            </ol>
          </section>

          <section className="mb-4 text-left">
            <h3 className="mb-2 text-xl">Scoring</h3>
            <p>
              The scoring system used comes from{' '}
              <Link href="https://www.globaltv.com/survivor-48-fantasy-tribe/">
                <a className="text-red-600 dark:text-red-400 hover:underline">
                  Global TV's Scoring System
                </a>
              </Link>
              . Your top three scoring survivors will earn you points each week.
              Points begin to accumulate beginning with Episode 3.
            </p>
          </section>
        </div>
      </Layout>
    </div>
  );
}
