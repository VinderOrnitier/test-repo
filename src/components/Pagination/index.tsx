import React from 'react';
import { VButton, VSelect } from '..';
import { getPagesArray } from '../../utils';
import classes from './index.module.css';

const OPTIONS = [
  {value: 5, name: '5'},
  {value: 10, name: '10'},
  {value: 25, name: '25'},
  {value: -1, name: 'All'}
];

const VPagination = ({ totalPages, currentPage, changePage, limit, setLimit, ...props }: any) => {

  let pagesArray = getPagesArray(totalPages);
  
  const limitHandler = (value: number) => {
    setLimit(value);
  }

  return (
    <div className={`${classes.paginationWrapper} ${props?.className}`} {...props}>
      {pagesArray.map((page: number) => (
        <VButton
          key={page}
          className={`${classes.paginationButton} ${currentPage === page ? classes.paginationButtonActive : ''}`}
          onClick={() => changePage(page)}
        >
          {page}
        </VButton>
      ))}
      <VSelect
        className="ml-auto"
        options={OPTIONS}
        value={limit}
        onChange={limitHandler}
        placeholder="Items limit"
      />
    </div>
  );
};

export default VPagination;
