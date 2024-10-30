const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
  // Base case: if it's a Text node, modify the text content
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    // Check for matches in the text content and replace based on MATCH_LIST
    Object.keys(MATCH_LIST).forEach(key => {
      let regex = new RegExp(`\\b${key}\\b`, 'g'); // Match exact words
      text = text.replace(regex, MATCH_LIST[key]);
    });
    node.textContent = text;
  }
  
  // Recursive case: if it's an Element node, recursively process child nodes
  else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
    for (let child of node.childNodes) {
      transformTextNodes(child);
    }
  }
}

// Start the transformation on the document body
transformTextNodes(document.body);

// Log to check that the extension loaded successfully
console.log('Evil extension loaded and executed!');
