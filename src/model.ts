// JSON
export type JSONValue = boolean | number | string | JSONObject | JSONArray

export type JSONArray = JSONValue[]

export type JSONObject = {
  [index: string]: JSONValue
}

// Parsed
export type PropertyType = 'boolean' | 'number' | 'string' | 'unknown' | Component

export type Property = {
  name: string
  type: PropertyType
  array?: boolean
  description?: string
  format?: string
}

export type Component = {
  name: string
  properties: Property[]
}

export type Api = {
  path: string
  title: string
  description: string
  mainComponentName: string
  classType: string
  classSubType: string
  components: Record<string, Component>
}
