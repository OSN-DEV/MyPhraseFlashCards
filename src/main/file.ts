import Ajv from 'ajv';
import { warn } from 'console';
import { app, BrowserWindow, dialog, shell } from 'electron';
import fs   from 'fs';
import path from 'path';
import { PhraseFcListModel, PhraseFcListSchema } from '../model/PhraseFcListModel';
import { PhraseFcModel, PhraseFcSchema } from '../model/PhraseFcModel';
import { ResultModel, ErrorCode } from '../model/ResultModel';
import { devLog } from '../util/common';
import { FilePath } from '../util/constants';

/***
 * データフォルダを作成する
 */
export const createDataDirectory = () => {
  const filePath = path.join(app.getPath("appData"), FilePath.AppDirectory);  
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}

/***
 * データフォルダを表示する
 */
export const showDataFolder = () => {
  const filePath = path.join(app.getPath("appData"), FilePath.AppDirectory);  
  shell.openPath(filePath);
}


/**
 * 文章フラッシュカードモデルの一覧を保存する。
 */
export const savePhraseFcFileList = async(list: PhraseFcListModel[]) => {
  devLog(`savePhraseFcFileList`);
  const filePath = path.join(app.getPath("appData"), FilePath.PhraseFcList);
  // if (!fs.existsSync(filePath)) {
  //   fs.unlinkSync(filePath);
  // }
  // console.log(JSON.stringify(lsit));
  fs.writeFileSync(filePath, JSON.stringify(list));
}

/**
 * 文章フラッシュカードモデルの一覧を読み込む。
 * リストのファイルの実在判定はこの時点では行わない。
 *
 * @returnis { PhraseFMCListModel } 読み込んだファイル一覧。フィアル未存在時は空の配列
 */
export const loadPhraseFcFileList = async(): Promise<PhraseFcListModel[]> => {
  devLog(`loadPhraseFcFileList enter`);
  const filePath = path.join(app.getPath("appData"), FilePath.PhraseFcList);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const model: PhraseFcListModel[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const validator  = (new Ajv()).compile(PhraseFcListSchema);
  if (!validator(model)) {
    console.log(validator.errors);
    throw new Error("Invalid Phrase Flash Card List");
  }
  return model;
}



/**
 * フレーズファイルの読込み
 * @param owner { BrowserWindow} オーナーウィンドウ
 * @returns {ErrorCode} 処理結果
 *   Canceled - ファイル選択をキャンセル
 *   Invalid - 選択したファイルのフォーマット不正
 */
export const importPhraseFcFile = async(owner: BrowserWindow): Promise<{error: ResultModel, list: PhraseFcListModel[]}> => {
  devLog(`importPhraseFcFile`);

  const createResult = (code: ErrorCode, message: string = "", list: PhraseFcListModel[] = []) => { 
    const error: ResultModel = { code, message };
    return { error, list }
  }

  // select target files
  const { canceled, filePaths } = await dialog.showOpenDialog(owner, {
    title: "select Phrase Flash Card",
  });
  if (canceled) {
    return createResult(ErrorCode.Canceled, "user cancel");
  }

  const model: PhraseFcModel  = JSON.parse(fs.readFileSync(filePaths[0], "utf8"));
  const validator = (new Ajv()).compile(PhraseFcSchema);
  if (!validator(model)) {
    console.log(JSON.stringify(validator.errors));
    return createResult(ErrorCode.Invalid, `file format is wrong\n ${validator.errors}`);
  }

  // if same id exists, update file path
  const list = await loadPhraseFcFileList();
  let isExist = false;
  list.forEach((item) => {
    if (item.id  === model.id) {
      item.filePath  = filePaths[0];
      item.isValid = true;
      isExist = true;
    }
  });
  if (!isExist) {
    list.push(
      {
        id: model.id,
        displayName: model.displayName,
        playCount: model.playCount,
        filePath: filePaths[0],
        isValid: true
      }
    );
    list.sort((a: {displayName: string}, b: {displayName: string}) => a.displayName.localeCompare(b.displayName));
  }

  const filePath = path.join(app.getPath("appData"), FilePath.PhraseFcList);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  fs.writeFileSync(filePath, JSON.stringify(list));
  return createResult(ErrorCode.None, "", list);
}


