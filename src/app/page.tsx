'use client';
import { Dosis } from 'next/font/google';
import { fetchMusic, extractID, validateURL, my_error } from './utils/utils';
import { useState } from 'react';
import { Formik, FormikHelpers, Form, Field } from 'formik';

const dosis = Dosis({
  weight: '500',
  subsets: ['latin'],
});

interface FormValues {
  url: string;
}

export default function Home() {
  const [downloadURL, setDownloadURL] = useState('');
  const [error, setError] = useState('');

  const handleDownloadButton = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const songID = extractID(values.url);

    (async function () {
      try {
        const link = await fetchMusic(songID);
        setDownloadURL(link);
      } catch (error: any) {
        if (error instanceof my_error)
          setError(error.message);
      }
    })();

    // fetchMusic(songID, setDownloadURL);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const initialValues: FormValues = { url: '' };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center min-w-full">
        <div className={`text-4xl ${dosis.className}`}>
          Simple Youtube Downloader
          <Formik initialValues={initialValues} onSubmit={handleDownloadButton}>
            {({ errors, touched, isValidating }) => (
              <Form>
                <label
                  htmlFor="url"
                  className={`text-2xl block mt-5 mb-2 ${dosis.className}`}
                >
                  Input url to the youtube page
                </label>
                <Field
                  id="url"
                  name="url"
                  placeholder=" Song url"
                  className="block mx-auto h-10 w-6/12 rounded-lg text-lg text-center"
                  validate={validateURL}
                />
                {error && (
                  <div className="block text-red-700 text-2xl m-3">{error}</div>
                )}
                {errors.url && touched.url && (
                  <div className="text-2xl text-red-700">{errors.url}</div>
                )}
                <button
                  disabled={errors.url ? true : false}
                  type="submit"
                  className="mt-5 min-w-200 bg-amber-400 h-12 rounded-lg inline-block p-2 text-center align-middle text-lg transition ease-in-out hover:bg-bluish duration-300 disabled:opacity-75 disabled:bg-slate-500"
                >
                  Load song
                </button>
                {downloadURL ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={downloadURL}
                    className="mt-5 ml-5 min-w-200 bg-amber-400 h-12 rounded-lg inline-block p-2 text-center align-middle text-lg no-underline transition ease-in-out hover:bg-bluish duration-300"
                    onClick={() => {
                      setDownloadURL('');
                    }}
                  >
                    Download song
                  </a>
                ) : (
                  ''
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
