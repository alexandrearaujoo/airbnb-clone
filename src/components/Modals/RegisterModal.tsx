'use client';

import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import Button from '../Button';
import Heading from '../Heading';
import { Input } from '../Inputs/Input';
import Modal from './Modal';

import { useLoginModal } from '@/hooks/useLoginModal';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { RegisterProps, registerSchema } from '@/schemas/register';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<RegisterProps>({
    resolver: zodResolver(registerSchema),
    mode: 'all'
  });

  const onSubmit = async (data: RegisterProps) => {
    try {
      await axios.post('/api/register', data);
      toast.success('Success!');
      registerModal.onClose();
      loginModal.onOpen();
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    }
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an Account" />
      <Input
        id="email"
        label="Email"
        disabled={isSubmitting}
        errors={errors.email?.message}
        {...register('email')}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isSubmitting}
        errors={errors.name?.message}
        {...register('name')}
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
          <p className="">Already have an account ?</p>
          <p
            onClick={toggle}
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
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
