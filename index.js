const {EventEmitter} = require('events');

const Resolver = new EventEmitter();

let initialized = false;
let client = null;

const keys = {
  a: 1,
  b: 2,
  c: 3
};

function getKey(key) {
  if (!client) {
    console.log('No client!');
  } else {
    return keys[key];
  }
}

function getClient() {
  return new Promise((resolve, reject) => {
    console.log('Resolving client');
    setTimeout(() => {
      console.log('Found client');
      client = 'client';
      resolve(client);
    }, 10000);
  });
}

async function findKey() {
  if (!initialized) {
    initialized = true;
    client = await getClient();
    Resolver.emit('resolve:init');
    const key = getKey('a');
    console.log(`Key is ${key}`);
  } else {
    console.log('Waiting');
    Resolver.on('resolve:init', () => {
      const key = getKey('b');
      console.log(`Key is ${key}`);
    });
  }
}

findKey()
findKey()
findKey()
findKey()
