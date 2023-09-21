export const PreferenceSchema = {
  $id: "http://osn.com/schemas/preference-schema.json",
  type: "object",
  properties: {
    id: { type: "integer" },
  },
  required: ["id"],
  additionalProperties: false,
} as const;
