This project parses Covalent API JSON file and creates typescript types for desired apis.

# CAUTION: Types in the JSON might not match real types.

At the moment of writting, there is at least one api that is completely wrong.

# How to use

Program will read and parse entire file (all apis and their components).

## Global flags

These flags are always available

* `--filterDexSpecific`: Filters api-s that are specific for certain Dexes (uniswap, sushiswap, ...)
  * These have quite a bit of duplicate components that are not exactly the same, which can cause issues
  * **Recommended** unless those are required
  * All from `Class B` except `dx==k`

## Create types

To create files, update `config.json` and run `yarn start`.

### Configure Config.json

Explanation of the fields:

* `outDir`: Directory where files will be written
  * Will be deleted before trying to write anything
* `commonComponents`: List of components to be written to `commonFile`
  * Other files will import these when needed
* `commonFile`: Name of the file where `commonComponents` should be written
* `apis`: List of apis to be written to files.
  * Each API will be written to different file, together with their non-common components
  * Each API specifies the **main** component, which is used as filename
  * Properties:
    * `path`: API path
    * `componentName`: If non-empty it overrides the **main** component. This is sometimes
    required because some of them are non-unique and sometimes desired because default
    names might be unclear.

### Additional flags

* `--force`: It's not recommended to use component name for some api, if that component name is
main component for some other api

## Listing API-s

`yarn start list` can be used for printing summary of the API-s.

## Printing Summary

Instead of writting file, API and Components can be inspected by running:

`yarn start summary`

This will always print a table of Components and their short summary:

* component name
* in how many apis are they used
* how many different versions there are with the same name

One of the following options can be used for additional print:

* `--component <componentName>`: Prints more details regarding API-s where specified component is used
  * version of this component (useful if there are multiple)
  * api path
  * whether specified component is the main component of this api
  * the main component of the api
  * api class
* `--component all`: Same as above, but it prints it for all components

# How Covalent API JSON file is obtained

Steps for obtaining file:

1. Inspect https://www.covalenthq.com/docs/api/ page
2. Locate `<body><scripts>` and there should be `window.openAPICache` field
3. Copy it's value into some more powerful editor (e.g. VSCode)
4. Save as `.json`
5. Format and save again