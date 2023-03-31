'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem = ({ label, onClick }: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className="text-start px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </button>
  );
};

export default MenuItem;
