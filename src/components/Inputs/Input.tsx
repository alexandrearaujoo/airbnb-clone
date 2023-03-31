'use client';

import {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef
} from 'react';
import { BiDollar } from 'react-icons/bi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  formatPrice?: boolean;
  errors?: string;
}

const InputDefault: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { errors, id, label, formatPrice, ...rest },
  ref
) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-9 left-2"
        />
      )}
      <input
        {...rest}
        ref={ref}
        id={id}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${
          errors
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-neutral-300 focus:border-black'
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
        ${
          formatPrice ? 'left-9' : 'left-4'
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
        ${errors ? 'text-rose-500' : 'text-zinc-400'} 
        `}
      >
        {label}
      </label>
    </div>
  );
};

export const Input = forwardRef(InputDefault);
