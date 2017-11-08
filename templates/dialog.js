// markdown as a dialog

const dialog = `
<!-- this is result of command \`/template dialog\`-->
### Pick one template and submit, bot will help you:
  - [ ] \`/template issue\`
  - [ ] \`/template pr\`
  - [ ] \`/template feature\` to propose a new feature

NOTE: you can add this template to your \`ISSUE_TEMPLATE.md\` or \`PULL_REQUEST_TEMPLATE.md\`
`


module.exports = {
  dialog,
}
