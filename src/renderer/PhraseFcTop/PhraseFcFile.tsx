import React from 'react'
import { PhraseFcListModel } from '../../model/PhraseFcListModel';
import TextButton from '../Component/TextButton';
import Td from '../Component/Td';
import Tr from '../Component/Tr';


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
      <Tr key={id} isSelected={isSelected}>
        <Td>{!isValid ? '💣': ''}</Td>
        <Td styles="cursor-pointer" onClick={() => handleSelectFileClick(index)}>{isSelected ? '🙈' : ''}</Td>
        <Td styles="cursor-pointer" onClick={() => handleSelectFileClick(index)}>{displayName}</Td>
        <Td styles="text-right">{playCount}</Td>
        <Td styles="text-center"><TextButton textColor="cyan" onClick={() => handleEditClick(id)}>edit</TextButton></Td>
        <Td styles="text-center"><TextButton textColor="red" onClick={() => handleDeleteClick(id)}>delete</TextButton></Td>
      </Tr>
    </>
  )
}

export default PhraseFcFile;
