'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import CategoryBox from '../CategoryBox';
import Container from '../Container';

import { categories } from '@/data/categories';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <ul className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map(({ label, icon }) => (
          <CategoryBox
            key={label}
            label={label}
            selected={category === label}
            icon={icon}
          />
        ))}
      </ul>
    </Container>
  );
};

export default Categories;
