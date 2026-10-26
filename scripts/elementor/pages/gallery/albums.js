// One tile per album (cover = first photo), linking to its page.
const { ALBUMS, grid } = require("../g8-shared.js");
module.exports = [grid("gl", ALBUMS.map((a) => ({ thumb: `g8-${a.photos[0][0]}-thumb`, title: a.title, href: `/gallery/${a.slug}/` })))];
