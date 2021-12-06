import { useState } from 'react';

const useFetching = (callback: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const fetching = async (...args: any) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};

export default useFetching;
