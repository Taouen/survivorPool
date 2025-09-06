import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import useUser from '../lib/useUser';

function Login() {
  // check if already logged in and redirect if so
  const { mutateUser } = useUser({
    redirectIfUserFound: '/admin',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [passwordFieldValue, setPasswordFieldValue] = useState('');

  const handleChange = (e) => {
    setPasswordFieldValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white dark:bg-neutral-800">
      <Head>
        <title>Survivor Fantasy Pool | Player Picks</title>
      </Head>

      <Layout pageName="Protected Content">
        <h1 className="text-2xl md:text-4xl">Protected content</h1>
        <form
          className="flex flex-col items-center mt-4 mb-8"
          onSubmit={async function handleSubmit(event) {
            event.preventDefault();

            const body = {
              password: passwordFieldValue,
            };

            const response = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });

            if (response.ok) {
              try {
                // if the server replies, there's some data in json
                // if a network error, will throw at previous line
                const data = await response.json();
                // console.log(data);
                mutateUser(data);
              } catch (error) {
                console.error('An unexpected error happened:', error);
              }
            } else {
              setErrorMsg('Incorrect password');
            }
          }}
        >
          <label className="block mb-3 font-bold ">
            Enter password to access content
            <input
              type="password"
              name="password"
              required
              className="w-1/2 px-2 py-1 mt-2 text-base bg-transparent border-2 border-black rounded-md "
              value={passwordFieldValue}
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            className="w-1/4 px-3 py-1 text-sm text-white bg-black rounded"
          >
            Submit
          </button>
          {errorMsg && <p>{errorMsg}</p>}
          <p className="mt-4 text-sm">
            If you believe you should have access to the admin settings, please{' '}
            <a
              className="text-red-600 dark:text-red-400 hover:underline"
              href="mailto:tanner.wiltshire@gmail.com"
            >
              contact me
            </a>
            .
          </p>
        </form>
      </Layout>
    </div>
  );
}

export default Login;
