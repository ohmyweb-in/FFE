// The News page's StayUpdated, with its ids moved to this page's prefix.
module.exports = JSON.parse(JSON.stringify(require("../news/stay-updated.js")).replaceAll("nw-stay", "na-stay"));
