const R = require('ramda')

const { getCommand, getMDContent } = require('./utils/template')
const { getCustomTemplates } = require('./utils/ghAPI')

const handleIssueWH = async context => {
  const { body: issueBody } = context.payload.issue
  const { name: repo, owner: { login: owner } } = context.payload.repository

  const command = getCommand(issueBody)
  if (!command.action) return

  try {
    const customTemplates = await getCustomTemplates(context.github, { owner, repo })

    const param = context.issue({
      body: await getMDContent(command, customTemplates, issueBody),
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
    const customTemplates = await getCustomTemplates(
      context.github,
      { owner, repo }
    )

    const param = {
      body: await getMDContent(command, customTemplates, prBody),
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
