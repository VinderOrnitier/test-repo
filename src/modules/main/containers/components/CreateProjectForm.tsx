import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { VButton, VInput, VSelect } from '../../../../components';
import IUserCollection from '../../../../interfaces/IUserCollection';
import { ProjectCreateSchema } from '../../../../yup';
import { INITIAL_CREATE_PROJECT_VALUES, PROJECT_CATEGORYS } from '../../main.constants';
import { IProjectCreate } from '../../main.types';
import { useAuthContext, useFirestore } from '../../../../hooks';
import { COLLECTION, IMAGE_PLACEHOLDERS } from '../../../../constants';

const CreateProjectForm = ({ usersDocuments, usersDocumentsError, toggleModal }: any) => {
  const { user: userAuth } = useAuthContext();
  const [users, setUsers] = useState([]);
  const { response, addDocument } = useFirestore(COLLECTION.PROJECTS);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProjectCreate>({
    resolver: yupResolver<yup.AnyObjectSchema>(ProjectCreateSchema),
    mode: 'onBlur',
    defaultValues: INITIAL_CREATE_PROJECT_VALUES,
  });

  useEffect(() => {
    const usersOptions = usersDocuments?.map((user: IUserCollection) => {
      return { value: user, name: user.displayName };
    });
    setUsers(usersOptions);
    
    return () => {
      reset();
    };
  }, [reset, usersDocuments]);
  
  const submitForm = async (data: any) => {
    const filtered = users.filter((user: any) => data.assignTo.includes( user.value.id ));
    const assignedUsersList = filtered.map((user: any) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      };
    });
    
    const createdBy = {
      displayName: userAuth.displayName || userAuth.email,
      photoURL: userAuth.photoURL || IMAGE_PLACEHOLDERS.AVATAR,
      id: userAuth.uid,
    }

    const project = {
      projectName: data.projectName,
      projectCategory: data.projectCategory,
      projectDetails: data.projectDetails,
      dueDate: Timestamp.fromDate(new Date(data.dueDate)),
      comments: [],
      createdBy: createdBy,
      assignTo: assignedUsersList,
    }
    await addDocument(project);
    if(!response.error) {
      reset();
      toggleModal(false);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(submitForm)}>
      <div>
        <Controller
          name="projectName"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4 w-full">
              <VInput {...rest} className="w-full" placeholder="Project name" />
              {errors.projectName && <span className="text-red-900 mb-4">{errors.projectName?.message}</span>}
            </div>
          )}
        />
        <Controller
          name="dueDate"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <VInput
                {...rest}
                className="w-full"
                placeholder="Set due date"
                type="date"
                id="dueDate"
                min="2020-01-01"
                max="2030-12-31"
              />
              {errors.dueDate && <span className="text-red-900 mb-4">{errors.dueDate?.message}</span>}
            </div>
          )}
        />
        <Controller
          name="projectCategory"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <VSelect {...rest} className="w-full" options={PROJECT_CATEGORYS} placeholder="Project category" />
              {errors.projectCategory && <span className="text-red-900 mb-4">{errors.projectCategory?.message}</span>}
            </div>
          )}
        />
        <Controller
          name="assignTo"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <VSelect {...rest} className="w-full" options={users} placeholder="Assign to" multiple size={4} />
              {errors.assignTo && <span className="text-red-900 mb-4">{errors.assignTo?.message}</span>}
            </div>
          )}
        />
        <VButton disabled={response.isLoading}>Add project</VButton>
      </div>
      <div>
        {usersDocumentsError && <p className="text-red-500 mb-2">{usersDocumentsError}</p>}
        <Controller
          name="projectDetails"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <textarea {...rest} className="w-full p-2" placeholder="Project details" rows={5} />
              {errors.projectDetails && <span className="text-red-900 mb-4">{errors.projectDetails?.message}</span>}
            </div>
          )}
        />
      </div>
    </form>
  );
};

export default CreateProjectForm;
