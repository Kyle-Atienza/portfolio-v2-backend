const { Client } = require("@notionhq/client");
const moment = require("moment");
require("dotenv").config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getExperiences = async () => {
  const { results: workExperiences } = await notion.databases.query({
    database_id: process.env.EXPERIENCE_DATABASE_ID,
  });
  const experiences = workExperiences.map((experience) => {
    const experienceData = {
      id: experience.id,
      name: experience.properties.Name.title[0].text.content,
      position: experience.properties.Position.rich_text[0].text.content,
      start: moment(new Date(experience.properties.Start.date.start))
        .format("MMMM YYYY")
        .toString(),
      end: experience.properties.End.date
        ? moment(new Date(experience.properties.End.date.start))
            .format("MMMM YYYY")
            .toString()
        : "Ongoing",
      description: experience.properties.Description.rich_text.length
        ? experience.properties.Description.rich_text[0].text.content.split(
            "\n"
          )
        : "",
    };
    return experienceData;
  });
  return experiences;
};

const getProjects = async () => {
  const { results: projectList } = await notion.databases.query({
    database_id: process.env.PROJECT_DATABASE_ID,
  });
  const projects = projectList.map((project) => {
    const projectData = {
      id: project.id,
      image: project.properties.Thumbnail.files[0].file.url,
      name: project.properties.Name.title[0].text.content,
      tags: project.properties.Tags.multi_select.map((tag) => tag.name),
      repoLink: project.properties["Repository Link"].rich_text[0].text.content,
      siteLink: project.properties["Website Link"].rich_text[0].text.content,
    };
    return projectData;
  });
  return projects;
};

(async () => {
  getExperiences();
})();

module.exports = {
  getExperiences,
  getProjects,
};
