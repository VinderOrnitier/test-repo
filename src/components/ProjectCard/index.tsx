import React from 'react';
import { IProject } from '../../interfaces/IProject';

import VAvatar from '../Avatar';
import classes from './index.module.css';

interface IProps {
  project: IProject,
}

const VProjectCard = ({project}: IProps) => {
  return (
    <div className={`${classes.card} basis-1/3 w-80 border px-4 py-2.5`}>
      <div className="flex justify-between items-center border-b mb-2">
        <div>
          <h4 className="font-bold text-2xl mb-1" >{project.projectName}</h4>
          <p className="text-gray-600 text-sm mb-1" >Due by: {project?.dueDate.toDate().toDateString()}</p>
        </div>
        <div title={`Creator: ${project.createdBy.displayName}`}>
          <VAvatar srcUrl={project.createdBy.photoURL} />
        </div>
      </div>
      <div className="border-b pb-2 mb-2">
        {project.projectDetails}
      </div>
      <div className="flex items-center">
        {project.assignTo.map((item: any) =>
          <VAvatar key={item.id} className="mr-1 small" title={item.displayName} srcUrl={item.photoURL} small />
        )}
      </div>
    </div>
  );
};

export default VProjectCard;
