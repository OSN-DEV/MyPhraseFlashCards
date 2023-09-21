import { warn } from 'console';
import React, {useState} from 'react'
import { devLog } from '../../../util/common';
import { PhraseFcListModel, createEmptyPhraseFcListModel } from '../../../model/PhraseFcListModel';
import { ErrorCode } from '../../../model/ResultModel';
import EditDialog from './editDialog';


export type PhraseFcFileProps = {
  data: PhraseFcListModel,
  handleEditClick : (id: number) => void,
  handleDeleteClick : (id: number) => void
}
const PhraseFcFile = (props: PhraseFcFileProps) => {
  const {id, isValid, displayName, playCount} = props.data;
  const {handleEditClick, handleDeleteClick}  = props;
  return (
    <>
      <tr key={id}>
        <td>{!isValid ? '!': ''}</td>
        <td>{displayName}</td>
        <td>{playCount}</td>
        <td><button onClick={() => handleEditClick(id)}>edit</button></td>
        <td><button onClick={() => handleDeleteClick(id)}>delete</button></td>
      </tr>
    </>
  )
}

export default PhraseFcFile;
