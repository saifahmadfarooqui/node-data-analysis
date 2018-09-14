const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('crimes.csv');
const outstream = new Stream();
const rl = readline.createInterface(instream, outstream);

const finalData = [];

const storeBugglary = {};
const storeRobbery = {};

rl.on('line', (line) => {
  const res = line.replace(/, /g, ' ');
  const temp = res.split(',', 20);
  const x = temp[17];

  if (line.search('BURGLARY') !== -1) {
    if (Object.prototype.hasOwnProperty.call(storeBugglary, x)) {
      storeBugglary[x] += 1;
    } else {
      storeBugglary[x] = 1;
    }
  }
  if (line.search('ROBBERY') !== -1) {
    if (Object.prototype.hasOwnProperty.call(storeRobbery, x)) {
      storeRobbery[x] += 1;
    } else {
      storeRobbery[x] = 1;
    }
  }
});

rl.on('close', () => {
  for (let i = 0, keys = Object.keys(storeRobbery), ii = keys.length; i < ii; i += 1) {
    const store = {
      Year: 0,
      Robbery: '',
      Burglary: '',
    };
    store.Year = keys[i];
    store.Robbery = storeRobbery[keys[i]];
    store.Burglary = storeBugglary[keys[i]];
    finalData.push(store);
  }

  const store = {};
  store.CrimeData = finalData;
  const wr = fs.createWriteStream('all.json');
  wr.write(JSON.stringify(store));
});
