import React from 'react';
import { VAvatar } from '../../../components';
// import { IProject } from '../../../interfaces/IProject';

interface IProps {
  project: any,
}

const ProjectSummary = ({project}: IProps) => {
  return (
    <div className="col-span-2">
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600 text-sm mb-1" >Due by: {project.dueDate.toDate().toDateString()}</p>
        <p className="text-gray-600 text-sm mb-1" >Created at: {project.createdAt.toDate().toDateString()}</p>
      </div>
      <div className="pb-4 border-b">
        <p className="text-2xl font-bold text-white mb-4" >Description:</p>
        {project.projectDetails}
        <p className="text-right capitalize text-gray-500 text-sm mt-2" >
          Category:
          <span className="ring italic ring-gray-500 font-bold rounded px-1 ml-2">
            {project.projectCategory}
          </span>
        </p>
      </div>
      <div className="flex items-center border-b py-2">
        <p className="text-gray-600 text-sm mb-1 mr-2" >Assigned to:</p>
        {project.assignTo.map((item: any) =>
          <VAvatar key={item.id} className="mr-1 small" srcUrl={item.photoURL} small />
        )}
      </div>
    </div>
  )
}

export default ProjectSummary;