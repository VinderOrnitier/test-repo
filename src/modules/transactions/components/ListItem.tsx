import React from 'react';
import { ITransactions } from "../transactions.types"

interface Props {
  document: ITransactions
  handleChanged: (i: ITransactions) => void
  handleDelete: (id: string) => void
  handleUpdateModal: (i: ITransactions) => void
}

const ListItem = ({document, handleChanged, handleDelete, handleUpdateModal}: Props) => {
  return (
    <li className="border flex items-center px-3 py-2" key={document.id}>
      <input
        className="mr-2"
        type="checkbox"
        onChange={() => handleChanged(document)}
        checked={document.completed}
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex basis-auto flex-row justify-between w-full mr-4">
          <span className="mr-4 truncate w-20" title={document.id}>{document.id}</span>
          <span className="mr-4 truncate max-w-xs">{document.name}</span>
          <b className="truncate max-w-xs">amount: {document.amount || 0}</b>
        </div>
        <div className="w-40 pl-4 border-l">
          <button className="text-red-700 mr-4" onClick={() => handleDelete(document.id)}>
            Delete
          </button>
          <button onClick={() => handleUpdateModal(document)}>Update</button>
        </div>
      </div>
    </li>
  )
}

export default React.memo(ListItem);
