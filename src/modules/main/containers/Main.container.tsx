import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { VStepper, VStep, VButton, VLoader } from '../../../components';
import { getFormData, setFormData } from '../../../utils';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

import CompanyStep from '../components/CompanyStep';
import FinalStep from '../components/FinalStep';
import PersonalStep from '../components/PersonalStep';
import { AppContext } from '../../core/AppContextProvider';
import { IStepper } from '../main.types';

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
  const { firestore } = useContext(AppContext);
  const history = useHistory();
  const [form, setForm] = useState<IStepper>();
  const { state = { activeStep: 0 } } = useLocation<LocationState>();
  const [initialValues] = useState(getFormData);

  const stepper = firestore.collection('forms').doc('stepper');
  const [snapshot, loading, error] = useDocumentOnce(stepper);

  const tab = TABS[state?.activeStep] || TABS[0];
  const activeTab = state?.activeStep || 0;
  const isComplete = snapshot?.data().formComplete;

  useEffect(() => {
    let data = snapshot?.data() || initialValues;
    setForm(data);
    setFormData(data);
    // eslint-disable-next-line
  }, [snapshot]);
  
  const handleEditForm = async () => {
    await stepper.update(
      {
        formComplete: false,
      },
      { merge: true }
    );
    history.go(0);
  };

  if (loading) {
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
