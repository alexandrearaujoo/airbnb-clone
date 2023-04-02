'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitile: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ onChange, subtitile, title, value }: CounterProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="font-medium">{title}</h1>
        <h2 className="font-light text-gray-600">{subtitile}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onReduce}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </button>
        <span className="font-light text-xl text-neutral-600">{value}</span>
        <button
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
