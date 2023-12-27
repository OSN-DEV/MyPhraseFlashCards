import Ajv from 'ajv';
import { app, BrowserWindow, dialog, shell } from 'electron';
import fs   from 'fs';
import path from 'path';
import { PhraseFcListModel, PhraseFcListSchema } from '../model/PhraseFcListModel';
import { PhraseFcModel, PhraseFcSchema } from '../model/PhraseFcModel';
import { PreferenceModel } from '../model/PreferenceModel';
import { ResultModel, ResultCode, createResultModel } from '../model/ResultModel';
import { devLog } from '../util/common';
import { FilePath, OrderDef } from '../util/constants';

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
  fs.writeFileSync(filePath, JSON.stringify(list));
}

/**
 * 文章フラッシュカードの一覧を読込む。
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
 * 文章フラッシュカードファイルの読込み
 * @param owner { BrowserWindow} オーナーウィンドウ
 * @returns {ErrorCode} 処理結果
 *   Canceled - ファイル選択をキャンセル
 *   Invalid - 選択したファイルのフォーマット不正
 */
export const importPhraseFcFile = async(owner: BrowserWindow): Promise<{result: ResultModel, list: PhraseFcListModel[]}> => {
  devLog(`importPhraseFcFile`);

  const createResult = (code: ResultCode, message: string = "", list: PhraseFcListModel[] = []) => { 
    const result: ResultModel = { code, message };
    return { result, list }
  }

  // select target files
  const { canceled, filePaths } = await dialog.showOpenDialog(owner, {
    title: "select Phrase Flash Card",
    filters: [
      {
        extensions: ['json'],
        name: 'JSON File',
      }
    ]
  });
  if (canceled) {
    return createResult(ResultCode.Canceled, "user cancel");
  }

  const model: PhraseFcModel  = JSON.parse(fs.readFileSync(filePaths[0], "utf8"));
  const validator = (new Ajv()).compile(PhraseFcSchema);
  if (!validator(model)) {
    devLog(JSON.stringify(validator.errors));
    return createResult(ResultCode.Invalid, `file format is wrong\n ${validator.errors}`);
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
  return createResult(ResultCode.None, "", list);
}

/**
 * 文章フラッシュカードファイルを書き出し
 * まるごと書き出すのではなく、ファイルの再生回数、フレーズのID・回数を書き出す
 * @param owner { BrowserWindow} オーナーウィンドウ
 * @param src { string } パス
 * @returns {ErrorCode} 処理結果
 *   Canceled - ファイル選択をキャンセル
 *   Invalid - 選択したファイルのフォーマット不正
 */
export const exportPhraseFile = async(owner: BrowserWindow, src: string): Promise<ResultModel> => {
  devLog(`exportPhraseFcFile`);

  const defaultFile = `${path.dirname(src)}\\${path.basename(src, ".json")}.csv`;
  // select target files
  const result = await dialog.showSaveDialog(owner, {
    title: "select Phrase Flash Card",
    defaultPath: defaultFile,
    filters: [
      {
        extensions: ['csv'],
        name: 'CSV file',
      }
    ]
  });
  if (result.canceled) {
    return createResultModel(ResultCode.Canceled, 'user cancel');
  }

  const writeResult = new Promise<ResultModel>(async(resolve, reject) => {
  const model: PhraseFcModel  = JSON.parse(fs.readFileSync(src, "utf8"));
    const writer = fs.createWriteStream(result.filePath!);
    writer.write(`${model.playCount},\r\n`);
    model.phrases.forEach(phrase => {
      writer.write(`${phrase.id},${phrase.playCount},${phrase.hidden}\r\n`);
    });
    writer.end();
    writer.on('finish',() => resolve(createResultModel(ResultCode.None)));
    writer.on('error' ,(err) => reject(createResultModel(ResultCode.Unknown, `fail to write(${err})`)));
  });

  return writeResult;
}

/**
 * TOP画面の条件に応じた文章フラッシュカードを返却する
 * @param path {string} ファイル情報
 * @param pref {PreferenceModel} 抽出条件
 * @returns {ResultModel, PhraseFcModel} 処理結果と文章フラッシュカードの情報(施工時のみ)
 */
export const loadPhraseFcFile = async(path: string, pref: PreferenceModel): Promise<{ result: ResultModel, file?: PhraseFcModel} >  => {
  const createResult = (code: ResultCode, message: string = "") : {result:ResultModel} => { 
    const result: ResultModel = { code, message };
    return { result }
  }

  // load file
  const model: PhraseFcModel  = JSON.parse(fs.readFileSync(path, "utf8"));
  const validator = (new Ajv()).compile(PhraseFcSchema);
  if (!validator(model)) {
    devLog(JSON.stringify(validator.errors));
    return createResult(ResultCode.Invalid, `file format is wrong\n ${validator.errors}`);
  }

  // sort, limit
  let orderedPhrases = model.phrases;
  const randomSort = <T>(list: T[]): T[] => {
    for (let i = list.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  // orderedPhrases = orderedPhrases.filter((m) => !m.hidden); 
  orderedPhrases = orderedPhrases.filter((m) => m.playCount < model.hiddenThreshold && m.hidden === false); 
  switch(pref.orderOfQuestions) {
    case OrderDef.LessNumberOfQuestion:
      orderedPhrases = orderedPhrases.sort((a,b) => a.playCount - b.playCount);
      break;
    case OrderDef.Random:
      orderedPhrases = randomSort(orderedPhrases);
      break;
  }
  if (pref.numberOfQuestions !== "") {
    orderedPhrases = orderedPhrases.slice(0, parseInt(pref.numberOfQuestions));
  }

  const result: ResultModel = {code: ResultCode.None, message: 'success'};
  const resultFile = {...model, phrases: orderedPhrases}
  return {result: result, file: resultFile};
}


/**
 * 文章フラッシュカードを保存する(回数のみ更新)
 * @param path {string} ファイル情報
 * @param model {PhraseFcModel} 更新する情報

 * @returns {ResultModel} 処理結果と文章フラッシュカードの情報(施工時のみ)
 * @note フィアル全体のplayCountが更新されている場合はリストも更新する
 */
export const savePhraseFcFile = async(path: string, model: PhraseFcModel): Promise<ResultModel>  => {
  const createResult = (code: ResultCode, message: string = "") : ResultModel => { 
    const result: ResultModel = { code, message };
    return result;
  }

  const orgModel: PhraseFcModel  = JSON.parse(fs.readFileSync(path, "utf8"));
  const validator = (new Ajv()).compile(PhraseFcSchema);
  if (!validator(model)) {
    devLog(JSON.stringify(validator.errors));
    return createResult(ResultCode.Invalid, `file format is wrong\n ${validator.errors}`);
  }

  const newPhrase = orgModel.phrases.map((phrase) => {
    const match  = model.phrases.find((item) => item.id === phrase.id);
    if (match) {
      let hidden = match.hidden;
      // if (!hidden) {
      //   hidden = (0 < orgModel.hiddenThreshold && orgModel.hiddenThreshold <= match.playCount);
      // }
      return {...phrase, playCount: match.playCount, hidden }
    } else {
      return phrase;
    }
  });
  let isUpdateList = (orgModel.playCount !== model.playCount) ;
  orgModel.playCount = model.playCount;
  orgModel.phrases = newPhrase;
  fs.writeFileSync(path, JSON.stringify(orgModel));
  if (isUpdateList) {
    const list = await loadPhraseFcFileList();
    const newList = list.map((m) => {
      if (m.id === orgModel.id) {
        return {...m, playCount: orgModel.playCount}
      } else {
        return m;
      }
    });
    savePhraseFcFileList(newList);
  }

  return createResult(ResultCode.None, "");
}
