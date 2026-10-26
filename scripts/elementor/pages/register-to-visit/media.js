// page.tsx: <MediaEnquiries className="mt-[24px] w-[min(1360px,100%-2*var(--gutter))]" />, the News bar at row width.
const { P0, mtAuto } = require("../../lib.js");
module.exports = require("../news/media-enquiries.js").make("rv", 1360, [{ padding: P0, margin: mtAuto(24), display: "block" }, {}]);
