import React, {useState} from 'react'
import PhraseFcFile from './PhraseFcFile';
import EditDialog from './editDialog';
import { PhraseFcListModel, createEmptyPhraseFcListModel } from '../../model/PhraseFcListModel';
import { devLog } from '../../util/common';
import { useLocalStorageObject } from '../../util/UseLocalStorage';
import { DataKey } from '../../util/constants';
import { createEmptyPreferenceModel, PreferenceModel } from '../../model/PreferenceModel';
import { ResultCode } from '../../model/ResultModel';
import Table from '../Component/Table';
import Thead from '../Component/Thead';
import Th from '../Component/Th';
import Button from '../Component/Button';
import Tr from '../Component/Tr';

type PhraseFcFileListProps = {
  setPhraseFcListCount : (count: number) => void
  phraseFcList : PhraseFcListModel[],
  setPhraseFcList: (list: PhraseFcListModel[]) => void
}

const PhraseFcFileList = (props: PhraseFcFileListProps) => {
  const {phraseFcList, setPhraseFcList, setPhraseFcListCount} = props;
  const [preference, setPreference] = useLocalStorageObject<PreferenceModel>(DataKey.Preference, createEmptyPreferenceModel());
  const [currentModel, setCurrentModel] = useState<PhraseFcListModel>(
    phraseFcList.length === 0 ? createEmptyPhraseFcListModel() : phraseFcList[preference.selectedPhraseFcFileIndex]
  );
  const [isShow, setIsShow] = useState<boolean>(false);

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
  const handleImportClick = async() => {
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
  const handleExportClick =  async() => {
    devLog(`handleExportClick`);
    if (0 === phraseFcList.length) {
      return;
    }
    const result = await window.mainApi.exportPhraseFile(phraseFcList[preference.selectedPhraseFcFileIndex].filePath);
    switch (result.code) {
      case ResultCode.None:
        // NOP
        break;
      case ResultCode.Canceled:
        // NOP
        break;
      default:
        alert(result.message);
        break;
    }
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
      <div className="h-52 overflow-y-auto">
      <Table>
      <Thead>
        <Tr>
          <Th>&nbsp;</Th>
          <Th>&nbsp;</Th>
          <Th>displayName</Th>
          <Th>count</Th>
          <Th colSpanNum={2}></Th>
        </Tr>
      </Thead>
      <tbody>
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
      </tbody>
      </Table>
      </div>
    <div className="text-right mt-3">
      <Button onClick={handleImportClick} styles="mr-3">import</Button>
      <Button onClick={handleExportClick}>export</Button>
    </div>

    </>
  )
}

export default PhraseFcFileList;
