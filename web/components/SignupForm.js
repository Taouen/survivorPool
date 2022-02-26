import { Formik, Field } from 'formik';

const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: '806pz8zb',
  dataset: 'development',
  apiVersion: '2022-02-08', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

const validate = async (values) => {
  const errors = {};

  const usernames = await fetch('/api/usernames').then((data) => data.json());

  usernames.forEach((item) => {
    if (values.username === item.username) {
      errors.username =
        'Please choose another username, this one has already been taken.';
    }
  });

  if (!values.username) {
    errors.username = 'Please enter a Username.';
  }

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.picks.length < 5) {
    errors.picks = `Please select ${
      5 - values.picks.length
    } more survivors for your tribe`;
  } else if (values.picks.length > 5) {
    errors.picks = `Please select only 5 survivors. You have ${
      values.picks.length - 5
    } too many selected.`;
  }

  if (!values.mvp) {
    errors.mvp = 'Please select an MVP.';
  } else if (!values.picks.includes(values.mvp)) {
    errors.mvp = 'Please select an MVP from your 5 selected survivors.';
  }

  return errors;
};

const TextInput = ({ name, formik }) => {
  return (
    <input
      className={`text-black p-1 w-full rounded border ${
        formik.errors[name] && formik.touched[name]
          ? 'border-2 border-red-400'
          : null
      }`}
      name={`${name}`}
      id={`${name}`}
      type="text"
      autoComplete={`${name}`}
      value={formik.values[name]}
      {...formik.getFieldProps(`${name}`)}
    />
  );
};

const createPlayer = (values) => {
  const { picks, username, email, mvp } = values;

  picks.splice(picks.indexOf(mvp), 1);
  client
    .createIfNotExists({
      _type: 'player',
      _id: `${username}`,
      username: username,
      email: email,
      picks: picks,
      mvp: mvp,
      episodeScores: [],
      totalScore: 0,
      rank: 0,
      paid: false,
    })
    .catch((err) => {
      console.error(err);
    });
};

export default function SignupForm({ players, survivors, setSignupComplete }) {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        picks: [],
        mvp: '',
      }}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // createPlayer(values);
        // setSignupComplete(true);
        setSubmitting(false);
        resetForm();
      }}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col text-lg md:text-base items-center"
        >
          <div className="flex flex flex-col items-start mb-4 w-full">
            <label htmlFor="username" className="mb-1">
              Username:
            </label>
            {/* <TextInput name="username" formik={formik} /> */}
            <Field
              className={`text-black  p-1 w-full rounded border ${
                formik.errors.username && formik.touched.username
                  ? 'border-2 border-red-400'
                  : null
              }`}
              name="username"
              id="username"
              type="text"
              autoComplete="username"
              value={formik.values.username}
              {...formik.getFieldProps('username')}
            />

            {formik.errors.username && formik.touched.username ? (
              <div className="text-sm text-left text-red-400">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start mb-4 w-full">
            <label htmlFor="email" className="mb-1">
              Email Address:
            </label>
            <TextInput name="email" formik={formik} />

            {formik.errors.email && formik.touched.email ? (
              <div className="text-sm text-red-400">{formik.errors.email}</div>
            ) : null}
          </div>
          <fieldset className="flex flex-col">
            <legend className="mb-4 text-left">
              Select 5 Survivors for your tribe, and pick one to be your MVP
              (who you think will win)
            </legend>
            {formik.errors.mvp && formik.touched.mvp ? (
              <div className="text-sm text-left text-red-400 self-start">
                {formik.errors.mvp}
              </div>
            ) : null}
            {formik.errors.picks && formik.touched.picks ? (
              <div className="text-sm text-left self-start text-red-400">
                {formik.errors.picks}
              </div>
            ) : null}
            <h2 className="self-start">MVP</h2>

            {survivors.map((survivor) => (
              <div className="flex mb-2 items-center" key={survivor.name}>
                <Field
                  type="radio"
                  name="mvp"
                  id={`${survivor.name}-radio`}
                  value={survivor.name}
                  className="ml-1 mr-4 form-radio text-transparent disabled:bg-grey-400 md:ml-2 w-7 h-7 md:w-4 md:h-4"
                  onChange={formik.handleChange}
                  aria-label={survivor.name}
                  disabled={
                    formik.values.picks.length < 5 ||
                    formik.values.picks.includes(survivor.name)
                      ? false
                      : true
                  }
                />

                <Field
                  type="checkbox"
                  // disable as long as 5 selections are made, but don't disable selected options. Then enable all when there are fewer than 5
                  disabled={
                    formik.values.picks.length < 5 ||
                    formik.values.picks.includes(survivor.name)
                      ? false
                      : true
                  }
                  id={survivor.name}
                  name="picks"
                  value={survivor.name}
                  className="mr-2 w-6 h-6 md:w-4 md:h-4"
                  onChange={formik.handleChange}
                />
                {'  '}
                <label htmlFor={survivor.name}>{survivor.name}</label>
              </div>
            ))}
          </fieldset>

          <button
            className="border p-1 w-20 rounded"
            onClick={formik.handleSubmit}
            type="submit"
          >
            Sign Up
          </button>
        </form>
      )}
    </Formik>
  );
}
