import test from 'ava'
import sanitiseObject from '.'

test('should sanitise keys', t => {
  const input = {
    username: 'batou',
    password: 'major',
    friend: 'tachikoma'
  }
  const output = {
    username: 'batou'
  }
  t.deepEqual(sanitiseObject(input, ['password', 'friend']), output)
})

test('should use defaults', t => {
  const input = {
    username: 'batou',
    password: 'major'
  }
  const output = {
    username: 'batou'
  }
  t.deepEqual(sanitiseObject(input), output)
})

test('should sanitise nested objects', t => {
  const input = {
    username: 'batou',
    password: 'major',
    friend: {
      name: 'tachikoma',
      password: 'thinktank'
    }
  }
  const output = {
    username: 'batou',
    friend: {
      name: 'tachikoma'
    }
  }
  t.deepEqual(sanitiseObject(input, ['password']), output)
})

test('should sanitise nested arrays', t => {
  const input = {
    username: 'batou',
    password: 'major',
    friends: [{
      name: 'tachikoma',
      password: 'thinktank'
    }]
  }
  const output = {
    username: 'batou',
    friends: [{
      name: 'tachikoma'
    }]
  }
  t.deepEqual(sanitiseObject(input, ['password']), output)
})

test('should do partial matches', t => {
  const input = {
    username: 'batou',
    apikey: 'major'
  }
  const output = {
    username: 'batou'
  }
  t.deepEqual(sanitiseObject(input, ['key']), output)
})

test('should be case insensitive', t => {
  const input = {
    username: 'batou',
    pAsSwOrD: 'major'
  }
  const output = {
    username: 'batou'
  }
  t.deepEqual(sanitiseObject(input, ['password']), output)
})

test('should be immutable', t => {
  const input = {
    username: 'batou',
    password: 'major',
    friend: {
      name: 'tachikoma',
      password: 'thinktank'
    }
  }
  const output = sanitiseObject(input)

  t.not(output, input)

  t.deepEqual(input, {
    username: 'batou',
    password: 'major',
    friend: {
      name: 'tachikoma',
      password: 'thinktank'
    }
  })
})

test('should handle nulls', t => {
  const input1 = null
  const output1 = null
  t.deepEqual(sanitiseObject(input1), output1)

  const input2 = {
    username: null,
    password: null,
    friend: {
      name: null,
      password: null
    }
  }
  const output2 = {
    username: null,
    friend: {
      name: null
    }
  }
  t.deepEqual(sanitiseObject(input2), output2)
})
