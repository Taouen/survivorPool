import Head from 'next/head';

import Layout from '../components/Layout';
import Client from '../components/Client.js';

const deletePlayers = () => {
  if (window.confirm('Are you sure you want to delete all players?')) {
    if (window.confirm('Are you really sure?')) {
      try {
        fetch('/api/deleteplayers').then(() =>
          window.alert('All players have been deleted.')
        );
      } catch {
        console.error(error);
      }
    }
  }
};

export default function picks({ players, survivors }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Admin</title>
      </Head>
      <Layout>
        Welcome to the admin page.
        <button className="border mt-4 p-1 rounded" onClick={deletePlayers}>
          Delete all players
        </button>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const survivors = await Client.fetch('*[_type == "survivor"] {name}')
    .then((data) =>
      data.sort((a, b) => (a.name - b.name < 0 ? 1 : b.name > a.name ? -1 : 0))
    )
    .catch((err) => console.error(err));
  const players = await Client.fetch('*[_type == "player"]')
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
