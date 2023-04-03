import Container from '@/components/Container';
import Loader from '@/components/Loader';

export default function Loading() {
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {[1, 2, 3, 4, 5].map((item) => (
          <Loader key={item} />
        ))}
      </div>
    </Container>
  );
}
