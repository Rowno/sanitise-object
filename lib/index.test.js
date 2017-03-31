import test from 'ava'
import sanitiseObject from './index'

test('should sanitise keys', t => {
  const input = {
    username: 'batou',
    password: 'major',
    friend: 'tachikoma'
  }
  const output = {
    username: 'batou'
  }
  sanitiseObject(input, ['password', 'friend'])
  t.deepEqual(input, output)
})

test('should use defaults', t => {
  const input = {
    username: 'batou',
    password: 'major'
  }
  const output = {
    username: 'batou'
  }
  sanitiseObject(input)
  t.deepEqual(input, output)
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
  sanitiseObject(input, ['password'])
  t.deepEqual(input, output)
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
  sanitiseObject(input, ['password'])
  t.deepEqual(input, output)
})

test('should do partial matches', t => {
  const input = {
    username: 'batou',
    apikey: 'major'
  }
  const output = {
    username: 'batou'
  }
  sanitiseObject(input, ['key'])
  t.deepEqual(input, output)
})

test('should be case insensitive', t => {
  const input = {
    username: 'batou',
    pAsSwOrD: 'major'
  }
  const output = {
    username: 'batou'
  }
  sanitiseObject(input, ['password'])
  t.deepEqual(input, output)
})
