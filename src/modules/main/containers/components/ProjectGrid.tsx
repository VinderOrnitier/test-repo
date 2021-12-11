import React from 'react';
import { Link } from 'react-router-dom';

import { VProjectCard } from "../../../../components"
import { IProject } from '../../../../interfaces/IProject';

interface IProps {
  documents: any,
}

const ProjectGrid = ({documents = ''}: IProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {!documents.length && <p className="mb-4 font-bold">No projects</p>}
      {documents.map((item: IProject) => 
        <Link to={`project/${item.id}`} key={item.createdAt}>
          <VProjectCard project={item} />
        </Link>
      )}
    </div>
  )
}

export default ProjectGrid;