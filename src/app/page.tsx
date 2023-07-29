'use client';
import { Dosis } from 'next/font/google';
import { fetchMusic } from './utils/utils';
import { extractID } from './utils/utils';
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
  const handleDownloadButton = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values, actions);
    const songID = extractID(values.url);
    console.log(songID);
    fetchMusic(songID, setDownloadURL);

    actions.setSubmitting(false);
    actions.resetForm();
    // implement extracting id from URL and pass it to fetchMusic function
  };

  const initialValues: FormValues = { url: '' };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center min-w-full">
        <div className={`text-4xl ${dosis.className}`}>
          Simple Youtube Downloader
          <Formik initialValues={initialValues} onSubmit={handleDownloadButton}>
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
              />
              <button
                type="submit"
                className="mt-5 min-w-200 bg-amber-400 h-12 rounded-lg inline-block p-2 text-center align-middle text-lg transition ease-in-out hover:bg-bluish duration-300"
              >
                Load song
              </button>
              {downloadURL ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={downloadURL}
                  className="mt-5 ml-5 min-w-200 bg-amber-400 h-12 rounded-lg inline-block p-2 text-center align-middle text-lg no-underline transition ease-in-out hover:bg-bluish duration-300 "
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
          </Formik>
        </div>
      </div>
    </main>
  );
}
