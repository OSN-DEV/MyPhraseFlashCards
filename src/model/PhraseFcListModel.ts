export const PhraseFcListSchema = {
  $id: "http://osn.com/schemas/phrase-fc-list-schema.json",
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "integer" },
      displayName: { type: "string" },
      playCount: { type: "integer" }, 
      filePath: { type: "string" },
      isValid: { type: "boolean" },
    },
    required: ["id", "displayName", "filePath"],
  }
} as const;

export type PhraseFcListModel = {
  id: number,
  displayName:  string,
  playCount: number,
  filePath: string,
  isValid: boolean
}

export const createEmptyPhraseFcListModel = ():PhraseFcListModel => {
  return {
  id: -1,
  displayName:  '',
  playCount: 0,
  filePath: '',
  isValid: false
  }
}
