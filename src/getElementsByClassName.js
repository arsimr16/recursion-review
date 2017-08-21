// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, element = document.body
) {
  //element = element || document.body;
  const elementsWithClassNameList = [];
  //console.log(element.classList);
  if (element.classList.length > 0 && element.classList.contains(className)) {
    //console.log(element.classList);
    elementsWithClassNameList.push(element);
  }
  if (element.childNodes.length > 0) {
    element.childNodes.forEach(function(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        elementsWithClassNameList.concat(getElementsByClassName(className, node));
      }
    });
  }
  return elementsWithClassNameList;
};

console.log('DEBUG: ' + getElementsByClassName('targetClassName'));
