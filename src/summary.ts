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

export function printSummaries(apis: Api[], componentWithDetails?: string) {
  const summaries = Object.values(getComponentSummaries(apis))
  summaries.sort((a, b) => {
    if (a.count != b.count) {
      return b.count - a.count
    }
    return Object.keys(b.versions).length - Object.keys(a.versions).length
  })

  console.table(
    summaries.map((summary) => {
      return {
        name: summary.componentName,
        count: summary.count,
        'different versions': Object.keys(summary.versions).length,
      }
    })
  )

  if (componentWithDetails === undefined || componentWithDetails.length === 0) {
    return
  }

  let summariesToPrint = summaries
  if (componentWithDetails !== 'all') {
    summariesToPrint = summariesToPrint.filter(
      (summary) => summary.componentName === componentWithDetails
    )
  }
  if (summariesToPrint.length === 0) {
    throw Error(`Component ${componentWithDetails} not found!`)
  }

  for (const summary of summariesToPrint) {
    console.log(summary.componentName)
    console.table(
      Object.values(summary.versions).flatMap((componentVersion, index) => {
        return componentVersion.apis.map((api) => {
          return {
            version: index + 1,
            path: api.path,
            mainComponent: api.mainComponentName === summary.componentName,
            component: api.mainComponentName,
            class: `${api.classType}${api.classSubType && ` (subclass: ${api.classSubType})`}`,
          }
        })
      })
    )
    console.log()
  }
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
