const R = require('ramda')

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

const handlePullRequestWH = async context => {
  const {
    body: prBody,
    head: { repo: { owner: { login: owner }, name: repo } },
    number,
  } = context.payload.pull_request
  const command = getCommand(prBody)

  if (!command.action) return

  try {
    const param = {
      body: getNewContent(command, prBody),
      owner,
      repo,
      number,
    }
    if (command.action === 'DIALOG') {
      await context.github.pullRequests.createReview(
        R.assoc('event', 'COMMENT', param)
      )
    } else {
      await context.github.pullRequests.update(param)
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  handleIssueWH,
  handlePullRequestWH,
}
