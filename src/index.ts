import jsonFile from '../schemas/schemas.json'

import { Api, JSONObject } from './model'
import { parseApi } from './parsing'
import { getComponentSummaries } from './summary'

function printSummaries(apis: Api[], include_single_version = false) {
  const summaries = Object.values(getComponentSummaries(apis))
  summaries.sort((a, b) => {
    if (a.count != b.count) {
      return b.count - a.count
    }
    return Object.keys(b.versions).length - Object.keys(a.versions).length
  })
  for (const summary of summaries) {
    const versions = Object.values(summary.versions)
    if (!include_single_version && versions.length == 1) {
      continue
    }
    console.log([summary.count, versions.length, summary.componentName].join('\t'))
    for (const version of versions) {
      console.log(
        [
          '',
          '',
          version.count,
          version.apis.map((api) => ` ${api.mainComponentName} ${api.path}`).join('\n\t\t\t'),
        ].join('\t')
      )
    }
  }
}

const json = jsonFile as unknown as JSONObject[]
const apis = json.map(parseApi)
printSummaries(apis)
