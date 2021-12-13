import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Prompt, useParams } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { ImageUpload, VButton, VLoader } from '../../../components';
import { goBackRedirect } from '../../../helpers';
import { getFormData, setFormData } from '../../../utils';
import { IStepper } from '../kyc.types';
import { useAuthContext, useDocument, useFirestore } from '../../../hooks';
import { AppContext } from '../../core/AppContextProvider';
import SummaryResultList from './SummaryResultList';
import { COLLECTION } from '../../../constants';

const FinalStep = () => {
  const { id } = useParams<{id: string}>();
  const { storage } = useContext(AppContext);
  const [initialValues] = useState(getFormData);
  const { user } = useAuthContext();
  const [form, setForm] = useState(initialValues);
  const [userImage, setUserImage] = useState(null);
  const [userFile, setUserFile] = useState<any>(null);
  const { response, updateDocument } = useFirestore(COLLECTION.FORMS);
  const { document } = useDocument({ c: COLLECTION.FORMS, id: user.uid });

  const docRef = initialValues || document;

  useEffect(() => {
    setForm(docRef);
    setFormData(docRef);
  }, [docRef]);

  const handleUpload = (data: IStepper) => {
    const uploadPath = `companyThumbnails/${user.uid}/${userFile?.name}`;
    const storageRef = ref(storage, uploadPath);
    const uploadTask = uploadBytesResumable(storageRef, userFile);
  
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.log('Upload image error', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateDocument(user.uid, { ...data, downloadURL });
        });
      }
    );
  };

  const handleSubmit = useCallback(() => {
    let data = {
      ...initialValues,
      downloadURL: docRef.downloadURL,
      displayName: user.displayName || user.email,
      formComplete: true,
    };
    setFormData(data);
    if(userImage) {
      handleUpload(data);
    } else {
      updateDocument(user.uid, { ...data });
    }
  // eslint-disable-next-line
  }, [initialValues, userImage, form]);

  if (response.isLoading) {
    return <VLoader className="h-64" />;
  }

  return (
    <>
      <Prompt
        message={(location) =>
          location.pathname.endsWith(`/kyc/${id}`) ? true : `You have unsaved changes. Are you sure you want to leave this page?`
        }
      />
      <div className="text-white text-center text-3xl font-bold mb-8 mt-8">Summary report</div>
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <div className="basis-3/4">
          <SummaryResultList form={form} />
        </div>
        <div className="basis-1/4">
          <ImageUpload initialImage={docRef?.downloadURL} setFile={setUserImage} file={setUserFile} />
        </div>
      </div>
      <div className="flex w-full justify-between mt-8">
        <VButton onClick={goBackRedirect}>Back</VButton>
        <VButton onClick={handleSubmit} disabled={response.isLoading}>Submit</VButton>
      </div>
    </>
  );
};

export default FinalStep;
