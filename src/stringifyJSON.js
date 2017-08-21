// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var result = '';

  if (typeof obj === 'number') {
    result += obj;
  }

  if (obj === null) {
    result += 'null';
  }

  if (typeof obj === 'boolean') {
    result += String(obj);
  }

  if (typeof obj === 'string') {
    result += '"' + obj + '"';
  }

  if (Array.isArray(obj)) {
    result += '[';

    if (obj.length > 0) {
      obj.forEach(function(element) {
        result += stringifyJSON(element) + ',';
      });
    result = result.substring(0, result.length - 1);
    }
    result += ']';
  }

  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    result += '{';
    for (var key in obj) {
      if (typeof obj[key] === 'function' || typeof obj[key] === 'undefined') {
        continue;
      }
      result += '"' + key + '":';
      result += stringifyJSON(obj[key]) + ',';
    }
    result = result === '{' ? result : result.substring(0, result.length - 1);
    result += '}';
  }

  return result;
};
