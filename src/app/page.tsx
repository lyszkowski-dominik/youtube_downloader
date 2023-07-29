import { Dosis } from 'next/font/google';

const dosis = Dosis({
  weight: '500',
  subsets: ['latin'],
});
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className={`text-4xl ${ dosis.className }`}>Simple Youtube Downloader</div>
      </div>
    </main>
  );
}
