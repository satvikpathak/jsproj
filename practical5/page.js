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
  // Check if the node is a text node
  if (node.nodeType === Node.TEXT_NODE) {
      // Create a regular expression to match the words in the MATCH_LIST
      const regex = new RegExp(\\b(${Object.keys(MATCH_LIST).join('|')})\\b, 'g');
      
      // Replace matching words using the MATCH_LIST
      node.textContent = node.textContent.replace(regex, (match) => {
          return MATCH_LIST[match];
      });
  } else if (node.nodeType === Node.ELEMENT_NODE) {
      // If it's an element node, recursively process each child node
      node.childNodes.forEach(child => transformTextNodes(child));
  }
}

// Initial call to the function to transform text nodes in the body
transformTextNodes(document.body);

// Log statement to test that the extension loaded properly
console.log('Evil extension loaded!');