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
        <p className="text-right text-gray-600 capitalize text-sm mt-2" >
          Category:
          <span className="border-2 font-bold italic ml-2 pb-0.5 px-1 text-white">
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