import { useState } from 'react';
import { Formik, Field } from 'formik';
import { ClipLoader } from 'react-spinners';

const validate = async (values) => {
  const errors = {};

  const usernames = await fetch('/api/usernames').then((data) => data.json());

  usernames.forEach((item) => {
    if (values.username.toLowerCase() === item.username.toLowerCase()) {
      errors.username =
        'Please choose another username, this one has already been taken.';
    }
  });

  if (!values.username) {
    errors.username = 'Please enter a Username.';
  }

  if (!values.email) {
    errors.email = 'Please enter a valid email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (values.picks.length < 5) {
    errors.picks = `Please select ${
      5 - values.picks.length
    } more survivors for your tribe`;
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
      className={`text-black p-1 w-full focus:ring focus:ring-lime-500 outline-none rounded border ${
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

const submitPlayer = (values, setIsSubmitted, setIsSubmitting) => {
  fetch('/api/createplayer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(() => setIsSubmitted(true))
    .then(() => setIsSubmitting(false))
    .catch((err) => console.log(err));
};

export default function SignupForm({ survivors, setIsSubmitted }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [randomPicks, setRandomPicks] = useState([]);

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
        setIsSubmitting(true);
        submitPlayer(values, setIsSubmitted, setIsSubmitting);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center text-lg md:text-base"
        >
          <div className="flex flex-col items-start w-full mb-4">
            <label htmlFor="username" className="mb-1">
              Username:
            </label>
            <TextInput name="username" formik={formik} />

            {formik.errors.username && formik.touched.username ? (
              <div className="text-sm text-left text-red-400">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start w-full mb-4">
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
              <div className="self-start text-sm text-left text-red-400">
                {formik.errors.mvp}
              </div>
            ) : null}
            {formik.errors.picks && formik.touched.picks ? (
              <div className="self-start text-sm text-left text-red-400">
                {formik.errors.picks}
              </div>
            ) : null}

            <div className="flex justify-around w-full py-4 mx-auto md:w-3/4">
              <button
                type="button"
                className="p-1 border rounded text-md w-28 md:w-32 "
                onClick={() => {
                  const selected = [];

                  // remove eliminated survivors from options
                  const availableSurvivors = survivors.filter(
                    (survivor) => !survivor.eliminated
                  );

                  while (selected.length < 5) {
                    // Create a random index to use for this selection
                    const randomIndex = Math.floor(
                      Math.random() * availableSurvivors.length
                    );

                    // Add the survivor at the randomIndex to the selected array
                    selected.push(availableSurvivors[randomIndex].name);

                    // Remove the survivor from the available survivors so they can't be selected at random again.
                    availableSurvivors.splice(randomIndex, 1);
                  }

                  formik.setFieldValue('picks', selected);
                }}
              >
                Suggest picks
              </button>

              <button
                type="button"
                className="p-1 border rounded text-md w-28 md:w-32 "
                onClick={() => {
                  const selected = [];

                  // remove eliminated survivors from options
                  const availableSurvivors = survivors.filter(
                    (survivor) => !survivor.eliminated
                  );

                  while (selected.length < 5) {
                    // Create a random index to use for this selection
                    const randomIndex = Math.floor(
                      Math.random() * availableSurvivors.length
                    );

                    // Add the survivor at the randomIndex to the selected array
                    selected.push(availableSurvivors[randomIndex].name);

                    // Remove the survivor from the available survivors so they can't be selected at random again.
                    availableSurvivors.splice(randomIndex, 1);
                  }

                  formik.setFieldValue('picks', selected);
                  formik.setFieldValue(
                    'mvp',
                    selected[Math.floor(Math.random() * selected.length)]
                  );
                }}
              >
                Pick for me
              </button>
              <button
                className="p-1 border rounded text-md w-28 md:w-32 "
                type="button"
                onClick={() => {
                  formik.setFieldValue('picks', []);
                  formik.setFieldValue('mvp', '');
                }}
              >
                Clear picks
              </button>
            </div>

            <h2 className="self-start">MVP</h2>

            {survivors.map((survivor) => (
              <div className="flex items-center mb-2" key={survivor.name}>
                <Field
                  type="radio"
                  name="mvp"
                  id={`${survivor.name}-radio`}
                  value={survivor.name}
                  className="ml-1 mr-4 text-transparent border outline-none form-radio border-grey-500 disabled:bg-grey-400 md:ml-2 w-7 h-7 md:w-4 md:h-4 focus:ring focus:ring-lime-500"
                  onChange={formik.handleChange}
                  aria-label={survivor.name}
                  disabled={
                    survivor.eliminated
                      ? true
                      : formik.values.picks.length < 5 ||
                        formik.values.picks.includes(survivor.name)
                      ? false
                      : true
                  }
                />

                <Field
                  type="checkbox"
                  // disable as long as 5 selections are made, but don't disable selected options. Then enable all when there are fewer than 5
                  disabled={
                    survivor.eliminated
                      ? true
                      : formik.values.picks.length < 5 ||
                        formik.values.picks.includes(survivor.name)
                      ? false
                      : true
                  }
                  id={survivor.name}
                  name="picks"
                  value={survivor.name}
                  className="w-6 h-6 mr-2 outline-none md:w-4 md:h-4 focus:ring focus:ring-lime-500"
                  onChange={formik.handleChange}
                />
                {'  '}
                <label htmlFor={survivor.name}>
                  {survivor.name}{' '}
                  <span className="text-red-600 dark:text-red-400">
                    {survivor.eliminated ? 'Eliminated' : null}
                  </span>
                </label>
              </div>
            ))}
          </fieldset>
          {Object.keys(formik.errors).length !== 0 && (
            <div className="text-sm text-left text-red-400">
              There are errors on the page, please make sure you've entered
              everything correctly.
            </div>
          )}

          {isSubmitting && <ClipLoader color={'lime'} />}
          <button
            className="w-20 p-1 mt-4 border rounded"
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
