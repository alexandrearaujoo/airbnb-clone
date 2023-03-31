import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <h1 className={`${inter.className} text-black font-bold`}>
      Hello, Next.js!
    </h1>
  );
}
