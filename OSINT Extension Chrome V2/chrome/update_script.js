const fs = require("fs");

function updateScript(customURLs) {
  const scriptFilePath = "script.js";

  fs.readFile(scriptFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading script.js:", err);
      return;
    }

    const customURLContent = generateCustomURLContent(customURLs);
    const updatedContent = data.replace(
      /const osint_urls = {[\s\S]*?};/,
      `const osint_urls = {${customURLContent}};`
    );

    fs.writeFile(scriptFilePath, updatedContent, "utf8", (err) => {
      if (err) {
        console.error("Error updating script.js:", err);
      } else {
        console.log("script.js updated successfully!");
      }
    });
  });
}

function generateCustomURLContent(customURLs) {
  const customURLContentArray = Object.entries(customURLs).map(
    ([id, url]) => `\n  ${id}: \`${url}\`,`
  );

  return customURLContentArray.join("");
}

// Export the updateScript function to be used in the batch file
module.exports = updateScript;
