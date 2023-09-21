import path from 'node:path';
import { BrowserWindow, app, ipcMain, dialog, Menu, ipcRenderer } from 'electron';
import { EventDef } from '../util/constants';
import { devLog } from '../util/common';
import { shell } from 'electron'
import { FilePath } from '../util/constants';
import { ErrorCode } from '../model/ResultModel';

import { createDataDirectory, importPhraseFcFile, savePhraseFcFileList, showDataFolder } from './file';
import { PhraseFcListModel } from '../model/PhraseFcListModel';
let mainWindow: BrowserWindow | null = null;
let showDevTool: boolean = false;

const readPreference = () => {
}

const readCurrentFlashCard = () => {
}

const readPhraseFileList = () => {
}

const readPhrase = () => {
}

const saveCurrentFlashCard = () => {
}

const handleLoadPhraseFcList = async() => {
}

const handleImportPhraseFcFile = async() => {
  devLog(`handleImportPhraseFcFile`);
  const {error, list} = await importPhraseFcFile(mainWindow!);
  return { code: error.code, list: list}
}

const handleSavePhraseFcList = async(list: PhraseFcListModel[]) => {
  devLog(`handleSavePhraseFcList`);
  savePhraseFcFileList(list);
}

const toggleDevTool = () => {
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



function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  // pattern3
  const menu = Menu.buildFromTemplate([
    {label: 'Debug Menu',
    submenu:[
      {label: showDevTool ? 'hide dev tool': 'show dev tool',click:() => toggleDevTool()},
      {label: 'showDataFolder',click:() => showDataFolder()}, 
    ]}
  ])
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('dist/index.html')
    // .then(() => loadPhraseFcFileList())
    .then((data) => {
      // mainWindow?.webContents.send(EventDef.SendPhraseFcList, JSON.stringify(data));
      // mainWindow?.webContents.removeAllListeners(EventDef.SendPhraseFcList);
    });
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createDataDirectory();
  createWindow();

  // register event
  ipcMain.handle(EventDef.ImportPhraseFcFile, handleImportPhraseFcFile);
  ipcMain.handle(EventDef.SavePhraseFcList, (_, list) => handleSavePhraseFcList(list));
  ipcMain.handle(EventDef.LoadPhraseFcList, handleLoadPhraseFcList);
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });

  // loadPhraseFcFileList()
  //   .then((result) => {
  //     console.log(result);
  //   })
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

