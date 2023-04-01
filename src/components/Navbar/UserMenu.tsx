'use client';

import { signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import { useLoginModal } from '@/hooks/useLoginModal';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { User } from '@prisma/client';

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="relative ">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            console.log('oi');
          }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition"
        >
          Airbnb your home
        </button>
        <button
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col">
            {currentUser ? (
              <>
                <MenuItem label="My trips" onClick={loginModal.onOpen} />
                <MenuItem label="My favorites" onClick={registerModal.onOpen} />
                <MenuItem
                  label="My reservations"
                  onClick={registerModal.onOpen}
                />
                <MenuItem
                  label="My properties"
                  onClick={registerModal.onOpen}
                />
                <MenuItem
                  label="Airbnb my home"
                  onClick={registerModal.onOpen}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
