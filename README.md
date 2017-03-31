# sanitise-object

[![Build Status](https://travis-ci.org/Rowno/sanitise-object.svg?branch=master)](https://travis-ci.org/Rowno/sanitise-object)
[![Dependency Status](https://david-dm.org/Rowno/sanitise-object/status.svg)](https://david-dm.org/Rowno/sanitise-object)

Recursively deletes properties from an object that match a list of keywords. Useful for removing user secrets from an object before logging it.


## Install

**Warning: Node.js 6 or higher is required.**
```bash
npm install --save sanitise-object
```

## Usage

```js
const sanitiseObject = require('sanitise-object')
const input = {
  username: 'batou',
  password: 'major',
  friend: {
    name: 'tachikoma',
    apikey: 'thinktank'
  }
}
const keywords = ['password', 'key']

sanitiseObject(input, keywords)
// {
//   username: 'batou',
//   friend: {
//     name: 'tachikoma'
//   }
// }
```

### API

#### sanitiseObject(input, [keywords])

Returns the `input` object with matching properties removed.
**Note: the `input` object is mutated.**

##### input

Type: `object`

##### keywords

Type: `array`<br>
Default: `['password', 'secret', 'key', 'token']`

List of keywords to match against. Properties are removed if a keyword appears anywhere in it's name. Matching is case insensitive.


## License

sanitise-object is released under the ISC license.

Copyright © 2017, Roland Warmerdam.
