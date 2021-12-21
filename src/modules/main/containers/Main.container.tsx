import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Hello from '../../../assets/Hello.svg'

import { VLoader, VModal } from '../../../components';
import { getFormData, setFormData } from '../../../utils';
import { IStepper } from '../main.types';
import { useAuthContext, useCollection, useDocument, useFirestore, useToggle } from '../../../hooks';
import { COLLECTION } from '../../../constants';
import CreateProjectForm from './components/CreateProjectForm';
import NotificationAlert from './components/NotificationAlert';
import ProjectGrid from './components/ProjectGrid';
import ProjectFilter from './components/ProjectFilter';
import { IUser } from '../../../interfaces/IProject';


const MainContainer = () => {
  const history = useHistory();
  const [toggle, isToggled] = useToggle(false);
  const [initialValues] = useState(getFormData);
  const [filtered, setFiltered] = useState('all');
  const [form, setForm] = useState<IStepper>(initialValues);
  const { user } = useAuthContext();
  const { response, updateDocument } = useFirestore(COLLECTION.FORMS);
  const { document } = useDocument({c:COLLECTION.FORMS, id:user.uid});
  const { documents: usersDocuments, error: usersDocumentsError } = useCollection(COLLECTION.USERS);
  const { documents, error: documentsError } = useCollection(COLLECTION.PROJECTS);
  
  const docRef = document || initialValues;
  const isComplete = form?.formComplete || false;

  
  const projects = documents ? documents.filter((doc: any) => {
    switch (filtered) {
      case 'all':
        return true;
      case 'mine':
        let assignedToMe = false;
        doc.assignTo.forEach((u: IUser) => {
          if(u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe;
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        return doc.projectCategory === filtered;

      default:
        return true;
    }
  }) : null;
  
  useEffect(() => {
    setForm(docRef);
    setFormData(docRef);
  }, [docRef]);
  
  const handleEditKYC = async () => {
    await updateDocument(user.uid, { ...docRef, formComplete: false })
    history.push(`kyc/${user.uid}`);
  };

  const redirectToKYC = () => {
    history.push(`kyc/${user.uid}`);
  };

  if (response.isLoading) {
    return <VLoader className="h-64" />;
  }

  const notificationAlert = isComplete ? (
    <NotificationAlert
      title="KYC complete"
      subTitle={<div>Your company: <b>{form.companyName}</b></div>}
      buttonText="Edit KYC"
      handleButton={handleEditKYC}
    />
  ) : (
    <NotificationAlert
      title="Please sumbit your KYC"
      subTitle={<div>If you want use platform features</div>}
      buttonText="Start"
      handleButton={redirectToKYC}
    />
  )

  return (
    <>
      <div className="flex items-center justify-center text-center px-4 pt-4 pb-3 border-b">
        <h2 className="text-3xl font-bold my-4 mr-2">Welcome!</h2>
        <img className="w-8" src={Hello} alt="\u{1F44B}" />
      </div>
      <div className="p-4">
        {notificationAlert}
        <div className="py-4">
          <ProjectFilter toggleModal={toggle} filter={filtered} setFilter={setFiltered} />
          {documentsError && <p className="mb-4 text-red-500">{documentsError}</p>}
          {projects && <ProjectGrid documents={projects} />}
        </div>
      </div>
      <VModal title="Create project" visible={isToggled} setVisible={toggle}>
        <CreateProjectForm
          toggleModal={toggle}
          usersDocuments={usersDocuments}
          usersDocumentsError={usersDocumentsError}
        /> 
      </VModal>
    </>
  );
};

export default MainContainer;
