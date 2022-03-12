import jsonFile from '../schemas/schemas.json'

import { Api, JSONObject } from './model'
import { parseApi } from './parsing'
import { writeApi, writeCommonComponents } from './printing'
import { getComponentSummaries } from './summary'

export function printSummaries(apis: Api[], single_version = true) {
  if (single_version) {
    console.log('Printing only single versions!')
    console.log('count\ttoplevel\tname')
    console.log('\t\t\ttoplevelpath')
    console.log('-'.repeat(100))
  } else {
    console.log('Printing only non-single versions!')
    console.log('count\tversions\tname')
    console.log('\t\tv_count\tpath')
    console.log('-'.repeat(100))
  }

  const summaries = Object.values(getComponentSummaries(apis))
  summaries.sort((a, b) => {
    if (a.count != b.count) {
      return b.count - a.count
    }
    return Object.keys(b.versions).length - Object.keys(a.versions).length
  })
  for (const summary of summaries) {
    const name = summary.componentName
    const versions = Object.values(summary.versions)
    if (single_version && versions.length == 1) {
      const topLevelApis = versions[0].apis.filter((api) => name === api.mainComponentName)
      console.log(`${summary.count}\t${topLevelApis.length}\t${name}`)
      topLevelApis.map((api) => console.log(`\t\t\t${api.path}`))
    } else if (!single_version && versions.length > 1) {
      console.log([summary.count, versions.length, name].join('\t'))
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
  console.log()
}

export function findDuplicateMainComponents(apis: Api[]) {
  const groupped: Record<string, Api[]> = {}
  for (const api of apis) {
    const name = api.mainComponentName
    if (!(name in groupped)) {
      groupped[name] = []
    }
    groupped[name].push(api)
  }

  for (const name in groupped) {
    if (groupped[name].length == 1) continue
    console.log(name)
    for (const api of groupped[name]) {
      console.log(`\t${api.path}`)
    }
    console.log()
  }
}

export function printToFile(apis: Api[], mainComponents: string[]) {
  // Single version, non-top
  const commonComponents = [
    'ContractMetadata',
    'Pagination',
    'UniswapToken',
    'UniswapTokenWithSupply',
    'UniswapV2BalanceItem',
  ]
  writeCommonComponents(apis, commonComponents, 'common.ts')
  for (const name of mainComponents) {
    const matchingApis = apis.filter((api) => api.mainComponentName === name)
    if (matchingApis.length > 1) {
      throw Error(`Multiple apis found for name ${name}`)
    }
    if (matchingApis.length === 0) {
      throw Error(`No apis found for name ${name}`)
    }
    const api = matchingApis[0]
    writeApi(api, commonComponents)
  }
}

const json = jsonFile as unknown as JSONObject[]
const apis = json.map(parseApi)

printSummaries(apis, true)
// findDuplicateMainComponents(apis)
printToFile(apis, ['AddressWithHistoricalPricesItem'])
