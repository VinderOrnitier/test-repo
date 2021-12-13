import React, { ReactElement, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { VButton, VInput, VModal } from '../../../components';
import { ITransactions } from '../transactions.types';
import { INITIAL_VALUES } from '../transactions.constants';
import { useAuthContext, useCollection, useFirestore } from '../../../hooks';
import { COLLECTION } from '../../../constants';
import ListItem from '../components/ListItem';

export default function TransactionsContainer(): ReactElement {
  // const [limit, setLimit] = useState(10);
  const [modal, setModal] = useState(false);
  const [itemData, setItemData] = useState<ITransactions>(INITIAL_VALUES);
  const [updated, setUpdated] = useState(false);
  const { user } = useAuthContext();

  const { response, addDocument, updateDocument, deleteDocument } = useFirestore(COLLECTION.TRANSACTIONS);
  const { documents, error: documentsError } = useCollection(
    COLLECTION.TRANSACTIONS,
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

  const handleDelete = (id: string) => {
    deleteDocument(id);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (response.isLoading) {
    return <h3>Loading...</h3>;
  }

  if (documentsError) {
    return <h3>Cant load todos</h3>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center border-b mb-4 pb-3">
        <h2 className="text-3xl font-bold my-4">Transactions</h2>
        <VButton className="mb-4" onClick={handleToggle}>
          Create task
        </VButton>
      </div>
      {response.onError && <p>{response.onError}</p>}
      <ul>
        {!documents?.length && <p className="mb-4">No transactions</p>}
        {documents?.map((document: ITransactions) => (
          <ListItem
            key={document.id}
            document={document}
            handleChanged={handleChanged}
            handleDelete={handleDelete}
            handleUpdateModal={handleUpdateModal}
          />
        ))}
      </ul>
      <hr />
      {/* <VButton className="mt-4" onClick={() => setLimit((prev) => prev + 10)}>
        Load more
      </VButton> */}
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
                <VInput {...rest} placeholder="Amount" type='number' />
              </div>
            )}
          />
          <VButton>Submit</VButton>
        </form>
      </VModal>
    </div>
  );
}
