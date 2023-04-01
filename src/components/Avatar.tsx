'use client';

import Image from 'next/image';

const Avatar = ({ src }: { src: string }) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src}
    />
  );
};

export default Avatar;
