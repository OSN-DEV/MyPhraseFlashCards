import React from 'react'
import { PhraseFcListModel } from '../../model/PhraseFcListModel';


export type PhraseFcFileProps = {
  index: number,
  isSelected: boolean,
  data: PhraseFcListModel,
  handleEditClick : (id: number) => void,
  handleDeleteClick : (id: number) => void
  handleSelectFileClick: (id: number) => void
}
const PhraseFcFile = (props: PhraseFcFileProps) => {
  const {id, isValid, displayName, playCount } = props.data;
  const {index, isSelected, handleEditClick, handleDeleteClick, handleSelectFileClick}  = props;
  return (
    <>
      <tr key={id}>
        <td>{!isValid ? '!': ''}</td>
        <td onClick={() => handleSelectFileClick(index)}>{isSelected ? '●' : ''}</td>
        <td onClick={() => handleSelectFileClick(index)}>{displayName}</td>
        <td>{playCount}</td>
        <td><button onClick={() => handleEditClick(id)}>edit</button></td>
        <td><button onClick={() => handleDeleteClick(id)}>delete</button></td>
      </tr>
    </>
  )
}

export default PhraseFcFile;
