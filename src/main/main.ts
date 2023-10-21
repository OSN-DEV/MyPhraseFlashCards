import path from 'node:path';
import { BrowserWindow, app, ipcMain, dialog, Menu, ipcRenderer } from 'electron';
import { ProcIfDef } from '../util/constants';
import { devLog } from '../util/common';
import { createDataDirectory, exportPhraseFile, importPhraseFcFile, loadPhraseFcFile, loadPhraseFcFileList, savePhraseFcFile, savePhraseFcFileList, showDataFolder } from './file';
import { PhraseFcListModel } from '../model/PhraseFcListModel';
import { PreferenceModel } from '../model/PreferenceModel';
import { PhraseFcModel } from '../model/PhraseFcModel';
import { ResultModel } from '../model/ResultModel';

let mainWindow: BrowserWindow | null = null;
let showDevTool: boolean = false;

/**
 * 文章フラシュカードのリストを取得
 */
const handleLoadPhraseFcList = async () => {
  return await loadPhraseFcFileList();
}

/**
 * 文章フラッシュカードをインポートする
 * @returns 文章フラッシュカードのリスト
 */
const handleImportPhraseFcFile = async(): Promise<{result: ResultModel, list: PhraseFcListModel[]}> => {
  devLog(`handleImportPhraseFcFile`);
  return await importPhraseFcFile(mainWindow!);
}

const handleExportPhraseFcFile = async(path: string): Promise<ResultModel> => {
  devLog(`handleExportPhraseFcFile`);
  return await exportPhraseFile(mainWindow!, path);
}

/**
 * 文章フラッシュカードのリストを保存
 * @param list {PhraseFcListModel[]} 保存するリスト
 */
const handleSavePhraseFcList = async (list: PhraseFcListModel[]) => {
  devLog(`handleSavePhraseFcList`);
  savePhraseFcFileList(list);
}

/**
 * 文章フラッシュカードを読み込む
 * @param path {string} 文章フラッシュカードのファイルパス
 * @param pref {PreferenceModel} プリファレンス情報
 * @returns {PhraseFcModel} prefで条件を絞った文章フラッシュカード
 */
const handleLoadPhraseFcFile = async(path: string, pref: PreferenceModel): Promise<{result: ResultModel, file?: PhraseFcModel}> => {
  devLog(`handleLoadPhraseFcFile`);
  return await loadPhraseFcFile(path, pref);
}

/**
 * 文章フラッシュカードを保存(回数の更新が目的)
 * @param path {string} 文章フラッシュカードのファイルパス
 * @param file {PhraseFcModel} 文章フラッシュカード
 */
const handleSavePhraseFcFile = async (path: string, file: PhraseFcModel): Promise<ResultModel> => {
  devLog(`handleSavePhraseFcFile`);
  const result = await savePhraseFcFile(path, file);
  return result;
}

/**
 * ウィンドウタイトル
 * @param title {string} タイトル
 */
const handleSetWindowTitle = (title: string): void => {
  if (mainWindow) {
    mainWindow.setTitle(title);
  }
}

/**
 * Devツールの表示切替
 */
const toggleDevTool = (): void => {
  if (null === mainWindow) {
    return;
  }
  if (showDevTool) {
    mainWindow.webContents.closeDevTools();
  } else {
    mainWindow.webContents.openDevTools();
  }
  showDevTool = !showDevTool;
}

/**
 * メインウィンドウを作成
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: 'Debug Menu',
      submenu: [
        { label: showDevTool ? 'hide dev tool' : 'show dev tool', click: () => toggleDevTool() },
        { label: 'showDataFolder', click: () => showDataFolder() },
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('dist/index.html')
    .then((data) => {
    });
}

/**
 * electron event
 */
app.whenReady().then(() => {
  createDataDirectory();
  createWindow();

  // register event
  ipcMain.handle(ProcIfDef.ImportPhraseFcFile, handleImportPhraseFcFile);
  ipcMain.handle(ProcIfDef.ExportPhraseFcFile, (_, path) => handleExportPhraseFcFile(path));
  ipcMain.handle(ProcIfDef.SavePhraseFcList, (_, list) => handleSavePhraseFcList(list));
  ipcMain.handle(ProcIfDef.LoadPhraseFcList, handleLoadPhraseFcList);
  ipcMain.handle(ProcIfDef.LoadPhraseFcFile, (_, path, pref) => handleLoadPhraseFcFile(path, pref));
  ipcMain.handle(ProcIfDef.SavePhraseFcFile, (_, path, file) => handleSavePhraseFcFile(path, file));
  ipcMain.handle(ProcIfDef.SetWindowTitle, (_, title) => handleSetWindowTitle(title));

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });

})

/**
 * electron event
 */
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

