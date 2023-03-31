import { Nunito } from 'next/font/google';

import RegisterModal from '@/components/Modals/RegisterModal';
import Navbar from '@/components/Navbar/Navbar';

import './globals.css';
import ToasterProvider from '@/providers/ToasterProvider';

const nunito = Nunito({
  subsets: ['latin']
});

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
