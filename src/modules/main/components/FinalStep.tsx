import React, { useCallback, useState } from 'react';
import { useHistory } from "react-router-dom";

import { ImageUpload, VButton } from '../../../components';
import { fromCamelCase, goBackRedirect } from '../../../helpers';
import { getFormData, setFormData } from '../../../utils';

const FinalStep = () => {
  const [initialValues] = useState(getFormData);
  const [userImage, setUserImage] = useState(null);
  const history = useHistory();

  const handleSubmit = useCallback(() => {
    let data = {
      ...initialValues,
      userImage: userImage || initialValues?.userImage,
      formComplete: true
    }
    setFormData(data);
    history.go(0)
  }, [history, initialValues, userImage]);

  return (
    <>
      <div className="text-white text-center text-3xl font-bold mb-8 mt-8">Summary report</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {Object.entries(initialValues).map(([label, value]: [string, any]) => {
          return (
            <div className="flex mb-2" key={label}>
              {value && <b className="mr-4">{fromCamelCase(label)}:</b>}
              <span className="text-white truncate max-w-sm">{value}</span>
            </div>
          )
        })}
        </div>
        <ImageUpload initialImage={initialValues?.userImage} setFile={setUserImage} />
      </div>
      <div className="flex w-full justify-between mt-8">
        <VButton onClick={goBackRedirect} >Back</VButton>
        <VButton onClick={handleSubmit}>Submit</VButton>
      </div>
    </>
  );
};

export default FinalStep;
