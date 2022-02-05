import Head from 'next/head';

import { survivors as survivorsList } from '../components/survivors';
import { players as playersList } from '../components/players';
import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';

export default function picks({ players, survivors }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Sign Up</title>
      </Head>
      <Layout>
        <SignupForm players={players} survivors={survivors} />
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
