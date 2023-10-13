import  { contextBridge, ipcRenderer, IpcRendererEvent  } from 'electron'
import { PhraseFcListModel } from '../model/PhraseFcListModel'
import { PhraseFcModel } from '../model/PhraseFcModel'
import { PreferenceModel } from '../model/PreferenceModel'
import { ProcIfDef } from '../util/constants'

contextBridge.exposeInMainWorld('mainApi', {
  importPhraseFile: () => ipcRenderer.invoke(ProcIfDef.ImportPhraseFcFile),
  exportPhraseFile: (path:string) => ipcRenderer.invoke(ProcIfDef.ExportPhraseFcFile, path),
  savePhraseFcFileList: (list: PhraseFcListModel[]) => ipcRenderer.invoke(ProcIfDef.SavePhraseFcList, list),
  loadPhraseFcFileList: () => ipcRenderer.invoke(ProcIfDef.LoadPhraseFcList),
  sendPhraseFcFileList: (listener: (event: any, list: PhraseFcListModel[]) => void) => {
    ipcRenderer.on(ProcIfDef.SendPhraseFcList, (ev: IpcRendererEvent, list: PhraseFcListModel[]) => listener(ev, list));
  },
  loadPhraseFcFile: (path: string, pref: PreferenceModel) => ipcRenderer.invoke(ProcIfDef.LoadPhraseFcFile, path, pref),
  savePhraseFcFile: (path: string, file: PhraseFcModel) => ipcRenderer.invoke(ProcIfDef.SavePhraseFcFile, path, file),
  setWindowTitle: (title: string) => ipcRenderer.invoke(ProcIfDef.SetWindowTitle, title),
})
