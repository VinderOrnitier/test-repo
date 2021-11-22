import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { VLoader } from '../../../components';
import { PATH } from '../../../constants';
import { useObserver } from '../../../hooks';
import { getPageCount } from '../../../utils';
import { MODULE_URL } from '../gallery.constants';
import { service } from '../gallery.module';
import { IPhoto } from '../gallery.types';

const GalleryContainer = () => {
  const [gallery, setGallery] = useState<IPhoto[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10); // eslint-disable-line
  const [page, setPage] = useState(1);

  const lastElement = useRef(null);

  const { data, isLoading, error } = service.useFetchAllPhotosQuery({limit, page});

  useObserver(lastElement, page < totalPages, isLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    const url = `${PATH.SERVER}${MODULE_URL}`
    axios.head(url, { params: {_limit: -1}}).then((resp) => {
      const total = resp.headers['x-total-count'];
      setTotalPages(getPageCount(total, limit));
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    if(data) {
      setGallery([...gallery, ...data]);
    }
  }, [data]); // eslint-disable-line

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold my-4">Gallery</h2>
      </div>
      <ul className="h-screen grid grid-cols-3 gap-4 mb-4">
        {error && <h2 className="text-3xl text-center font-bold my-4">{error}</h2>}
        {gallery?.map((item: IPhoto) => (
          <li key={item.id} className="mx-6">
            <h5 className="h-12 font-bold my-2">{item.id}. {item.title}</h5>
            <img className="h-96" src={item.url} alt={item.title} />
          </li>
        ))}
        <div className="h-px" ref={lastElement} />
        {isLoading && <VLoader className="h-64" />}
      </ul>
    </>
  );
};

export default GalleryContainer;
