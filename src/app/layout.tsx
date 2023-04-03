import { Nunito } from 'next/font/google';

import LoginModal from '@/components/Modals/LoginModal';
import RegisterModal from '@/components/Modals/RegisterModal';
import RentModal from '@/components/Modals/RentModal';
import SearchModal from '@/components/Modals/SearchModal';
import Navbar from '@/components/Navbar/Navbar';

import './globals.css';
import { getCurrentUser } from '@/actions/getCurrentUser';
import ToasterProvider from '@/providers/ToasterProvider';

const nunito = Nunito({
  subsets: ['latin']
});

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
