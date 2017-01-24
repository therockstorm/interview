const assert = require('chai').assert;
const it = require('mocha').it;
const run = require('./index.js');

it('run', () => {
  assert.isTrue(run());
});
