import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { ImageUpload, VButton, VLoader } from '../../../components';
import { fromCamelCase, goBackRedirect } from '../../../helpers';
import { getFormData, setFormData } from '../../../utils';
import { IStepper } from '../main.types';
import { useAuthContext, useDocument, useFirestore } from '../../../hooks';
import { AppContext } from '../../core/AppContextProvider';

const FinalStep = () => {
  const { storage } = useContext(AppContext);
  const [initialValues] = useState(getFormData);
  const { user } = useAuthContext();
  const [form, setForm] = useState(initialValues);
  const [userImage, setUserImage] = useState(null);
  const [userFile, setUserFile] = useState<any>({});
  const { response, updateDocument } = useFirestore('forms');
  const { document, error } = useDocument({ c: 'forms', id: user.uid });

  const docRef = initialValues || document;
  
  const uploadPath = `companyThumbnails/${user.uid}/${userFile?.name}`;
  const storageRef = ref(storage, uploadPath);
  

  useEffect(() => {
    setForm(docRef);
    setFormData(docRef);
  }, [docRef]);

  const handleSetForm = async (data: IStepper) => {
    try {
      const uploadTask = uploadBytesResumable(storageRef, userFile);
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      updateDocument(user.uid, {...data, downloadURL});
    } catch (error) {
      console.log('Upload image error', error);
    }
  };

  const handleSubmit = useCallback(() => {
    let initialImage = userImage || form?.userImage;
    let data = {
      ...initialValues,
      userImage: initialImage,
      uid: user.uid,
      displayName: user.displayName || user.email,
      formComplete: true,
    };
    setFormData(data);
    handleSetForm(data);
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
            if(label === 'createdAt') {
              return (
                <div className="flex mb-2" key={label}>
                  {value && <b className="mr-4">{fromCamelCase(label)}:</b>}
                  <span className="text-white truncate max-w-sm">{JSON.stringify(value)}</span>
                  {/* <span className="text-white truncate max-w-sm">{value}</span> */}
              </div>
              )
            }
            return (
              <div className="flex mb-2" key={label}>
                {value && <b className="mr-4">{fromCamelCase(label)}:</b>}
                <span className="text-white truncate max-w-sm">{value}</span>
              </div>
            );
          })}
        </div>
        <ImageUpload initialImage={docRef.userImage} setFile={setUserImage} file={setUserFile} />
      </div>
      <div className="flex w-full justify-between mt-8">
        <VButton onClick={goBackRedirect}>Back</VButton>
        <VButton onClick={handleSubmit}>Submit</VButton>
      </div>
    </>
  );
};

export default FinalStep;
