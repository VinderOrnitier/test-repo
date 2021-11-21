import React from 'react'

import { VInput, VSelect } from '../../../components';

const OPTIONS = [
  {
    value: 'title',
    name: 'By name',
  },
  {
    value: 'body',
    name: 'By description',
  },
];

export interface IFilter {
  sort?: string
  query?: string
}
const PostFilter = ({ filter, setFilter }: any) => {

  const sortHandler = (selectedSort: IFilter) => {
    setFilter({...filter, sort: selectedSort});
  }

  const searcHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({...filter, query: e.target.value});
  }

  return (
    <div className="flex justify-between">
        <VInput type="search" value={filter.query} onChange={searcHandler} placeholder="Search" />
        <VSelect
          options={OPTIONS}
          value={filter.sort}
          onChange={sortHandler}
          placeholder="Filter"
        />
      </div> 
  )
}

export default PostFilter;
