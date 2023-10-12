import { createEmptyPhraseFcModel, PhraseFcModel } from "./PhraseFcModel"

export type CurrentPhraseFcModel = {
  index: number,
  path: string,
  file: PhraseFcModel
}

export const createEmptyCurrentPhraseFcModel = (): CurrentPhraseFcModel => {
  return {index: 0, path: '', file: createEmptyPhraseFcModel()};
}