import jsonFile from '../schemas/schemas.json'
import configJson from '../config.json'
import minimist from 'minimist'
import fs from 'fs'

import { Api, JSONObject } from './model'
import { parseApi } from './parsing'
import { writeApi, writeCommonComponents } from './printing'
import { printSummaries } from './summary'

export function writeToFiles(apis: Api[], force: boolean): boolean {
  const apisToWrite = [] as [Api, string][]
  // prepare Apis to write
  for (const apiConfig of configJson.apis) {
    const api = apis.find((api) => api.path == apiConfig.path)
    if (api === undefined) {
      console.error(`Can't find api with path ${apiConfig.path}`)
      return false
    }
    const componentName: string = apiConfig.componentName
      ? apiConfig.componentName
      : api.mainComponentName

    // If not force, check that componentName is not default of some other api
    if (!force) {
      const duplicateApis = apis.filter(
        (api_filter) => api !== api_filter && api_filter.mainComponentName === componentName
      )
      if (duplicateApis.length > 0) {
        console.error(
          `Api "${apiConfig.path}" is supposted to be written with "${componentName}" as main component`
        )
        console.error(
          `This is not recommended because following apis have that component as their main!`
        )
        console.table(duplicateApis.map((duplicateApi) => duplicateApi.path))
        console.error(`If you really want to write it like this, use --force`)
        return false
      }
    }
    apisToWrite.push([api, componentName])
  }
  // Check for duplicates for writting
  if (apisToWrite.map(([, name]) => name).some((name, index, all) => index != all.indexOf(name))) {
    console.error(`Multiple APIs with the same main component name to write.`)
    console.table(
      apisToWrite
        .map(([api, componentName]) => {
          return {
            componentName: componentName,
            path: api.path,
          }
        })
        .sort()
    )
    return false
  }

  // deleting existing content (if any)
  if (fs.existsSync(configJson.outDir)) {
    console.warn(`Deleting content of "${configJson.outDir}"`)
    fs.rmSync(configJson.outDir, { recursive: true })
  }
  // common components
  writeCommonComponents(apis)
  // write Apis
  for (const [api, componentName] of apisToWrite) {
    writeApi(api, componentName)
  }
  return true
}

function main() {
  // Parse command line flags
  const argv = minimist(process.argv.slice(2), {
    string: ['component'],
    boolean: ['filterDexSpecific', 'force'],
    unknown: (flag) => {
      if (['list', 'summary'].includes(flag)) {
        return true
      }
      console.error(`Unexpected flag: ${flag}`)
      process.exit(1)
    },
  })

  // Parse JSON
  const json = jsonFile as unknown as JSONObject[]
  let apis = json.map(parseApi).sort((a, b) => a.path.localeCompare(b.path))

  // Filter filterDexSpecific APIs
  if (argv['filterDexSpecific']) {
    // filter Class B, non xy=k
    console.log('Filtering dex specific Api-s.')
    apis = apis.filter((api) => {
      if (api.classType === 'Class B' && api.classSubType !== 'xy=k') {
        console.log(`Removing ${api.mainComponentName} ${api.path}`)
        return false
      }
      return true
    })
    console.log()
  }

  // Print summary and ext
  if (argv._.includes('list')) {
    apis
      .map((api) =>
        [
          api.path,
          api.title,
          api.description,
          `class: ${api.classType}${api.classSubType && ` (subclass: ${api.classSubType})`}`,
          `main component: ${api.mainComponentName}`,
          '',
        ].join('\n\t')
      )
      .forEach((s) => console.log(s))
    return
  }

  // Print summary and ext
  if (argv._.includes('summary')) {
    printSummaries(apis, argv['component'] as string)
    return
  }

  // Write APIs to files
  if (writeToFiles(apis, !!argv['force'])) {
    process.exit(1)
  }
}

main()
