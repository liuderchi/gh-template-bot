const fs = require('fs')
const path = require('path')
const R = require('ramda')
const minimist = require('minimist')
const rp = require('request-promise')

const { Handlebars } = require('./handlebars')


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

const matchIssueTemplate = ({ name }) => R.test(/ISSUE_TEMPLATE/i, name)

const matchPRTemplate = ({ name }) => R.test(/PULL_REQUEST_TEMPLATE/i, name)
 
const insertTemplate = (options, template, issueBody) => {
  // TODO replace partial of issueBody
  return Handlebars.compile(template)(options)
}

const readTemplate = fileName => fs.readFileSync(path.join(__dirname, '../templates', fileName), 'utf8')

const getMDContent = async (command, customTemplates=[], issueBody) => {
  const { action, options } = command

  const matchAction = ({ name }) => name.toLowerCase() === `${action.toLowerCase()}.md`

  switch (action.toUpperCase()) {
  case 'DIALOG':
    return insertTemplate(options, readTemplate('dialog.md'), issueBody)
  case 'ISSUE':
    if (customTemplates.some(matchIssueTemplate)) {
      const { download_url } = customTemplates.filter(matchIssueTemplate).shift()
      return insertTemplate(options, await rp(download_url), issueBody)
    }
    return insertTemplate(options, readTemplate('issue.md'), issueBody)
  case 'FEATURE':
    return insertTemplate(options, readTemplate('feature.md'), issueBody)
  case 'PR':
    if (customTemplates.some(matchPRTemplate)) {
      const { download_url } = customTemplates.filter(matchPRTemplate).shift()
      return insertTemplate(options, await rp(download_url), issueBody)
    }
    return insertTemplate(options, readTemplate('pr.md'), issueBody)
  default:
    if (customTemplates.some(matchAction)) {
      const { download_url } = customTemplates.filter(matchAction).shift()
      return insertTemplate(options, await rp(download_url), issueBody)
    } else {
      return insertTemplate(options, readTemplate('dialog.md'), issueBody)
    }
  }
}

module.exports = {
  getCommand,
  getMDContent,
}
