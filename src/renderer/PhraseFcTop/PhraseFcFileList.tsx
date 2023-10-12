import React, {useState} from 'react'
import PhraseFcFile from './PhraseFcFile';
import EditDialog from './editDialog';
import { PhraseFcListModel, createEmptyPhraseFcListModel } from '../../model/PhraseFcListModel';
import { devLog } from '../../util/common';
import { useLocalStorageObject } from '../../util/UseLocalStorage';
import { DataKey } from '../../util/constants';
import { createEmptyPreferenceModel, PreferenceModel } from '../../model/PreferenceModel';
import { ResultCode } from '../../model/ResultModel';

type PhraseFcFileListProps = {
  setPhraseFcListCount : (count: number) => void
  phraseFcList : PhraseFcListModel[],
  setPhraseFcList: (list: PhraseFcListModel[]) => void
}

const PhraseFcFileList = (props: PhraseFcFileListProps) => {
  const [currentModel, setCurrentModel] = useState<PhraseFcListModel>(createEmptyPhraseFcListModel());
  const [isShow, setIsShow] = useState<boolean>(false);
  const [preference, setPreference] = useLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());
  const {phraseFcList, setPhraseFcList, setPhraseFcListCount} = props;
  
  
  /**
   * 編集クリック
   * @param id{number} ファイルid
   */
  const handleEditClick = (id: number) => {
    devLog(`handleEditClick id:${id}`);
    const tmpModel = phraseFcList.filter(m => m.id === id);
    if (0 < tmpModel.length) {
      setCurrentModel(tmpModel[0]);
    } else {
      setCurrentModel(createEmptyPhraseFcListModel());
      return;
    }
    setIsShow(true);
  }

  /**
   * 編集ダイアログ キャンセルクリック
   */
  const handleDialogCancel = () => {
    devLog(`handleDialogCancel`);
    setIsShow(false);
  }

  /**
   * 編集ダイアログ 保存クリック
   */
  const handleDialogSave = (id:number, name: string) => {
    devLog(`handleDialogSave id:${id}, name:${name}`);
    setIsShow(false);
    const newList = phraseFcList.map(m => {
      if (m.id === currentModel.id) {
        return {...currentModel, displayName : name};
      } else {
        return m;
      }
    });
    window.mainApi.savePhraseFcFileList(newList);
    setPhraseFcList(newList);
  }


  /**
   * ファイル削除クリック
   * @param id {number} ファイルID
   */
  const handleDeleteClick = (id: number) => {
    devLog(`handleDeleteClick id:${id}`);
    const newList = phraseFcList.filter(m => m.id !== id);
    window.mainApi.savePhraseFcFileList(newList);
    setPhraseFcList(newList);
    setPhraseFcListCount(newList.length);
  }

  /**
   * インポートクリック
   */
  const handleImportClick = async(_: React.MouseEvent<HTMLElement>) => {
    devLog(`handleImportClick`);
    const { result, list } = await window.mainApi.importPhraseFile();
    switch(result.code) {
      case ResultCode.None:
        setPhraseFcList(list);
        setPhraseFcListCount(list.length);
        break;
    }
  }

  /**
   * ファイルリスト内 ファイル選択
   * @param index{number} リストのインデックス
   */
  const handleSelectFileClick = (index: number) => {
    devLog(`handleSelectFileClick:${index}`);
    preference.selectedPhraseFcFileIndex = index;
    setPreference({...preference, selectedPhraseFcFileIndex:index});
  }

  /**
   * エクスポートクリック
   */
  const handleExportClick = (_: React.MouseEvent<HTMLElement>) => {
    devLog(`handleExportClick`);
  }
  
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
        <tr><th>&nbsp;</th><th>&nbsp;</th><th colSpan={2}>displayName</th><th>count</th><th></th><th></th></tr>
        {
          phraseFcList.map((file,index) => 
            <PhraseFcFile 
              key={index}
              index = {index}
              isSelected = {index === preference.selectedPhraseFcFileIndex}
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
