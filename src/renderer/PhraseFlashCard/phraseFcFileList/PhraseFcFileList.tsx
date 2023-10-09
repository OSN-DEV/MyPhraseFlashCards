import React, {useState} from 'react'
import PhraseFcFile from './PhraseFcFile';
import EditDialog from './editDialog';
import { PhraseFcListModel, createEmptyPhraseFcListModel } from '../../../model/PhraseFcListModel';
import { devLog } from '../../../util/common';
import { ErrorCode } from '../../../model/ResultModel';
import { useLocalStorageObject } from '../../../util/UseLocalStorage';
import { DataKey } from '../../../util/constants';

const PhraseFcFileList = () => {
  const [phraseFcList, setPhraseFcList] = useLocalStorageObject<PhraseFcListModel[]>(DataKey.PharasFcFileList, []);
  const [currentModel, setCurrentModel] = useState<PhraseFcListModel>(createEmptyPhraseFcListModel());
  const [isShow, setIsShow] = useState<boolean>(false);
  // let currentModel: PhraseFcListModel = createEmptyPhraseFcListModel();

  const handleEditClick = (id: number) => {
    devLog(`handleEditClick id:${id}`);
    const tmpModel = phraseFcList.filter(m => m.id === id);
    if (0 < tmpModel.length) {
      // currentModel = tmpModel[0];
      setCurrentModel(tmpModel[0]);
    } else {
      // currentModel = createEmptyPhraseFcListModel();
      setCurrentModel(createEmptyPhraseFcListModel());
      return;
    }
    console.log(currentModel);
    setIsShow(true);
  }

  const handleDialogCancel = () => {
    devLog(`handleDialogCancel`);
    setIsShow(false);
  }

  const handleDialogSave = (id:number, name: string) => {
    devLog(`handleDialogSave id:${id}, name:${name}`);
    console.log(currentModel)
    setIsShow(false);
    const newList = phraseFcList.map(m => {
      if (m.id === currentModel.id) {
        return {...currentModel, displayName : name};
      } else {
        return m;
      }
    });
    console.log(newList);
    window.mainApi.savePhraseFcFileList(newList);
    setPhraseFcList(newList);
  }

  const handleDeleteClick = (id: number) => {
    devLog(`handleDeleteClick id:${id}`);
    const newList = phraseFcList.filter(m => m.id !== id);
    window.mainApi.savePhraseFcFileList(newList);
    setPhraseFcList(newList);
  }

  const handleImportClick = async(_: React.MouseEvent<HTMLElement>) => {
    devLog(`handleImportClick`);
    const { code, list } = await window.mainApi.importPhraseFile();
    switch(code) {
      case ErrorCode.None:
        setPhraseFcList(list);
        break;
    }
  }

  const handleSelectFileClick = (id: number) => {
  }

  const handleExportClick = (_: React.MouseEvent<HTMLElement>) => {
    devLog(`handleExportClick`);
  }
      // {
      // phraseFcList.map((file) => {
      //   return (
      //     <tr key={file.id}>
      //       <td>{!file.isValid ? '!': ''}</td>
      //       <td>{file.displayName}</td>
      //       <td>{file.playCount}</td>
      //       <td><button onClick={() => handleEditClick(file.id)}>edit</button></td>
      //       <td><button onClick={() => handleDeleteClick(file.id)}>delete</button></td>
      //     </tr>
      //   );
      // })
      // }
  
  return(
    <>
      <EditDialog
        id={currentModel.id}
        isShow = {isShow}
        displayName = {currentModel.displayName}
        onClose= {handleDialogCancel}
        onSave={handleDialogSave}
        />
      <table style={{border:"solid 1px silver"}}>
      <thead>
        <tr><th colSpan={2}>displayName</th><th>count</th><th></th><th></th></tr>
        {
          phraseFcList.map((file) => 
            <PhraseFcFile 
              isSelected = {true}
              data = {file}
              handleEditClick = {handleEditClick}
              handleDeleteClick = {handleDeleteClick}
              handleSelectFileClick = {handleSelectFileClick}
            /> 
          )
        }
      </thead>
      <tbody>
      </tbody>
      </table>
    <div>
      <button onClick={handleImportClick}>import</button>
      <button onClick={handleExportClick}>export</button>
    </div>

    </>
  )
}

export default PhraseFcFileList;
