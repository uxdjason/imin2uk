module.exports = function(eleventyConfig) {
  // Pass through CSS, JS, and Images direct to _site
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  // Also pass through fonts if they exist
  eleventyConfig.addPassthroughCopy("fonts");

  // Date formatting filter
  // Usage: {{ date | date('YYYY-MM-DD') }} or {{ date | date('DD-MM-YYYY HH:mm') }}
  eleventyConfig.addFilter("date", function(value, format) {
    const d = new Date(value);
    if (isNaN(d)) return value;
    const pad = (n) => String(n).padStart(2, '0');
    const YYYY = d.getUTCFullYear();
    const MM = pad(d.getUTCMonth() + 1);
    const DD = pad(d.getUTCDate());
    const HH = pad(d.getUTCHours());
    const mm = pad(d.getUTCMinutes());
    return format
      .replace('YYYY', YYYY)
      .replace('MM', MM)
      .replace('DD', DD)
      .replace('HH', HH)
      .replace('mm', mm);
  });

  // Prevent clean URLs (folders) from breaking relative asset paths
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) => `${data.page.filePathStem}.html`;
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    // Allows us to use Nunjucks naturally
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
