const fs = require('fs');
const inputFile = 'example.txt'
// Define file paths

const outputFile = 'output.txt'

// Read the content of the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading input file:', err)
    return
  }

  // Modify the content (for example, convert to uppercase)
  const modifiedContent = data.toUpperCase();

  // Write the modified content to the output file
  fs.writeFile(outputFile, modifiedContent, 'utf8', err => {
    if (err) {
      console.error('Error writing output file:', err);
      return;
    }
    console.log('Successfully wrote modified content to', outputFile);
  });
});
