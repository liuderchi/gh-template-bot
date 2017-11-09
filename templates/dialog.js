// markdown as a dialog

const dialog = `
<!-- this is result of command \`/template\`-->
### 🤖 Hello Human! Pick One Command:

  - [ ] \`/template issue\` to report a *[simple issue][issue]*
  - [ ] \`/template pr\` to create a *[simple pull request][pr]*
  - [ ] \`/template feature\` to propose a *[new feature][feature]*

Great! Now :recycle:**Refresh This Page**. Bot will help you.

> you can copy this template to your \`ISSUE_TEMPLATE.md\` or \`PULL_REQUEST_TEMPLATE.md\`

[issue]: https://github.com/TalAter/open-source-templates
[pr]: https://raw.githubusercontent.com/stevemao/github-issue-templates/master/simple/PULL_REQUEST_TEMPLATE.md
[feature]: https://github.com/TalAter/open-source-templates
`


module.exports = {
  dialog,
}
