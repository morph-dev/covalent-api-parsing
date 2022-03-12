import { Api } from './model'
import { componentToString } from './printing'

type ComponentVersion = {
  stringValue: string
  count: number
  apis: Api[]
}

type ComponentSummary = {
  componentName: string
  count: number
  versions: Record<string, ComponentVersion>
}

export function getComponentSummaries(apis: Api[]): Record<string, ComponentSummary> {
  const allComponents: Record<string, ComponentSummary> = {}
  for (const api of apis) {
    for (const component of Object.values(api.components)) {
      if (component.name in allComponents) {
        allComponents[component.name].count++
      } else {
        allComponents[component.name] = {
          componentName: component.name,
          count: 1,
          versions: {},
        }
      }
      // versions
      const stringValue = componentToString(component)
      const versions = allComponents[component.name].versions
      if (stringValue in versions) {
        versions[stringValue].count++
        versions[stringValue].apis.push(api)
      } else {
        versions[stringValue] = {
          stringValue: stringValue,
          count: 1,
          apis: [api],
        }
      }
    }
  }
  return allComponents
}
