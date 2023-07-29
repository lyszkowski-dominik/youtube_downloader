'use client';
import { Dosis } from 'next/font/google';
import { fetchMusic } from './utils/utils';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';

const dosis = Dosis({
  weight: '500',
  subsets: ['latin'],
});

interface FormValues {
  url: string;
}

export default function Home() {
  const handleDownloadButton = (e: any) => {
    e.preventDefault();
    console.log(e);

    // implement extracting id from URL and pass it to fetchMusic function
  };

  const initialValues: FormValues = { url: '' };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center min-w-full">
        <div className={`text-4xl ${dosis.className}`}>
          Simple Youtube Downloader
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              actions.setSubmitting(false);
              actions.resetForm();
            }}
          >
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
                Download song
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
}
