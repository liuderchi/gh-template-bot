// markdown as a dialog

const dialog = `
<!-- this is result of command \`/template\`-->
### 🤖 Hello Human! I Understand These Commands:

  - \`/template issue\` to report a *[simple issue][issue]*
  - \`/template pr\` to create a *[simple pull request][pr]*
  - \`/template feature\` to propose a *[new feature][feature]*

> Remember to :recycle:**Refresh This Page** after updating your command.

[issue]: https://github.com/TalAter/open-source-templates
[pr]: https://raw.githubusercontent.com/stevemao/github-issue-templates/master/simple/PULL_REQUEST_TEMPLATE.md
[feature]: https://github.com/TalAter/open-source-templates
`


module.exports = {
  dialog,
}
