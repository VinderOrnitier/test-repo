import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { VStepper, VStep, VButton, VLoader } from '../../../components';
import { getFormData, setFormData } from '../../../utils';

import CompanyStep from '../components/CompanyStep';
import FinalStep from '../components/FinalStep';
import PersonalStep from '../components/PersonalStep';
import { IStepper } from '../main.types';
import { useAuthContext, useDocument, useFirestore } from '../../../hooks';

const TABS = [
  {
    component: PersonalStep,
    title: 'Personal information',
  },
  {
    component: CompanyStep,
    title: 'Company information',
  },
  {
    component: FinalStep,
    title: 'Summary report',
  },
];

interface LocationState {
  activeStep: number;
}

const MainContainer = () => {
  const [initialValues] = useState(getFormData);
  const { user } = useAuthContext();
  const [form, setForm] = useState<IStepper>(initialValues);
  const { state = { activeStep: 0 } } = useLocation<LocationState>();
  const { response, updateDocument } = useFirestore('forms');
  const { document, error } = useDocument({c:'forms', id:user.uid});
  
  const docRef = document || initialValues

  const tab = TABS[state?.activeStep] || TABS[0];
  const activeTab = state?.activeStep || 0;
  const isComplete = form?.formComplete || false;

  useEffect(() => {
    setForm(docRef);
    setFormData(docRef);
  }, [docRef]);

  
  const handleEditForm = async () => {
    await updateDocument(user.uid, { ...docRef, formComplete: false })
  };

  if (response.isLoading) {
    return <VLoader className="h-64" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="text-center text-3xl font-bold mb-8"> Welcome to Main App!</div>
      {isComplete ? (
        <div className="text-center p-24">
          <div className="text-white text-3xl font-bold mb-8 mt-8">Form submit complete</div>
          {form?.companyName && <div>Your company: <b>{form?.companyName}</b></div>}
          <VButton onClick={handleEditForm} className="ml-auto mt-8">
            Edit form
          </VButton>
        </div>
      ) : (
        <>
          <VStepper>
            {TABS.map(({ title }, i) => (
              <VStep key={title} title={title} tabIndex={i} completed={i < activeTab} activeStep={activeTab === i} />
            ))}
          </VStepper>
          <tab.component />
        </>
      )}
    </>
  );
};

export default MainContainer;
