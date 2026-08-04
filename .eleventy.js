import markdownIt from "markdown-it";

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./public");
  eleventyConfig.addPassthroughCopy("./admin");
  eleventyConfig.addPassthroughCopy("./public/robot.txt");
  eleventyConfig.addPassthroughCopy("./public/sitemap.xml");

  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: data => {
      const slug = data.page.fileSlug;

      if (slug === "home") {
        return "/";
      }

      return data.permalink || `/${slug}/`;
    }
  });

  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content || "");
  });

  eleventyConfig.addNunjucksGlobal("uuid", () => crypto.randomUUID());

  eleventyConfig.addFilter("driveImg", (content) => {
    if (!content.includes("drive.google.com")) return content;
    const id = content.replace('https://drive.google.com/file/d/', '').replace('/view?usp=sharing', '');
    return `https://lh3.googleusercontent.com/d/${id}`

  });

  eleventyConfig.addFilter("groupedButtons", (content) => {
    const newSections = [];
    let newButtons = [];

    for (let i = 0; i < content.length; i++) {
      const curr = content[i];
      const next = content[i + 1];


      if (curr.type == "button") newButtons.push(curr);
      if (curr.type != "button") newSections.push(curr);

      if (next?.type != "button" && newButtons.length) {
        newSections.push({ type: "button-group", sections: newButtons });
        newButtons = [];
      }
    }

    return newSections;
  });

  eleventyConfig.addFilter("log", (blocks) => {
    console.log(blocks)
    return blocks
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
    templateFormats: ["html", "md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};

