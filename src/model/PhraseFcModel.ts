export const PhraseFcSchema = {
  $id: "http://osn.com/schemas/phrase-fc-schema.json",
  type: "object",
  properties: {
    id: { type: "integer" },
    displayName: { type: "string" },
    playCount: { type: "integer" },
    hiddenThreshold: {type: "integer"},
    phrases: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          header1: { type: "string" },
          header2: { type: "string" },
          header3: { type: "string" },
          playCount: { type: "integer" },
          note: { type: "string" },
          hidden: { type: "boolean" }, 
          paragraphs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                para: { type: "string" },
                sub: { type: "string" },
              },
              required: ["para"],
            },
          },
        },
        required: ["id"],
      },
    },
  },
  required: ["id", "displayName", "phrases"],
  additionalProperties: false,
} as const;

export type PhraseFcModel = {
  id: number,
  displayName: string,
  playCount: number,
  hiddenThreshold: number,
  phrases : PhraseModel[]
}

export type PhraseModel = {
    id: number,
    header1: string,
    header2: string,
    header3: string,
    playCount: number,
    note: string,
    hidden: boolean,
    paragraphs: {
      para: string,
      sub: string
    }[]
}


export const createEmptyPhraseFcModel = ():PhraseFcModel => {
  return {
    id: -1,
    displayName: '',
    playCount: 0,
    hiddenThreshold: 0,
    phrases: []
  }
}
