const fs = require('fs')
const path = require('path')
const R = require('ramda')
const minimist = require('minimist')

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

const insertTemplate = (options, template, issueBody) => {
  // TODO replace partial of issueBody
  return Handlebars.compile(template)(options)
}

const readTemplate = fileName => fs.readFileSync(path.join(__dirname, '../templates', fileName), 'utf8')

const getNewContent = (command, customTemplates=[], issueBody) => {
  const { action, options } = command

  const matchAction = ({ name }) => name.toLowerCase() === `${action.toLowerCase()}.md`

  switch (action.toUpperCase()) {
  case 'DIALOG':
    return insertTemplate(options, readTemplate('dialog.md'), issueBody)
  case 'ISSUE':
    return insertTemplate(options, readTemplate('issue.md'), issueBody)
  case 'FEATURE':
    return insertTemplate(options, readTemplate('feature.md'), issueBody)
  case 'PR':
    return insertTemplate(options, readTemplate('pr.md'), issueBody)
  default:
    if (customTemplates.some(matchAction)) {
      const { content: template } = customTemplates.filter(matchAction).shift()
      insertTemplate(options, template, issueBody)
    } else {
      insertTemplate(options, readTemplate('dialog.md'), issueBody)
    }
  }
}

module.exports = {
  getCommand,
  getNewContent,
}
