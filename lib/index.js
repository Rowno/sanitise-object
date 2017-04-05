'use strict'
const cloneDeep = require('lodash.clonedeep')
const isObject = require('lodash.isobject')

const DEFAULT_KEYWORDS = ['password', 'secret', 'key', 'token']

function sanitiseObject(input, keywords = DEFAULT_KEYWORDS) {
  const clonedInput = cloneDeep(input)

  if (!isObject(clonedInput)) {
    return clonedInput
  }

  return sanitise(clonedInput, keywords)
}
module.exports = sanitiseObject

function sanitise(input, keywords) {
  for (const key of Object.keys(input)) {
    if (isObject(input[key])) {
      sanitise(input[key], keywords)
    } else {
      const keyLower = key.toLowerCase()
      for (const keyword of keywords) {
        if (keyLower.includes(keyword)) {
          delete input[key]
        }
      }
    }
  }

  return input
}
