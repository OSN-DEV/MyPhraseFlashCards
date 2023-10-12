import { PhraseFcListModel } from "../model/PhraseFcListModel";
import { PhraseFcModel } from "../model/PhraseFcModel";
import { PreferenceModel } from "../model/PreferenceModel";
import { ResultModel } from "../model/ResultModel";

declare global {
  interface Window {
    mainApi: IMainApi;
  }
}
export interface IMainApi {
  importPhraseFile: () => Promise<{result: ResultModel, list: PhraseFcListModel[]}>
  loadPhraseFcFileList: () => Promise<PhraseFcListModel[]>
  savePhraseFcFileList: (list: PhraseFcListModel[]) => void
  sendPhraseFcFileList: (listener: (event: any, list: PhraseFcListModel[]) => void) => void
  loadPhraseFcFile: (path: string, pref: PreferenceModel) => Promise<{result: ResultModel, file?: PhraseFcModel}>
  savePhraseFcFile: (path: string, file: PhraseFcModel) => Promise<ResultModel>
  setWindowTitle: (title: string) => void
}
