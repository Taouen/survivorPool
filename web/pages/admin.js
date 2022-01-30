import { survivors as survivorsList } from '../components/survivors';
import { players as playersList } from '../components/players';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function picks({ players, survivors }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Admin</title>
      </Head>
      <Layout>Welcome to the admin page.</Layout>
    </div>
  );
}

export async function getStaticProps() {
  const players = playersList;
  const survivors = survivorsList;
  return {
    props: {
      survivors,
      players,
    },
  };
}
