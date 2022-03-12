import { Api, JSONObject, Property, PropertyType } from './model'

export function parseApi(apiJson: JSONObject): Api {
  const responseJson = apiJson.response as JSONObject
  const componentsJson = responseJson.components as JSONObject

  // initialize api
  const api: Api = {
    path: apiJson.path as string,
    title: apiJson.title as string,
    description: apiJson.description as string,
    mainComponentName: responseJson.name as string,
    classType: apiJson.classType as string,
    classSubType: apiJson.classSubType as string,
    components: {},
  }
  // console.log(`Parsing api: ${api.path}`)
  // console.log(`\t${api.mainComponentName}`)
  // initialize components
  for (const componentName in componentsJson) {
    api.components[componentName] = {
      name: componentName,
      properties: [],
    }
  }

  // parse components
  for (const componentName in componentsJson) {
    parseComponent(componentName, componentsJson[componentName] as JSONObject, api)
  }

  return api
}

function parseComponent(componentName: string, componentJson: JSONObject, api: Api) {
  const component = api.components[componentName]
  if (component === undefined) {
    throw Error(`Unexpected component: ${componentName}`)
  }
  if (componentJson.type !== 'object') {
    throw Error(`Type of component "${componentName}" is not "object": ${componentJson}`)
  }
  const properties = componentJson.properties as JSONObject
  for (const propertyName in properties) {
    component.properties.push(
      parseProperty(propertyName, properties[propertyName] as JSONObject, api)
    )
  }
}

function parseProperty(propertyName: string, propertyJson: JSONObject, api: Api): Property {
  const format = propertyJson.format as string
  let type: PropertyType | undefined
  let array = false
  switch (propertyJson.type) {
    case 'string':
    case 'boolean':
      type = propertyJson.type
      break
    case 'number':
    case 'integer':
      if (format === 'float') {
        type = 'number'
      } else {
        type = 'number | string'
      }
      break
    case 'object':
      type = 'unknown'
      break
    case 'array':
      type = getArrayType(propertyJson, api)
      array = true
      break
    case undefined:
      type = api.components[getComponentName(propertyJson['$ref'] as string)]
      break
    default:
      throw Error(`Unexpected property type for ${propertyName}: ${JSON.stringify(propertyJson)}`)
  }
  if (!type) {
    throw Error(`Can't parse property: ${propertyJson}`)
  }
  return {
    name: propertyName,
    type: type,
    description: propertyJson.description as string,
    array: array,
    format: format,
  }
}

function getArrayType(propertyJson: JSONObject, api: Api): PropertyType {
  const items = (propertyJson.items as JSONObject).items as JSONObject
  if (items['$ref']) {
    const component = api.components[getComponentName(items['$ref'] as string)]
    if (!component) {
      throw Error(`Can't find component: ${items['$ref']}`)
    }
    return component
  }
  switch (items.type) {
    case 'boolean':
    case 'number':
    case 'string':
      return items.type as PropertyType
    case 'integer':
      return 'number | string'
    case 'object':
      return 'unknown'
  }
  throw Error(`Can't figure out array type: ${JSON.stringify(propertyJson)}`)
}

function getComponentName(ref: string): string {
  const componentName = ref.split('/').at(-1)
  if (!componentName) {
    throw Error(`Can't figure out component name: ${ref}`)
  }
  return componentName
}
