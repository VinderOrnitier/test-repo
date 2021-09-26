import { useEffect, useRef, useState } from 'react';
import { urls } from '../../../api';
import { VLoader } from '../../../components';
import { useFetching, useObserver } from '../../../hooks';
import { getPageCount } from '../../../utils';

const GalleryContainer = () => {
  const [gallery, setGallery] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10); // eslint-disable-line
  const [page, setPage] = useState(1);

  const lastElement = useRef(null)
  
  const [fetchGallery, isGalleryLoading, galleryError] = useFetching(async (limit: any, page: any) => {
    const response = await urls.GalleryService.getAll();
    setGallery([...gallery, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isGalleryLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    // @ts-ignore
    fetchGallery(limit, page);
  }, [page]); // eslint-disable-line

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold my-4">Gallery</h2>
      </div>
      <ul className="h-screen grid grid-cols-3 gap-4 mb-4">
        {galleryError && <h2 className="text-3xl text-center font-bold my-4">{galleryError}</h2>}
        {gallery.map((item: any, index: number) => (
          <li key={index + 1} className="mx-6">
            <h5 className="h-12 font-bold my-2">{index + 1}. {item.title}</h5>
            <img className="h-96" src={item.url} alt={item.title} />
          </li>
        ))}
        <li className="h-px" ref={lastElement} />
        {isGalleryLoading && <VLoader className="h-64" />}
      </ul>
    </>
  );
};

export default GalleryContainer;
