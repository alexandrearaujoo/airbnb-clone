'use client';

import { IconType } from 'react-icons';

interface CategoryInputProps {
  label: string;
  onClick: (value: string) => void;
  selected?: boolean;
  icon: IconType;
}

const CategoryInput = ({
  label,
  onClick,
  icon: Icon,
  selected
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <p className="font-semibold">{label}</p>
    </div>
  );
};

export default CategoryInput;
