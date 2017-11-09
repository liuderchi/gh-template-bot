const { handleIssueWH } = require('./webhookHandler')

module.exports = (robot) => {
  robot.on(['issues.opened', 'issues.edited'], handleIssueWH)
}
