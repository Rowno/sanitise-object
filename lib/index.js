'use strict'
const cloneDeep = require('lodash.clonedeep')

const DEFAULT_KEYWORDS = ['password', 'secret', 'key', 'token']

function sanitiseObject(input, keywords = DEFAULT_KEYWORDS) {
  return sanitise(cloneDeep(input), keywords)
}
module.exports = sanitiseObject

function sanitise(input, keywords) {
  for (const key of Object.keys(input)) {
    if (typeof input[key] === 'object') {
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
