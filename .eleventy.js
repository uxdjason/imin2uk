module.exports = function(eleventyConfig) {
  // Pass through CSS, JS, and Images direct to _site
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  // Also pass through fonts if they exist
  eleventyConfig.addPassthroughCopy("fonts");

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
