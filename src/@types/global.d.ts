import { PhraseFcListModel } from "../model/PhraseFcListModel";
import { ErrorCode } from "../model/ResultModel";

declare global {
  interface Window {
    mainApi: IMainApi;
    testApi: ITestApi;
  }
}
export interface ITestApi {
  setTitle: (title: string) => void   // pattern1
  openFile: () => Promise<string | null >   // pattern2
  // handleCounter: (e:any, num: number) => void // pattern3
  handleCounter: (listener: (event: any, num: number) => void) => void   // pattern3
}

export interface IMainApi {
  importPhraseFile: () => Promise<{code: ErrorCode, list: PhraseFcListModel[]}>
  loadPhraseFcFileList: () => Promise<PhraseFcListModel[]>
  savePhraseFcFileList: (list: PhraseFcListModel[]) => void
  sendPhraseFcFileList: (listener: (event: any, list: PhraseFcListModel[]) => void) => void
}
