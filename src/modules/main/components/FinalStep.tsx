import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, Prompt } from 'react-router-dom';

// import firebase from 'firebase/compat/app';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

import { ImageUpload, VButton, VLoader } from '../../../components';
import { fromCamelCase, goBackRedirect } from '../../../helpers';
import { getFormData, setFormData } from '../../../utils';
import { AppContext } from '../../core/AppContextProvider';
import { IStepper } from '../main.types';
import { LoginContext } from '../../login';

const FinalStep = () => {
  const history = useHistory();
  const { user } = useContext(LoginContext);
  const { firestore } = useContext(AppContext);
  const [form, setForm] = useState<any>();
  const [userImage, setUserImage] = useState(null);
  const [initialValues] = useState(getFormData);

  const stepper = firestore.collection('forms').doc(user.uid);
  const [snapshot, loading, error] = useDocumentOnce(stepper);

  useEffect(() => {
    let data = initialValues || snapshot?.data();
    setForm(data);
    setFormData(data);
  }, [initialValues, snapshot]);

  const handleSetForm = async (data: IStepper) => {
    await stepper.set(
      {
        ...data,
        uid: user.uid,
        displayName: user.displayName,
        // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  };

  const handleSubmit = useCallback(async () => {
    let initialImage = userImage || form?.userImage;
    let data = {
      ...initialValues,
      userImage: initialImage,
      formComplete: true,
    };
    setFormData(data);
    await handleSetForm(data);
    history.go(0);
    // eslint-disable-next-line
  }, [initialValues, userImage, form]);

  if (loading) {
    return <VLoader className="h-64" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Prompt
        message={(location) =>
          location.pathname.endsWith('/') ? true : `You have unsaved changes. Are you sure you want to leave this page?`
        }
      />
      <div className="text-white text-center text-3xl font-bold mb-8 mt-8">Summary report</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {Object.entries(form).map(([label, value]: [string, any]) => {
            return (
              <div className="flex mb-2" key={label}>
                {value && <b className="mr-4">{fromCamelCase(label)}:</b>}
                <span className="text-white truncate max-w-sm">{value}</span>
              </div>
            );
          })}
        </div>
        <ImageUpload initialImage={initialValues?.userImage} setFile={setUserImage} />
      </div>
      <div className="flex w-full justify-between mt-8">
        <VButton onClick={goBackRedirect}>Back</VButton>
        <VButton onClick={handleSubmit}>Submit</VButton>
      </div>
    </>
  );
};

export default FinalStep;
