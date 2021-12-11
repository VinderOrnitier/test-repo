import React from 'react';

import { VButton, VSelect } from "../../../../components"
import { FILTER_OPTIONS } from '../../main.constants';

interface IProps {
  toggleModal: boolean,
  filter: string,
  setFilter: (option: string) => void,
}

const ProjectFilter = ({ toggleModal, filter, setFilter }: IProps) => {

  const sortHandler = (selectedSort: string) => {
    setFilter(selectedSort);
  }

  return (
    <div className="flex justify-between items-center mb-8 mt-6">
      <VButton onClick={toggleModal}>
        Create project
      </VButton>
      <VSelect
        options={FILTER_OPTIONS}
        value={filter}
        onChange={sortHandler}
        placeholder="Filter by"
      />
    </div> 
  )
}

export default ProjectFilter;