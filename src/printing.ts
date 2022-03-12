import { Api, Component, Property } from './model'
import * as fs from 'fs'

function getPath(filename: string): string {
  fs.mkdirSync('out', { recursive: true })
  return `./out/${filename}`
}

export function writeCommonComponents(
  apis: Api[],
  commonComponentNames: string[],
  filename = 'common.ts'
) {
  const commonComponents: Record<string, Api[]> = {}
  for (const name of commonComponentNames) {
    commonComponents[name] = apis.filter((api) => name in api.components)
  }

  const commonComponenStrings = Object.entries(commonComponents).map(([name, componentApis]) => {
    // header
    const topLevelApis = componentApis.filter((api) => api.mainComponentName === name)
    if (topLevelApis.length > 1) {
      throw Error(`Common component ${name} is top level for more than one API!`)
    }
    let header = ''
    if (topLevelApis.length === 1) {
      header = getHeaderString(topLevelApis[0])
    }
    // check component exists and unique
    const componentStrings = componentApis.map((api) => componentToString(api.components[name]))
    if (componentStrings.length === 0) {
      throw Error(`No Apis found for component ${name}`)
    }
    if (componentStrings.some((s) => s !== componentStrings[0])) {
      throw Error(`Multiple versions of component ${name}`)
    }
    return header + componentStrings[0]
  })
  const path = getPath(filename)
  console.log(`Writing common components to ${path}`)
  fs.writeFileSync(path, commonComponenStrings.join('\n'))
}

export function writeApi(
  api: Api,
  commonComponentNames: string[],
  filename?: string,
  commonFilename = 'common.ts'
) {
  if (filename === undefined) {
    filename = `${api.mainComponentName}.ts`
  }
  if (commonFilename.endsWith('.ts')) {
    commonFilename = commonFilename.slice(0, -3)
  }

  const sections = [] as string[]

  const components = new Map(Object.entries(api.components))

  // common components
  const commonComponentsUsed = [] as string[]
  for (const commonComponentName of commonComponentNames) {
    if (components.has(commonComponentName)) {
      commonComponentsUsed.push(commonComponentName)
      components.delete(commonComponentName)
    }
  }
  // import
  if (commonComponentsUsed.length > 0) {
    commonComponentsUsed.sort()
    sections.push(`import { ${commonComponentsUsed.join(', ')} } from './${commonFilename}'\n`)
  }

  // mainComponent
  const mainComponent = components.get(api.mainComponentName)
  if (mainComponent === undefined) {
    throw Error(`Main component ${api.mainComponentName} not found!`)
  }
  sections.push(getHeaderString(api) + componentToString(mainComponent))
  components.delete(api.mainComponentName)

  sections.push(...Array.from(components.values()).map(componentToString))

  const path = getPath(filename)
  console.log(`Writing api to ${path}`)
  fs.writeFileSync(path, sections.join('\n'))
}

function getHeaderString(api: Api): string {
  return [
    `/**`,
    ` * ${api.title}`,
    ` *`,
    ` * ${api.description}`,
    ` *`,
    ` * Path: \`${api.path}\``,
    ` */\n`,
  ].join('\n')
}

export function componentToString(component: Component): string {
  const lines = []
  lines.push(`export type ${component.name} = {\n`)
  lines.push(...component.properties.map(propertyToString))
  lines.push(`}\n`)
  return lines.join('')
}

function propertyToString(property: Property): string {
  let type = typeof property.type === 'string' ? property.type : property.type.name
  if (property.array) {
    type += '[]'
  }

  const description: string[] = []
  if (property.description) {
    description.push(property.description)
  }
  if (property.format) {
    description.push(`(format: ${property.format})`)
  }

  const lines: string[] = []
  if (description.length > 0) {
    lines.push(`  /** ${description.join(' ')} */\n`)
  }
  lines.push(`  ${property.name}: ${type}\n`)
  return lines.join('')
}
