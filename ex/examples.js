// /////////////////////////////////////////////////////////
const runSocks = () => {
  const c = [10, 20, 20, 10, 10, 30, 50, 10, 20];

  const colorCnt = c.reduce((acc, cur) => {
    if (acc[cur]) acc[cur] += 1;
    else acc[cur] = 1;
    return acc;
  }, {});

  console.log(Object.values(colorCnt)
    .reduce((acc, cur) => (acc += Math.floor(cur / 2)), 0));
};

module.exports = runSocks;
runSocks();

// /////////////////////////////////////////////////////////
const runPangram = (input) => {
  const lower = input.toLowerCase();
  const codes = new Set();
  Array.from(Array(26)).map((e, i) => codes.add(i + 97));

  for (const c of lower) {
    const val = c.charCodeAt(0);
    if (codes.has(val)) codes.delete(val);
    if (codes.size === 0) {
      console.log('pangram');
      return;
    }
  }

  console.log('not pangram');
};

module.exports = runPangram;
runPangram('We promptly judged antique ivory buckles for the next prize');

// /////////////////////////////////////////////////////////
const runSos = (input) => {
  const o = 79;
  const s = 83;
  const chunks = input.match(/.{1,3}/g);

  let altered = 0;
  for (const chunk of chunks) {
    if (chunk[0].charCodeAt(0) !== s) altered += 1;
    if (chunk[1].charCodeAt(0) !== o) altered += 1;
    if (chunk[2].charCodeAt(0) !== s) altered += 1;
  }

  console.log(altered);
};

module.exports = runSos;
runSos('SOSSOT');

// /////////////////////////////////////////////////////////
// it('says yo', () => {
//   const stub = sinon.stub(new Interview());
//   stub.hi.returns('Yo');

//   assert.equal(stub.hi(), 'Yo');
// });

// /////////////////////////////////////////////////////////
const toUnicode = (key) => {
  let str = '';
  for (let i = 0; i < key.length; i++) {
    const u = `000${key.charCodeAt(i).toString(16).toUpperCase()}`.slice(-4);
    str += `\\u${u}`;
  }
  return str;
};
