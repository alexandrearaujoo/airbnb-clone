'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import Heading from '../Heading';
import CategoryInput from '../Inputs/CategoryInput';
import Modal from './Modal';

import { categories } from '@/data/categories';
import { useRentModal } from '@/hooks/useRentModal';
import { RentProps, rentSchema } from '@/schemas/rent';
import { zodResolver } from '@hookform/resolvers/zod';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<RentProps>({ resolver: zodResolver(rentSchema) });

  const category = watch('category');

  const setCustomValue = (id: 'category', value: string) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of theese best describes your places"
        subtitle="Pick a category"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map(({ label, icon }) => (
          <li key={label} className="cols-span-1">
            <CategoryInput
              label={label}
              icon={icon}
              onClick={(category) => setCustomValue('category', category)}
              selected={category === label}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Modal
      title="Airbnb your home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;