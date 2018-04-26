//@flow

const R = require('ramda');

const getCustomTemplates /*: (Object, GetContentPara) => Promise<Array<Template>> */ = async (
  gitHubContext,
  { owner, repo, path = '.github' }
) => {
  const { repos: { getContent } } = gitHubContext;
  try {
    const { data: customTemplates } = await getContent({ owner, repo, path });
    return customTemplates
      .filter(
        ({ name, type }) => R.match(/\.md$/, name).length > 0 && type === 'file'
      )
      .map(R.pick(['name', 'download_url']));
  } catch (e) {
    console.error(e);
    return [];
  }
};

module.exports = {
  getCustomTemplates,
};
