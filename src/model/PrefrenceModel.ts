export const PreferenceSchema = {
  $id: "http://osn.com/schemas/preference-schema.json",
  type: "object",
  properties: {
    id: { type: "integer" },
  },
  required: ["id"],
  additionalProperties: false,
} as const;

export type PreerenceModel = {
  /**
   * 選択されている文章フレーズファイルのリストインデックス
   */
  selectedPhraseFcFileIndex: number,
  /**
   * 出題数
   */
  numberOfQuestions: number,
  /**
   * 出題順
   */
  orderOfQuestions: string
}
