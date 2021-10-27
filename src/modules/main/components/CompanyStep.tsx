import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { VButton, VInput } from '../../../components';
import { goBackRedirect } from '../../../helpers';
import { getFormData, setFormData } from '../../../utils';
import { StepperCompanySchema } from '../../../yup';
import { ICompanyStep } from '../main.types';

const CompanyStep = () => {
  const history = useHistory();
  const location = useLocation();
  const [initialValues] = useState(getFormData);
  
  const { control, handleSubmit, formState: { errors } } = useForm<ICompanyStep>({
    resolver: yupResolver<yup.AnyObjectSchema>(StepperCompanySchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const onSubmit = (data: any) => {
    handleChangeStep(data);
  };

  const handleChangeStep = useCallback((data: any) => {
    setFormData(data);
    history.push({
      ...location,
      state: {
        activeStep: 2,
      }
    })
  }, [history, location]);
  
  return (
    <>
      <div className="text-white text-center text-3xl font-bold mb-8 mt-8">Company information</div>
      <form className="flex flex-col items-baseline" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="companyName"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <VInput {...rest} placeholder="Company name" />
              { errors.companyName && <div className="text-red-900">{errors.companyName?.message}</div> }
            </div>
          )}
        />
        <Controller
          name="companyAddress"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <VInput {...rest} placeholder="Company address" />
              { errors.companyAddress && <div className="text-red-900">{errors.companyAddress?.message}</div> }
            </div>
          )}
        />
        <Controller
          name="companyPhone"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <VInput {...rest} placeholder="Company phone number" />
              { errors.companyPhone && <div className="text-red-900">{errors.companyPhone?.message}</div> }
            </div>
          )}
        />
      </form>
      <div className="flex w-full justify-between mt-8">
        <VButton onClick={goBackRedirect} >Back</VButton>
        <VButton onClick={() => handleSubmit(onSubmit)()}>Next step</VButton>
      </div>
    </>
  );
};

export default CompanyStep;
