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
        <h2 className="text-xl md:text-2xl mb-8">
          Welcome to the Survivor Fantasy Pool!
        </h2>

        <div className="flex flex-col items-start justify-start w-full px-4 md:px-16">
          <section className="mb-4 text-left">
            <h3 className="text-xl mb-2">Rules</h3>
            <p>Entry Fee: $20</p>
            <ol className="list-decimal  text-left ml-6 md:ml-4 flex flex-col items-start">
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
                    <a className="text-red-600 dark:text-red-400  hover:underline">
                      standings page
                    </a>
                  </Link>{' '}
                  each week to see how you did!
                </p>
              </li>
            </ol>
          </section>

          <section className="text-left mb-4">
            <h3 className="text-xl mb-2">Scoring</h3>
            <p>
              The scoring system used comes from{' '}
              <Link href="https://www.globaltv.com/shows/survivor/articles/survivor-42-fantasy-tribe-pool/#scoring">
                <a className="text-red-600 dark:text-red-400  hover:underline">
                  Global TV's Scoring System
                </a>
              </Link>
              . Your score each week will be the total of the points that all of
              your survivors earn. Points begin to accumulate beginning with
              Episode 2.
            </p>
          </section>
        </div>
      </Layout>
    </div>
  );
}
