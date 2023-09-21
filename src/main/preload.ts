import  { contextBridge, ipcRenderer, IpcRendererEvent  } from 'electron'
import { PhraseFcListModel } from '../model/PhraseFcListModel'
import { EventDef } from '../util/constants'

contextBridge.exposeInMainWorld('testApi', {
  // pattern1
  setTitle: (title: string) => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  handleCounter: (listener:(ev: IpcRendererEvent, num:number) => void) => {
    ipcRenderer.on('update-counter', (ev: IpcRendererEvent , num:number) => listener(ev, num))
  },
})



contextBridge.exposeInMainWorld('mainApi', {
  importPhraseFile: () => ipcRenderer.invoke(EventDef.ImportPhraseFcFile),
  savePhraseFcFileList: (list: PhraseFcListModel[]) => ipcRenderer.invoke(EventDef.SavePhraseFcList, list),
  laodPhraseFcFileList: () => ipcRenderer.invoke(EventDef.LoadPhraseFcList),
  sendPhraseFcFileList: (listener: (event: any, list: PhraseFcListModel[]) => void) => {
    ipcRenderer.on(EventDef.SendPhraseFcList, (ev: IpcRendererEvent, list: PhraseFcListModel[]) => listener(ev, list));
  }
})
