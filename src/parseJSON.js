// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var currentPosition = 0;
var parseJSON = function(json) {
  currentPosition = 0;
  var parsed;
  console.log('first character: ' + json[currentPosition]);

  if (json[currentPosition] === '[') {
    parsed = parseArray(json);
  } else if (json[currentPosition] === '{') {
    parsed = parseObject(json);
  }

  console.log(parsed);
  return parsed;
};

var parseArray = function(json) {
  json = json.replace(/\s+/g, '');
  var contents = '';
  currentPosition += 1;
  while (json[currentPosition] !== ']') {
    contents += json[currentPosition];
    currentPosition += 1;
  }
  if (contents.length === 0) {
    return [];
  }
  return [contents];
};

var parseObject = function(json) {
  console.log('parsing Object...');
  var parsedObj = {};
  currentPosition += 1;
  if (json[currentPosition] === '}') {
    return {};
  }
  if (json[currentPosition] !== '"') {
    throw new SyntaxError('expected double quote');
  }
  var key = '';
  currentPosition += 1;
  while (json[currentPosition] !== '"') {
    key += json[currentPosition];
    currentPosition++;
  }
  console.log('key: ' + key);
  currentPosition++;
  if (json[currentPosition] !== ':') {
    throw new SyntaxError('expected colon');
  }
  currentPosition++;
  var value = '';
  while (json[currentPosition] !== '}') {
    value += json[currentPosition];
    currentPosition++;
  }
console.log('value: ' + value);
  parsedObj[key] = value;
  return parsedObj;
};
