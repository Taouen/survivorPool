import Head from 'next/head';
import { useState } from 'react';

import Layout from '../components/Layout';
import Client from '../components/Client.js';
import DangerZone from '../components/DangerZone.js';
import ScoreUpdater from '../components/ScoreUpdater.js';

export default function admin({ players, survivors }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Admin</title>
      </Head>
      <Layout>
        <h2 className="mb-8 text-xl md:text-2xl">Welcome to the admin page.</h2>
        <ScoreUpdater
          players={players}
          survivors={survivors}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
        {/* --- DANGER ZONE --- */}
        <DangerZone
          players={players}
          survivors={survivors}
          setIsSubmitting={setIsSubmitting}
        />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const survivors = await Client.fetch(
    '*[_type == "survivor"] | order(name, asc)'
  ).catch((err) => console.error(err));
  const players = await Client.fetch(
    '*[_type == "player"] | order(username asc) {..., mvp->{...}, picks[]->{...}}'
  ).catch((err) => console.error(err));
  return {
    props: {
      survivors,
      players,
    },
    revalidate: 10,
  };
}
