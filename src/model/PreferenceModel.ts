import { OrderDef } from "../util/constants";

export const PreferenceSchema = {
  $id: "http://osn.com/schemas/preference-schema.json",
  type: "object",
  properties: {
    id: { type: "integer" },
  },
  required: ["id"],
  additionalProperties: false,
} as const;

export type PreferenceModel = {
  /**
   * 選択されている文章フレーズファイルのリストインデックス
   */
  selectedPhraseFcFileIndex: number,
  /**
   * 現在の文章フラッシュカードのインデックス
   */
  currentPhraseFcIndex: number,
  /**
   * 出題数
   */
  numberOfQuestions: string,
  /**
   * 出題順
   */
  orderOfQuestions: string,
}


export const createEmptyPreferenceModel = ():PreferenceModel => {
  return {
    selectedPhraseFcFileIndex: 0,
    currentPhraseFcIndex: 0,
    numberOfQuestions: '',
    orderOfQuestions: OrderDef.FromTheBegining,
  }
}
