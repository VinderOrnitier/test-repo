import React, { ReactElement, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { VButton, VInput, VModal } from '../../../components';
import { ITransactions } from '../transactions.types';
import { INITIAL_VALUES } from '../transactions.constants';
import { useAuthContext, useCollection, useFirestore } from '../../../hooks';

export default function TransactionsContainer(): ReactElement {
  const [limit, setLimit] = useState(10);
  const [modal, setModal] = useState(false);
  const [itemData, setItemData] = useState<ITransactions>(INITIAL_VALUES);
  const [updated, setUpdated] = useState(false);
  const { user } = useAuthContext();

  const { response, addDocument, updateDocument, deleteDocument } = useFirestore('transactions');
  const { documents, error: documentsError } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );
  
  const {
    control,
    handleSubmit,
    setValue,
    reset,
  } = useForm<ITransactions>({
    mode: 'onChange',
    defaultValues: INITIAL_VALUES || {},
  });

  const handleToggle = () => {
    setModal(true);
  };

  const handleCreate = async (data: ITransactions) => {
    await addDocument({
      ...data,
      id: data.id,
      uid: user.uid,
      name: data.name,
      amount: data.amount,
      completed: false
    });
  };

  const handleUpdate = async (data: ITransactions) => {
    await updateDocument(data.id, { ...data });
  };

  const handleChanged = async (data: ITransactions) => {
    await updateDocument(data.id, { ...data, completed: !data.completed });
  };

  const handleUpdateModal = (data: ITransactions) => {
    setModal(prev => prev = true);
    setUpdated(prev => prev = true);
    setItemData(prev => ({...prev, ...data}));
    setValue('name', data.name);
    setValue('amount', data.amount);
  };

  const onSubmit = (data: ITransactions) => {
    if(updated) {
      handleUpdate({
        ...itemData,
        name: data.name,
        amount: data.amount
      });
    } else {
      handleCreate({
        ...data,
        id: data.id,
        uid: user.uid,
        name: data.name,
        amount: data.amount,
        completed: false
      });
    }
    reset();
    setModal(false);
  };

  const handleDelete = (id: string | undefined) => {
    deleteDocument(id);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]); // eslint-disable-line

  if (response.isLoading) {
    return <h3>Loading...</h3>;
  }

  if (documentsError) {
    return <h3>Cant load todos</h3>;
  }

  return (
    <div>
      <VButton className="mb-4" onClick={handleToggle}>
        Create task
      </VButton>
      <hr />
      <ul>
        {!documents && <p>No transactions</p>}
        {documents?.map((document: ITransactions) => (
          <li className="border flex items-center" key={document.id}>
            <input
              className="ml-2 mr-2"
              type="checkbox"
              onChange={() => handleChanged(document)}
              checked={document.completed}
            />
            <div className="flex w-full items-center justify-between">
              <div className="mr-4">
                {document.id} - {document.name}
                {document?.amount && (<b className="ml-4">amount: {document.amount}</b>)}
              </div>
              <div className="ml-4">
                <button className="text-red-400" onClick={() => handleDelete(document?.id)}>
                  Delete &nbsp;
                </button>
                <button onClick={() => handleUpdateModal(document)}>&nbsp; Update</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <VButton className="mt-4" onClick={() => setLimit((prev) => prev + 10)}>
        Load more
      </VButton>
      <VModal title="Create post" visible={modal} setVisible={setModal}>
        <form className="flex flex-col items-baseline" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <div className="mb-4">
                <VInput {...rest} placeholder="Task name" />
              </div>
            )}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <div className="mb-4">
                <VInput {...rest} placeholder="Amount" />
              </div>
            )}
          />
          <VButton>Submit</VButton>
        </form>
      </VModal>
    </div>
  );
}
