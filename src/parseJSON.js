// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
let currentPosition;
var parseJSON = function(json) {
  //json = json.replace(/\s+/g, '');
  currentPosition = 0;
  //var parsed;

  //console.log(json[currentPosition]);
  if (json[currentPosition] === '[') {
    return parseArray(json);
  }

  if (json[currentPosition] === '{') {
    return parseObject(json);
  }

/*
  console.log(parsed);
  return parsed;
  */
};

var skipWhiteSpace = function(json) {
  while (json[currentPosition] === ' ') {
    currentPosition++;
  }
}

var parseArray = function(json) {
  const parsedArray = [];
  currentPosition++;
  skipWhiteSpace(json);
  if (json[currentPosition] === ']') {
    return parsedArray;
  }
  while (json[currentPosition] !== ']') {
    parsedArray.push(parseValue(json));
    if (json[currentPosition] === ',') {
      currentPosition++;
    }
    skipWhiteSpace(json);
  }
  return parsedArray;
};

var parseObject = function(json) {
  const parsedObj = {};
  currentPosition++;
  if (json[currentPosition] === '}') {
    return parsedObj;
  }
  while (json[currentPosition] !== '}') {
    skipWhiteSpace(json);
    if (json[currentPosition] !== '"') {
      console.log('current character: ' + json[currentPosition]);
      throw new SyntaxError('expected double quote');
    }
    let key = parseString(json);
    //console.log('key: ' + key);
    currentPosition++;
    skipWhiteSpace(json);
    if (json[currentPosition] !== ':') {
      console.log('current character: ' + json[currentPosition]);
      throw new SyntaxError('expected colon');
    }
    currentPosition++;
    skipWhiteSpace(json);
    let value = parseValue(json);
    //console.log('value: ' + value);
    parsedObj[key] = value;
    if (json[currentPosition] === ',') {
      currentPosition++;
    }
    skipWhiteSpace(json);
  }
  return parsedObj;
};

var parseString = function(json) {
  currentPosition++;
  let parsedString = '';
  skipWhiteSpace(json);
  while (json[currentPosition] !== '"') {
    if (json[currentPosition] !== '\\') {
      parsedString += json[currentPosition];
    } else {
      parsedString += json[++currentPosition];
    }
    currentPosition++;
  }
  return parsedString;
};

var parseValue = function(json) {
  let parsedValue = '';
  if (json[currentPosition] === '"') {
    parsedValue = parseString(json);
    currentPosition++;
    return parsedValue;
  }
  if (json[currentPosition] === '{') {
    parsedValue = parseObject(json);
    currentPosition++;
    return parsedValue;
  }
  if (json[currentPosition] === '[') {
    parsedValue = parseArray(json);
    currentPosition++;
    return parsedValue;
  }
  const delimiters = [',', ']', '}'];
  const booleanLookup = {'true': true, 'false': false};
  while (!delimiters.includes(json[currentPosition])) {
    parsedValue += json[currentPosition];
    currentPosition++;
    skipWhiteSpace(json);
  }
  if (!Number.isNaN(Number(parsedValue))) {
    return Number(parsedValue);
  }
  if (booleanLookup.hasOwnProperty(parsedValue)) {
    return booleanLookup[parsedValue];
  }
  if (parsedValue === 'null') {
    return null;
  }

  return undefined;
};

console.log(JSON.stringify(parseJSON('[]')));
console.log(JSON.stringify(parseJSON('{"foo": ""}')));
console.log(JSON.stringify(parseJSON('{}')));
console.log(JSON.stringify(parseJSON('{"foo": "bar"}')));
console.log(JSON.stringify(parseJSON('["one", "two"]')));
console.log(JSON.stringify(parseJSON('{"a": "b", "c": "d"}')));
console.log(JSON.stringify(parseJSON('[null,false,true]')));
console.log(JSON.stringify(parseJSON('{"foo": true, "bar": false, "baz": null}')));
console.log(JSON.stringify(parseJSON('[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]')));
console.log(JSON.stringify(parseJSON('{"boolean, true": true, "boolean, false": false, "null": null }')));
console.log(JSON.stringify(parseJSON('{"a":{"b":"c"}}')));
console.log(JSON.stringify(parseJSON('{"a":["b", "c"]}')));
console.log(JSON.stringify(parseJSON('[{"a":"b"}, {"c":"d"}]')));
console.log(JSON.stringify(parseJSON('{"a":[],"c": {}, "b": true}')));
console.log(JSON.stringify(parseJSON('[[[["foo"]]]]')));
console.log(JSON.stringify(parseJSON('["\\\\\\"\\"a\\""]')));  //should be "["\\\"\"a\""]"
console.log(JSON.stringify(parseJSON('["and you can\'t escape thi\s"]'))); //should be "["and you can't escape this"]"

let complexStr1 = '{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
  '"documentation":"A corelet that provides the capability to upload' +
  ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
  '{"documentation":"Displays a dialog box that allows user to ' +
  'select a folder on the local system.","name":' +
  '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
  'callback function for results.","name":"callback","required":' +
  'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
  ' in the folder provided.","name":"UploadFolder","parameters":' +
  '[{"documentation":"The path to upload mp3 files from."' +
  ',"name":"path","required":true,"type":"string"},{"documentation":' +
  ' "The callback function for progress.","name":"callback",' +
  '"required":true,"type":"callback"}]},{"documentation":"Returns' +
  ' the server name to the current locker service.",' +
  '"name":"GetLockerService","parameters":[]},{"documentation":' +
  '"Changes the name of the locker service.","name":"SetLockerSer' +
  'vice","parameters":[{"documentation":"The value of the locker' +
  ' service to set active.","name":"LockerService","required":true' +
  ',"type":"string"}]},{"documentation":"Downloads locker files to' +
  ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
  'documentation":"The origin path of the locker file.",' +
  '"name":"path","required":true,"type":"string"},{"documentation"' +
  ':"The Window destination path of the locker file.",' +
  '"name":"destination","required":true,"type":"integer"},{"docum' +
  'entation":"The callback function for progress.","name":' +
  '"callback","required":true,"type":"callback"}]}],' +
  '"name":"LockerUploader","version":{"major":0,' +
  '"micro":1,"minor":0},"versionString":"0.0.1"}';
console.log(JSON.stringify(parseJSON(complexStr1)));

let complexStr2 = '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
  '25, "address" : { "streetAddress": "21 2nd Street", ' +
  '"city" : "New York", "state" : "NY", "postalCode" : ' +
  ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
  '"number": "212 555-1234" }, { "type" : "fax", ' +
  '"number": "646 555-4567" } ] }';
console.log(JSON.stringify(parseJSON(complexStr2)));

let complexStr3 = '{\r\n' +
  '          "glossary": {\n' +
  '              "title": "example glossary",\n\r' +
  '      \t\t"GlossDiv": {\r\n' +
  '                  "title": "S",\r\n' +
  '      \t\t\t"GlossList": {\r\n' +
  '                      "GlossEntry": {\r\n' +
  '                          "ID": "SGML",\r\n' +
  '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
  '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
  'Markup Language",\r\n' +
  '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
  '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
  '      \t\t\t\t\t"GlossDef": {\r\n' +
  '                              "para": "A meta-markup language,' +
  ' used to create markup languages such as DocBook.",\r\n' +
  '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
  '                          },\r\n' +
  '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
  '                      }\r\n' +
  '                  }\r\n' +
  '              }\r\n' +
  '          }\r\n' +
  '      }\r\n';
console.log(JSON.stringify(parseJSON(complexStr3)));
