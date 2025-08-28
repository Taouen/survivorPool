import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import Layout from '../components/Layout';

export default function Invite(props) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-grey-800">
      <Head>
        <title>Survivor Fantasy Pool | Invite a friend!</title>
      </Head>
      <Layout>
        <h2 className="mb-8 text-xl md:text-2xl">Invite a friend!</h2>

        <div className="flex flex-col items-start justify-start w-full px-4 md:px-16">
          <section className="mb-4 text-left">
            <p>
              Have a friend who watches Survivor? Invite them to create their
              own Fantasy tribe!
            </p>
            <br></br>
            <p>
              Enter their email address below and click "Create invite email". A
              new email will open in your email program for you to send to them
              with an invitation to join the pool!
            </p>
          </section>
          <form onSubmit={handleSubmit}>
            <input
              className="text-black"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Create invite email!</button>
          </form>
        </div>
      </Layout>
    </div>
  );
}
