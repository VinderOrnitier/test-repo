import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuthContext, useFirestore } from '../../../hooks';
import { COLLECTION } from '../../../constants';
import { VButton } from '../../../components';
import { CommentsSchema } from '../../../yup';

const ProjectCommentsForm = ({ project }: any) => {
  const { user } = useAuthContext();
  const { response, updateDocument } = useFirestore(COLLECTION.PROJECTS);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver<yup.AnyObjectSchema>(CommentsSchema),
    mode: 'onSubmit',
    defaultValues: { content: '' },
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const submitForm = async (data: any) => {
    const commentToAdd = {
      projectName: user.displayName || user.email,
      photoURL: user.photoURL,
      content: data.content,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    reset();
  };

  return (
    <form className="pt-8" onSubmit={handleSubmit(submitForm)}>
      <h4 className="text-2xl font-bold mb-4">Add comment:</h4>
      <div>
        <Controller
          name="content"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <div className="mb-4">
              <textarea {...rest} className="w-full p-2" placeholder="Add new comment" rows={5} />
              {errors.content && <span className="text-red-900 mb-4">{errors.content?.message}</span>}
            </div>
          )}
        />
      </div>
      <VButton disabled={response.isLoading}>Post</VButton>
      {response.onError && <p className="text-red-900 mb-4">{response.onError}</p>}
    </form>
  );
};

export default ProjectCommentsForm;
