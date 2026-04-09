module.exports = function(eleventyConfig) {
  // Pass through CSS, JS, and Images direct to _site
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  // Also pass through fonts and robots.txt
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("robots.txt");

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

  // Excerpt filter: strips HTML tags and returns first sentence from content
  eleventyConfig.addFilter("excerpt", function(content) {
    if (!content) return '';
    // Remove all HTML tags
    const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    // Find first sentence ending with . ! or ? (at least 20 chars)
    const match = text.match(/[^.!?]{20,}[.!?]/);
    if (match) return match[0].trim();
    // Fallback: first 120 chars
    return text.substring(0, 120).trim() + (text.length > 120 ? '\u2026' : '');
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
