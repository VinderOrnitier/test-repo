import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { VStepper, VStep, VButton } from '../../../components';
// import { PATH } from '../../../constants';
import { clearFormData, getFormData, setFormData } from '../../../utils';

import CompanyStep from '../components/CompanyStep';
import FinalStep from '../components/FinalStep';
import PersonalStep from '../components/PersonalStep';

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
  const history = useHistory();
  const { state = { activeStep: 0 } } = useLocation<LocationState>();
  const [formData] = useState(getFormData);

  const tab = TABS[state?.activeStep] || TABS[0];
  const activeTab = state?.activeStep || 0;

  useEffect(() => {
    return () => clearFormData();
  }, []);

  const handleEditForm = () => {
    let data = {...formData, formComplete: false}
    setFormData(data);
    history.go(0)
  };

  return (
    <>
      <div className="text-center text-3xl font-bold mb-8"> Welcome to Main App!</div>
      {formData?.formComplete ?
        (
          <div className="text-center p-24">
            <div className="text-white text-3xl font-bold mb-8 mt-8">Form submit complete</div>
            <VButton onClick={handleEditForm} className="ml-auto mt-8">Edit form</VButton>
          </div>
        ) : (
          <>
            <VStepper>
              {TABS.map(({ title }, i) => (
                <VStep
                  key={title}
                  title={title}
                  tabIndex={i}
                  completed={i < activeTab}
                  activeStep={activeTab === i}
                />
              ))}
            </VStepper>
            <tab.component/>
          </>
        )
      }
    </>
  );
};

export default MainContainer;
