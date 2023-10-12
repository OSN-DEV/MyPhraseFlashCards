import { createEmptyPhraseFcModel, PhraseFcModel } from "./PhraseFcModel"

export type CurrentPhraseFcModel = {
  index: number,
  file: PhraseFcModel
}

export const createEmptyCurrentPhraseFcModel = (): CurrentPhraseFcModel => {
  return {index: 0, file: createEmptyPhraseFcModel()};
}