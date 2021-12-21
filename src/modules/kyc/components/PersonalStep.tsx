import React, { useState, useCallback } from 'react';
import { Prompt, useHistory, useLocation, useParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { VButton, VInput } from '../../../components';
import { getFormData, setFormData } from '../../../utils';
import { StepperPersonalSchema } from '../../../yup';
import { IPersonalStep } from '../kyc.types';

const PersonalStep = () => {
  const { id } = useParams<{id: string}>();
  const history = useHistory();
  const location = useLocation();
  const [initialValues] = useState(getFormData);

  const { control, handleSubmit, formState: { errors } } = useForm<IPersonalStep>({
    resolver: yupResolver<yup.AnyObjectSchema>(StepperPersonalSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });
  
  const handleChangeStep = useCallback((data: any) => {
    setFormData(data);
    history.push({
      ...location,
      state: {
        activeStep: 1,
      }
    })
  }, [history, location]);
  
  return (
    <>
      <Prompt
        message={(location) =>
          location.pathname.endsWith(`/kyc/${id}`) ? true : `You have unsaved changes. Are you sure you want to leave this page?`
        }
      />
      <div className="text-white text-center text-3xl font-bold mb-8 mt-8">Personal information</div>
      <form className="flex flex-col items-baseline" onSubmit={handleSubmit(data => handleChangeStep(data))}>
        <Controller
          name="personalAddress"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <VInput {...rest} placeholder="Personal address" />
              { errors.personalAddress && <div className="text-red-900">{errors.personalAddress?.message}</div> }
            </div>
          )}
        />
        <Controller
          name="personaPhone"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <VInput {...rest} placeholder="Personal phone"/>
              { errors.personaPhone && <div className="text-red-900">{errors.personaPhone?.message}</div> }
            </div>
          )}
        />
        <VButton className="ml-auto mt-8">Next step</VButton>
      </form>
    </>
  );
};

export default PersonalStep;
