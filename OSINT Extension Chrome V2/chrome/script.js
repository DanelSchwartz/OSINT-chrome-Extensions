// Create the parent context menu item
var parentMenuId = chrome.contextMenus.create({
  title: "Reputation Site OSINT",
  id: "parent",
  contexts: ["selection"],
});

// Submenu items for each site
var subMenus = [
  { title: "abuseipdb", id: "abuseipdb", parentId: "parent" },
  { title: "hybridanalysis", id: "hybridanalysis", parentId: "parent" },
  { title: "ibmxforce", id: "ibmxforce", parentId: "parent" },
  { title: "ipinfo", id: "ipinfo", parentId: "parent" },
  { title: "shodan", id: "shodan", parentId: "parent" },
  { title: "virustotal", id: "virustotal", parentId: "parent" },
];

// Create the submenu items
for (const subMenu of subMenus) {
  chrome.contextMenus.create({
    title: subMenu.title,
    id: subMenu.id,
    parentId: subMenu.parentId,
    contexts: ["selection"],
    onclick: main,
  });
}

const osint_urls = {
  abuseipdb: `https://www.abuseipdb.com/check/`,
  hybridanalysis: `https://www.hybrid-analysis.com/search?query=`,
  ibmxforce: `https://exchange.xforce.ibmcloud.com/search/`,
  ipinfo: `https://ipinfo.io/`,
  shodan: `https://www.shodan.io/search?query=`,
  virustotal: `https://www.virustotal.com/gui/search/`,
};

function main(info, tab) {
  // get highlighted text
  var IOC = info.selectionText;

  // replace "[dot]" with "."
  IOC = IOC.replace(/\[dot\]/g, ".");

  // remove whitespace, quotes, brackets
  IOC = IOC.replace(/["'\[\] ]/g, "");

  // regex check if IOC is md5, sha1, sha256 hash
  var ishash = !IOC.search(/\b[A-Fa-f0-9]{32,64}\b/);

  // regex check if IOC is IPv4 address
  var isIP = !IOC.search(
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  );

  // Get the selected site from the context menu
  var selectedSite = info.menuItemId;

  // Check if selectedSite is a valid site from osint_urls
  if (osint_urls[selectedSite]) {
    // Open the selected site with the IOC as a query parameter
    chrome.windows.create({
      url: osint_urls[selectedSite] + IOC,
      incognito: false,
    });
  }
}
