const { getCommand, getNewContent } = require('./utils/template')

const handleIssueWH = async context => {
  const issueBody = context.payload.issue.body
  const command = getCommand(issueBody)

  if (!command.action) return

  try {
    const param = context.issue({
      body: getNewContent(command, issueBody)
    })
    if (command.action === 'DIALOG') {
      await context.github.issues.createComment(param)
    } else {
      await context.github.issues.edit(param)
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  handleIssueWH,
}
