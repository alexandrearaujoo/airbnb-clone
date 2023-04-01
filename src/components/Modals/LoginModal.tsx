'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import Button from '../Button';
import Heading from '../Heading';
import { Input } from '../Inputs/Input';
import Modal from './Modal';

import { useLoginModal } from '@/hooks/useLoginModal';
import { LoginProps, loginSchema } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginProps>({
    resolver: zodResolver(loginSchema),
    mode: 'all'
  });

  const onSubmit = async (data: LoginProps) => {
    await signIn('credentials', { ...data, redirect: false }).then(
      (callback) => {
        if (callback?.ok) {
          toast.success('Logged in');
          router.refresh();
          loginModal.onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      }
    );
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to yout account" />
      <Input
        id="email"
        label="Email"
        disabled={isSubmitting}
        errors={errors.email?.message}
        {...register('email')}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isSubmitting}
        errors={errors.password?.message}
        {...register('password')}
        type="password"
        required
      />
    </div>
  );

  const footerContent = (
    <footer className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className=" text-neutral-500 mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <p className="">Already have an account</p>
          <p
            onClick={loginModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <Modal
      disabled={isSubmitting}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
