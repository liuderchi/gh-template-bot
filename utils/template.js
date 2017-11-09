const R = require('ramda')

const { dialog } = require('../templates/dialog')
const { simpleIssue } = require('../templates/simple_issue')
const { featureProposal } = require('../templates/feature_proposal')
const { simplePR } = require('../templates/simple_pr')


const getCommand = issueBody => {
  const cmdRegex = /^\/template\s+((issue|pr|feature)\b)?/i
  const cmdRegexForDialog = /[-\*] \[x\] `\/template\s+((issue|pr|feature)`)/im

  const getAction = regex => R.pipe(R.match(regex), R.path(['2']))
  const toUpperCase = action => action.toUpperCase()
  const hasCommand = R.pipe(R.match(/^\/template\b/i), R.isEmpty, R.not)

  return R.pipe(
    R.ifElse(
      getAction(cmdRegexForDialog),
      R.pipe(getAction(cmdRegexForDialog), toUpperCase),
      R.ifElse(
        getAction(cmdRegex),
        R.pipe(getAction(cmdRegex), toUpperCase),
        R.ifElse(
          hasCommand,
          R.always('DIALOG'),
          R.always(null)
        )
      )
    ),
    R.assoc('action', R.__, {})
  )(issueBody)
}

const replaceCommand = (issueBody, template) => {
  // TODO keep other content of original issueBody
  return template
}

const insertTemplate = (command, issueBody) => {
  const { action } = command

  switch (action.toUpperCase()) {
    case 'DIALOG':
      return replaceCommand(issueBody, dialog)
    case 'ISSUE':
      return replaceCommand(issueBody, simpleIssue)
    case 'FEATURE':
      return replaceCommand(issueBody, featureProposal)
    case 'PR':
      return replaceCommand(issueBody, simplePR)
    default:
      return replaceCommand(issueBody, dialog)
  }
}

module.exports = {
  getCommand,
  insertTemplate,
}
