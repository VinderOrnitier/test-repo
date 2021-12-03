import React, { useCallback, useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';

import { ImageUpload, VButton, VLoader } from '../../../components';
import { fromCamelCase, goBackRedirect } from '../../../helpers';
import { getFormData, setFormData } from '../../../utils';
import { IStepper } from '../main.types';
import { useAuthContext, useDocument, useFirestore } from '../../../hooks';

const FinalStep = () => {
  const [initialValues] = useState(getFormData);
  const { user } = useAuthContext();
  const [form, setForm] = useState(initialValues);
  const [userImage, setUserImage] = useState(null);
  const { response, updateDocument } = useFirestore('forms');
  const { document, error } = useDocument({ c: 'forms', id: user.uid });

  const docRef = initialValues || document;

  useEffect(() => {
    setForm(docRef);
    setFormData(docRef);
  }, [docRef]);

  const handleSetForm = async (data: IStepper) => {
    await updateDocument(user.uid, data);
  };

  const handleSubmit = useCallback(async () => {
    let initialImage = userImage || form?.userImage;
    let data = {
      ...initialValues,
      userImage: initialImage,
      uid: user.uid,
      displayName: user.displayName || user.email,
      formComplete: true,
    };
    setFormData(data);
    await handleSetForm(data);
  // eslint-disable-next-line
  }, [initialValues, userImage, form]);

  if (response.isLoading) {
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
