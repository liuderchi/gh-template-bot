// @flow

const fs = require('fs')
const path = require('path')
const R /*: Ramda */ = require('ramda')
const minimist = require('minimist')
const rp /*: string => Promise<string> */ = require('request-promise')

const { Handlebars } = require('./handlebars')


const getCommand /*: string => Command */ = issueBody => {
  const cmdRegexForDialog = /[-*] \[x\] `\/template\s+((issue|pr|feature)`)/im
  const getActionInDialog /*: string => string */ = R.pipe(R.match(cmdRegexForDialog), R.path(['2']))

  const tokenize /*: string => Object */ = R.pipe(
    str => str.trim().split('\n')[0].trim().split(/\s/),
    minimist
  )

  const getAction /*: string => string|null */ = issueBody => {
    const { _: [ directive, action = 'DIALOG' ] } = tokenize(issueBody)
    return (directive === '/template') ? action.toUpperCase() : null
  }

  const getOptions /*: string => Object */ = issueBody => {
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

const matchAction /*: string => Template => boolean */ = action => ({ name }) => name.toLowerCase() === `${action.toLowerCase()}.md`

const validateAction /*: (Command, Array<Template>) => void */ = (command, customTemplates) => {
  const { action } = command

  if (!['DIALOG', 'ISSUE', 'FEATURE', 'PR'].includes(action.toUpperCase())) {
    if (!customTemplates.some(matchAction(action))) {
      command.action = 'DIALOG'
    }
  }
}

const matchIssueTemplate /*: Template => boolean */ = ({ name }) => R.test(/ISSUE_TEMPLATE/i, name)

const matchPRTemplate /*: Template => boolean */ = ({ name }) => R.test(/PULL_REQUEST_TEMPLATE/i, name)

const insertTemplate /*: (Object, string, string) => string */ = (options, template, issueBody) => {
  // TODO replace partial of issueBody
  return Handlebars.compile(template)(options)
}

const readTemplate /*: string => string */ = fileName => fs.readFileSync(path.join(__dirname, '../templates', fileName), 'utf8')

const getMDContent /*: (Command, Array<Template>, string) => Promise<string> */ = async (command, customTemplates = [], issueBody) => {
  const { action, options } = command

  switch (action.toUpperCase()) {
  case 'DIALOG':
    return insertTemplate(options, readTemplate('dialog.md'), issueBody)
  case 'ISSUE':
    if (customTemplates.some(matchIssueTemplate)) {
      const { download_url } = customTemplates.filter(matchIssueTemplate).shift()
      return insertTemplate(options, await rp(download_url), issueBody)
    }
    return insertTemplate(options, readTemplate('issue.md'), issueBody)
  case 'PR':
    if (customTemplates.some(matchPRTemplate)) {
      const { download_url } = customTemplates.filter(matchPRTemplate).shift()
      return insertTemplate(options, await rp(download_url), issueBody)
    }
    return insertTemplate(options, readTemplate('pr.md'), issueBody)
  case 'FEATURE':
    if (customTemplates.some(matchAction(action))) {
      const { download_url } = customTemplates.filter(matchAction(action)).shift()
      return insertTemplate(options, await rp(download_url), issueBody)
    } else {
      return insertTemplate(options, readTemplate('feature.md'), issueBody)
    }
  default:
    if (customTemplates.some(matchAction(action))) {
      const { download_url } = customTemplates.filter(matchAction(action)).shift()
      return insertTemplate(options, await rp(download_url), issueBody)
    } else {
      return insertTemplate(options, readTemplate('dialog.md'), issueBody)
    }
  }
}

module.exports = {
  getCommand,
  validateAction,
  getMDContent,
}
