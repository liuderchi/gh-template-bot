const { handleIssueWH, handlePullRequestWH } = require('./webhookHandler')

module.exports = (robot) => {
  robot.on(['issues.opened', 'issues.edited'], handleIssueWH)
  robot.on(['pull_request.opened', 'pull_request.edited'], handlePullRequestWH)
}
