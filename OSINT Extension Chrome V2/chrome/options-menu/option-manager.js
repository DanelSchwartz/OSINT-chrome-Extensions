// ... (other functions as before)

// Add custom URL and its name to the custom_added_searches select element
function add_custom_url() {
  var customName = document.getElementById('custom_name').value.trim();
  var customURL = document.getElementById('custom_url').value.trim();

  if (!customName || !customURL) {
    console.error("Both URL and name are required.");
    return;
  }

  if (!isValidKey(customName)) {
    console.error("Invalid custom name. It should only contain alphanumeric characters and underscores.");
    return;
  }

  if (!isValidURL(customURL)) {
    console.error("Invalid custom URL format.");
    return;
  }

  var customId = customName.toLowerCase();

  // Retrieve the existing custom URLs from chrome.storage.sync
  chrome.storage.sync.get({ custom_urls: {} }, function (data) {
    var customUrls = data.custom_urls;
    customUrls[customId] = customURL;

    // Save the updated custom URLs back to chrome.storage.sync
    chrome.storage.sync.set({ custom_urls: customUrls }, function () {
      // Update custom_added_searches select element
      var customAddedSearches = document.getElementById('custom_added_searches');
      var customOption = document.createElement('option');
      customOption.value = customId;
      customOption.textContent = customName;
      customOption.selected = true;
      customAddedSearches.appendChild(customOption);

      // Clear input fields
      document.getElementById('custom_name').value = '';
      document.getElementById('custom_url').value = '';

      // Save the updated options
      save_options();
    });
  });
}

// ... (other functions as before)
