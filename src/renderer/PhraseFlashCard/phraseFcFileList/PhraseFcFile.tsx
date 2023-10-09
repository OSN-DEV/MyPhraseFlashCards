import React, {useState} from 'react'
import { PhraseFcListModel, createEmptyPhraseFcListModel } from '../../../model/PhraseFcListModel';


export type PhraseFcFileProps = {
  isSelected: boolean,
  data: PhraseFcListModel,
  handleEditClick : (id: number) => void,
  handleDeleteClick : (id: number) => void
  handleSelectFileClick: (id: number) => void
}
const PhraseFcFile = (props: PhraseFcFileProps) => {
  const {id, isValid, displayName, playCount } = props.data;
  const {isSelected, handleEditClick, handleDeleteClick, handleSelectFileClick}  = props;
  return (
    <>
      <tr key={id}>
        <td>{!isValid ? '!': ''}</td>
        <td onClick={() => handleSelectFileClick(id)}>{isSelected ? '●' : ''}</td>
        <td onClick={() => handleSelectFileClick(id)}>{displayName}</td>
        <td>{playCount}</td>
        <td><button onClick={() => handleEditClick(id)}>edit</button></td>
        <td><button onClick={() => handleDeleteClick(id)}>delete</button></td>
      </tr>
    </>
  )
}

export default PhraseFcFile;
