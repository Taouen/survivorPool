import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import Client from '../components/Client.js';
import ScoreUpdater from '../components/ScoreUpdater.js';
import AdminNav from '../components/AdminNav';
import ManageSurvivors from '../components/ManageSurvivors';
import ManagePlayers from '../components/ManagePlayers';
import useUser from '../lib/useUser';

export default function admin({ players, survivors }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Update Scores');
  const router = useRouter();

  // Fetch the user client-side
  const { user } = useUser({
    redirectTo: `/login?ref=admin`,
    redirectIfUserFound: `/admin`,
  });

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return (
      <Layout>
        <div className="block min-h-screen"></div>
      </Layout>
    );
  }

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
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <h2 className="mb-8 text-xl md:text-2xl">
              Welcome to the admin page.
            </h2>
            <AdminNav setSelectedPage={setSelectedPage} />
            {displayComponent()}
          </>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const survivors = await Client.fetch(
    '*[_type == "survivor"] | order(name asc)'
  ).catch((err) => console.error(err));
  const players = await Client.fetch(
    '*[_type == "player"] | order(username asc) {..., mvp->{...}, picks[]->{...}}'
  ).catch((err) => console.error(err));
  return {
    props: {
      survivors,
      players,
    },
  };
}
