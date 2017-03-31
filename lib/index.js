'use strict'
const DEFAULT_KEYWORDS = ['password', 'secret', 'key', 'token']

function sanitiseObject(input, keywords = DEFAULT_KEYWORDS) {
  for (const key of Object.keys(input)) {
    if (typeof input[key] === 'object') {
      sanitiseObject(input[key])
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

module.exports = sanitiseObject
