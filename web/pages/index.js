import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

/* const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'production',
  apiVersion: '2021-12-11', // use current UTC date - see "specifying API version"!
  token: '', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
}); */

export default function Home(props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Home</title>
      </Head>
      <Layout>
        <h2 className="text-2xl">Welcome to the Survivor Fantasy Pool!</h2>
        {/* <Link href="https://www.globaltv.com/shows/survivor/articles/survivor-42-fantasy-tribe-pool/">
          Global TV's Scoring System
        </Link> */}
      </Layout>
    </div>
  );
}
