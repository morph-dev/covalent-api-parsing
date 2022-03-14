import configJson from '../config.json'
import { Api, Component, Property } from './model'
import * as fs from 'fs'

function getNoEditNotice(): string {
  return '// DO NOT EDIT - THIS FILE IS AUTO GENERATED\n// see README.md\n'
}

function getPath(filename: string): string {
  const directory = configJson.outDir
  fs.mkdirSync(directory, { recursive: true })
  return `${directory}/${filename}.ts`
}

export function writeCommonComponents(apis: Api[]) {
  const commonComponentNames: string[] = configJson.commonComponents
  const commonComponents: Record<string, Api[]> = {}
  for (const name of commonComponentNames) {
    commonComponents[name] = apis.filter((api) => name in api.components)
  }
  const noEditNotice = getNoEditNotice()

  const commonComponentStrings = Object.entries(commonComponents).map(([name, componentApis]) => {
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

  const path = getPath(configJson.commonFile)
  console.log(`Writing common components to "${path}"`)
  fs.writeFileSync(path, noEditNotice + '\n' + commonComponentStrings.join('\n'))
}

export function writeApi(api: Api, mainComponentName?: string) {
  const commonComponentNames: string[] = configJson.commonComponents

  const sections = [] as string[]

  const components = new Map(Object.entries(api.components))

  // no edit notice
  sections.push(getNoEditNotice())

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
    sections.push(
      `import { ${commonComponentsUsed.join(', ')} } from './${configJson.commonFile}'\n`
    )
  }

  // mainComponent
  let mainComponent = components.get(api.mainComponentName)
  if (mainComponent === undefined) {
    throw Error(`Main component ${api.mainComponentName} not found!`)
  }
  if (mainComponentName !== undefined) {
    if (mainComponentName.length > 0) {
      mainComponent = { ...mainComponent }
      mainComponent.name = mainComponentName
    }
  }
  sections.push(getHeaderString(api) + componentToString(mainComponent))
  components.delete(api.mainComponentName)

  sections.push(...Array.from(components.values()).map(componentToString))

  const path = getPath(`${mainComponent.name}`)
  console.log(`Writing api to "${path}"`)
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
  if (component.properties.length > 0) {
    lines.push(...component.properties.map(propertyToString))
  } else {
    lines.push('  [index: string]: undefined\n')
  }
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
