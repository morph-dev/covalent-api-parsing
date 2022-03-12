import { Component, Property } from './model'

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
