export type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
    [x: string]: JSONValue | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JSONArray extends Array<JSONValue> {}
