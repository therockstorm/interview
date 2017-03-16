// Problem:  Build a method named 'xmlSimple' whose
// main responsibility is to convert a string of xml
// to a hash structure.
let str = '';
str += '<xml>';
str += '  <p></p>';
str += '  <div>';
str += '    <p></p>';
str += '  </div>';
str += '  <span></span>';
str += '</xml>';

const expected = {
  xml: {
    p: {},
    div: {
      p: {}
    },
    span: {}
  }
};

const TOKEN_TYPES = {
  START_TOKEN: 'start_token',
  END_TOKEN: 'end_token',
  // ATTRIBUTE_TOKEN: 'attribute_token',
  // VALUE_TOKEN: 'value_token',
  // NODE: 'node',
};

function tokenize() {
  return [
    { value: 'xml', token_type: TOKEN_TYPES.START_TOKEN },
    { value: 'p', token_type: TOKEN_TYPES.START_TOKEN },
    { value: 'p', token_type: TOKEN_TYPES.END_TOKEN },
    { value: 'div', token_type: TOKEN_TYPES.START_TOKEN },
    { value: 'p', token_type: TOKEN_TYPES.START_TOKEN },
    { value: 'p', token_type: TOKEN_TYPES.END_TOKEN },
    { value: 'div', token_type: TOKEN_TYPES.END_TOKEN },
    { value: 'span', token_type: TOKEN_TYPES.START_TOKEN },
    { value: 'span', token_type: TOKEN_TYPES.END_TOKEN },
    { value: 'xml', token_type: TOKEN_TYPES.END_TOKEN },
  ];
}

/*
const xmlSimple = (s) => {
  const tokenized = tokenize(s);
  const stack = [];

  const retHash = {};
  for (let i = 0; i < tokenized.length; i++) {
    if (tokenized[i].token_type === TOKEN_TYPES.START_TOKEN) {
      stack.push({ val: tokenized[i].value, obj: {} });
    } else {
      const curr = stack.pop();
      if (stack.length > 0) {
        const prev = stack.pop();
        prev.obj[curr.val] = curr.obj;
        stack.push(prev);
      } else {
        retHash[curr.val] = curr.obj;
      }
    }
  }

  return retHash;
};
*/

const xmlSimple = (s) => {
  const stack = [];
  const retHash = {};

  tokenize(s).forEach((t) => {
    if (t.token_type === TOKEN_TYPES.START_TOKEN) stack.push({ val: t.value, obj: {} });
    else {
      const curr = stack.pop();
      if (stack.length === 0) retHash[curr.val] = curr.obj;
      else {
        const prev = stack.pop();
        prev.obj[curr.val] = curr.obj;
        stack.push(prev);
      }
    }
  });

  return retHash;
};

const results = xmlSimple(str);

console.log('expected:');
console.log(expected);
console.log('');

console.log('got: ');
console.log(results);
console.log('');
