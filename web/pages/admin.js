import Head from 'next/head';
import { useState } from 'react';

import Layout from '../components/Layout';
import Client from '../components/Client.js';
import DangerZone from '../components/DangerZone.js';
import ScoreUpdater from '../components/ScoreUpdater.js';
import AdminNav from '../components/AdminNav';
import ManageSurvivors from '../components/ManageSurvivors';
import ManagePlayers from '../components/ManagePlayers';

export default function admin({ players, survivors }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Update Scores');

  const displayComponent = () => {
    switch (selectedPage) {
      case 'Update Scores':
        return (
          <ScoreUpdater
            players={players}
            survivors={survivors}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        );
      case 'Manage Survivors':
        return (
          <ManageSurvivors
            survivors={survivors}
            setIsSubmitting={setIsSubmitting}
          />
        );
      case 'Manage Players':
        return (
          <ManagePlayers players={players} setIsSubmitting={setIsSubmitting} />
        );
      default:
        return <p>No component found</p>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Admin</title>
      </Head>
      <Layout>
        <h2 className="mb-8 text-xl md:text-2xl">Welcome to the admin page.</h2>
        <AdminNav setSelectedPage={setSelectedPage} />
        {displayComponent()}

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
    '*[_type == "player"]{..., mvp->{...}, picks[]->{...}}'
  )
    .then((data) =>
      data.sort((a, b) =>
        a.username.toLowerCase() - b.username.toLowerCase() < 0
          ? 1
          : b.username.toLowerCase() > a.username.toLowerCase()
          ? -1
          : 0
      )
    )
    .catch((err) => console.error(err));
  return {
    props: {
      survivors,
      players,
    },
    revalidate: 10,
  };
}
