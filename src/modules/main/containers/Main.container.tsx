import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { VButton, VLoader } from '../../../components';
import { getFormData, setFormData } from '../../../utils';

import { IStepper } from '../main.types';
import { useAuthContext, useDocument, useFirestore } from '../../../hooks';


const MainContainer = () => {
  const history = useHistory();
  const [initialValues] = useState(getFormData);
  const { user } = useAuthContext();
  const [form, setForm] = useState<IStepper>(initialValues);
  const { response, updateDocument } = useFirestore('forms');
  const { document, error } = useDocument({c:'forms', id:user.uid});
  
  const docRef = document || initialValues
  const isComplete = form?.formComplete || false;

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="text-center px-4 pt-4 pb-3 border-b">
        <h2 className="text-3xl font-bold my-4">Welcome! {'\u{1F44B}'}</h2>
      </div>
      <div className="p-4">
        {isComplete ? (
          <div className="flex items-center border p-4">
            <div>
              <div className="text-white text-3xl font-bold">KYC complete</div>
              {form?.companyName && <div>Your company: <b>{form.companyName}</b></div>}
            </div>
            <VButton onClick={handleEditKYC} className="ml-auto">
              Edit KYC
            </VButton>
          </div>
        ) : (
          <div className="flex items-center border p-4">
            <div>
              <div className="text-white text-3xl font-bold">Please sumbit your KYC</div>
              <div>If you want use platform features</div>
            </div>
            <VButton onClick={redirectToKYC} className="ml-auto">
              Start
            </VButton>
          </div>
        )}
      </div>
    </>
  );
};

export default MainContainer;
