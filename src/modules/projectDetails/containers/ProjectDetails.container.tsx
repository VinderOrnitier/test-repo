import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { VButton, VComments, VLoader } from '../../../components';
import { COLLECTION } from '../../../constants';
import { goBackRedirect } from '../../../helpers';
import { useAuthContext, useDocument, useFirestore } from '../../../hooks';
import ProjectCommentsForm from '../components/ProjectCommentsForm';
import ProjectSummary from '../components/ProjectSummary';
import { ProjectInitial } from '../projectDetails.constants';


const ProjectDetailsContainer = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { user } = useAuthContext();
  const { document, error } = useDocument({c: COLLECTION.PROJECTS, id});
  const { response, deleteDocument } = useFirestore(COLLECTION.PROJECTS);

  const doc = document || ProjectInitial;
  const author = doc.createdBy.id === user.uid;
  
  const handleDelete = async () => {
    await deleteDocument(id);
    if(!response.onError) {
      history.goBack();
    }
  };

  if (!document) {
    return <VLoader className="h-64" />;
  }

  if (error || response.onError) {
    return <div className="p-4 text-2xl font-bold">{error || response.onError}</div>;
  }
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center border-b mb-2 pb-3">
        <h2 className="text-3xl font-bold my-4">{doc.projectName}</h2>
        <VButton className="ml-auto block" onClick={goBackRedirect}>
          Back
        </VButton>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ProjectSummary project={doc} />
        <div className="col-span-1">
        <p className="text-right text-gray-600 text-sm mb-4">Created by: <span className="font-bold">{doc.createdBy.displayName}</span></p>
          {author && (
            <VButton className="ml-auto mt-4 block" onClick={handleDelete} disabled={response.isLoading}>
              Complete project
            </VButton>
          )}
        </div>
        <div className="col-span-3">
          <VComments isCommentsLoading={!document} comments={doc.comments} />
          <ProjectCommentsForm project={doc} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsContainer;
