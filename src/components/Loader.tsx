'use client';

import { usePathname } from 'next/navigation';

const Loader = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname && pathname.includes('listing') ? (
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="w-60 h-8 bg-black/60 opacity-10 ml-4 rounded-xl animate-skeleton-body lg:ml-0" />
              <h2 className="h-5 w-52 bg-black/60 opacity-10 ml-4 rounded-xl mt-2 animate-skeleton-body lg:ml-0" />
              <div className="w-[95%] h-[60vh] mt-5 overflow-hidden rounded-xl relative mx-auto bg-black/60 opacity-10 lg:w-full animate-skeleton-body">
                <img src="" alt="" className="object-cover w-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
              <div className="col-span-4 flex flex-col gap-8">
                <div className="flex flex-col gap-2 ml-4 lg:ml-0">
                  <div className="flex items-center gap-2">
                    <h1 className="h-5 w-52 bg-black/60 opacity-10 rounded-xl mt-2 animate-skeleton-body" />
                    <div className="h-8 w-8 rounded-full bg-black/60 opacity-10 animate-skeleton-body"></div>
                  </div>
                  <div className="flex items-center gap-4 font-light text-neutral-500">
                    <p className="w-20 h-5 bg-black/60 opacity-10 rounded-md animate-skeleton-body" />
                    <p className="w-20 h-5 bg-black/60 opacity-10 rounded-md animate-skeleton-body" />
                    <p className="w-20 h-5 bg-black/60 opacity-10 rounded-md animate-skeleton-body" />
                  </div>
                </div>
                <hr />
                <div className="flex flex-col gap-6 ml-4 lg:ml-0">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-black/60 opacity-10 animate-skeleton-body" />
                    <div className="flex flex-col">
                      <p className="w-28 h-6 bg-black/60 opacity-10 rounded-md animate-skeleton-body" />
                      <p className="w-36 h-6 bg-black/60 opacity-10 rounded-md animate-skeleton-body mt-3" />
                    </div>
                  </div>
                </div>
                <hr />
                <p className="w-60 h-6 bg-black/60 ml-4 lg:ml-0 opacity-10 rounded-md animate-skeleton-body" />
                <hr />
                <div className="w-[95%] h-64 mx-auto bg-black/60 lg:mx-0 opacity-10 rounded-md" />
              </div>
              <div className="order-first mb-10 md:order-last md:col-span-3">
                <div className="w-[95%] mx-auto bg-black/60 opacity-10 animate-skeleton-body rounded-xl h-[628px]" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-1 group">
          <div className="flex flex-col w-full gap-2">
            <div className="aspect-square bg-black/60 opacity-10 relative overflow-hidden rounded-xl animate-skeleton-body">
              <img className="object-cover w-full h-full" />
            </div>
            <h1 className="h-5 w-56 bg-black/60 opacity-10 rounded-xl" />
            <h2 className="h-5 w-28 bg-black/60 opacity-10 rounded-xl" />
            <div className="flex items-center gap-1">
              <p className="h-5 w-28 bg-black/60 opacity-10 rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
