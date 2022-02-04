import { Formik, Field } from 'formik';

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please enter a Username.';
  }

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const TextInput = ({ name, formik }) => {
  return (
    <input
      className={`text-black p-1 w-full ${
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

export default function SignupForm({ players, survivors }) {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        picks: [],
        mvp: '',
      }}
      validate={validate}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
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
            <TextInput name="username" formik={formik} />

            {formik.errors.username && formik.touched.username ? (
              <div className="text-sm text-red-400">
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
          <fieldset>
            <legend className="mb-2 text-left">
              Select 5 Survivors for your tribe, and pick one to be your MVP
              (who you think will win)
            </legend>

            {survivors.map((survivor) => (
              <div className="flex mb-2" key={survivor.name}>
                <Field
                  type="radio"
                  name="mvp"
                  id={`${survivor.name}-radio`}
                  value={survivor.name}
                  className="mr-2 w-7 h-7 md:w-4 md:h-4"
                  onChange={formik.handleChange}
                  aria-label={survivor.name}
                />

                <Field
                  type="checkbox"
                  id={survivor.name}
                  name="picks"
                  value={survivor.name}
                  className="mr-2 w-7 h-7 md:w-4 md:h-4"
                  onChange={formik.handleChange}
                />
                {'  '}
                <label htmlFor={survivor.name}>{survivor.name}</label>
              </div>
            ))}
          </fieldset>

          <button className="bg-gray-700 p-1 w-20 rounded" type="submit">
            Sign Up
          </button>
        </form>
      )}
    </Formik>
  );
}
