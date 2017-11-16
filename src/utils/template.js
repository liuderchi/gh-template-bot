const R = require('ramda')
const minimist = require('minimist')

const { dialog } = require('../templates/dialog')
const { simpleIssue } = require('../templates/simple_issue')
const { featureProposal } = require('../templates/feature_proposal')
const { simplePR } = require('../templates/simple_pr')


const getCommand = issueBody => {
  const cmdRegexForDialog = /[-*] \[x\] `\/template\s+((issue|pr|feature)`)/im
  const getActionInDialog = R.pipe(R.match(cmdRegexForDialog), R.path(['2']))

  const tokenize = R.pipe(
    str => str.trim().split('\n')[0].trim().split(/\s/),
    minimist
  )

  const getAction = issueBody /*: String */ => {
    const { _: [ directive, action = 'DIALOG' ] } = tokenize(issueBody)
    return (directive === '/template') ? action.toUpperCase() : null
  }

  const getOptions = issueBody /*: String */ => {
    const { _: [ directive ], ...options } = tokenize(issueBody)
    return (directive === '/template') ? options : {}
  }

  return {
    action: R.ifElse(
      getActionInDialog,
      R.pipe(
        getActionInDialog,
        action => action.toUpperCase()
      ),
      getAction
    )(issueBody),
    options: getOptions(issueBody),
  }
}

const insertTemplate = (template, issueBody) => {
  // TODO replace partial of issueBody
  return template
}

const getNewContent = (command, issueBody) => {
  const { action } = command

  switch (action.toUpperCase()) {
  case 'DIALOG':
    return insertTemplate(dialog, issueBody)
  case 'ISSUE':
    return insertTemplate(simpleIssue, issueBody)
  case 'FEATURE':
    return insertTemplate(featureProposal, issueBody)
  case 'PR':
    return insertTemplate(simplePR, issueBody)
  default:
    return insertTemplate(dialog, issueBody)
  }
}

module.exports = {
  getCommand,
  getNewContent,
}
