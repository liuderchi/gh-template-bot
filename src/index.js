//@flow

const { handleIssueWH, handleIssueCommentWH, handlePullRequestWH } = require('./webhookHandler')

module.exports = (robot /*: Robot */) => {
  robot.on(['issues.opened', 'issues.edited'], handleIssueWH)
  robot.on(['issue_comment.created', 'issue_comment.edited'], handleIssueCommentWH)
  robot.on(['pull_request.opened', 'pull_request.edited'], handlePullRequestWH)
}
