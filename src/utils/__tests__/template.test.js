const { getCommand, validateAction, getMDContent } = require('../template')

describe('getCommand()', () => {
  test('returns null action when issue body is empty', () => {
    expect(getCommand(''))
      .toMatchObject({
        action: null,
      })
  })
  test('returns null action when issue body starts with `/Template` which is not fully match', () => {
    expect(getCommand('/Template foo'))
      .toMatchObject({
        action: null,
      })
  })
  test('returns Dialog action when issue body starts with `/template`, but not match issue|pr|feature', () => {
    expect(getCommand('\n\n /template\t '))
      .toMatchObject({
        action: 'DIALOG',
      })
  })
  test('returns Specific action when issue body starts with `/template`, but not match issue|pr|feature', () => {
    expect(getCommand('/template foo '))
      .toMatchObject({
        action: 'FOO',
      })
    expect(getCommand('/template features'))
      .toMatchObject({
        action: 'FEATURES',
      })
  })
  test('returns Specific action with options when issue body contains option syntax', () => {
    expect(getCommand('/template issue --number 123'))
      .toMatchObject({
        action: 'ISSUE',
        options: {
          number: 123,
        },
      })
    expect(getCommand('/template issue dummy -f --name derek --action filtered'))
      .toMatchObject({
        action: 'ISSUE',
        options: {
          f: true,
          name: 'derek',
        },
      })
  })
  test('returns null action when issue body not starts with `/template`, without special markdown checkbox format', () => {
    expect(getCommand('\nsome words\n/template pr'))
      .toMatchObject({
        action: null,
      })
  })
  test('returns correspond action when issue body with checked markdown checkbox format', () => {
    expect(getCommand('Please pick one template:\n\n - [x] `/template feature`'))
      .toMatchObject({
        action: 'FEATURE',
      })

    expect(getCommand('Please pick one template:\n\n - [ ] `/template pr`\n - [x] `/template Issue`'))
      .toMatchObject({
        action: 'ISSUE',
      })
  })

})

describe('getMDContent()', () => {

  test('insert dialog without options', async () => {
    const newContent = await getMDContent(
      {
        action: 'DIALOG',
        options: {},
      },
      null,
      '/template'
    )
    expect(newContent.split('\n')[2])
      .toBe('## 🤖 Hello Human! I Understand These Commands:')})

  test('insert dialog with options', async () => {
    const newContent = await getMDContent(
      {
        action: 'DIALOG',
        options: {username: 'derek'},
      },
      null,
      '/template --username derek'
    )
    expect(newContent.split('\n')[2])
      .toBe('## 🤖 Hello derek! I Understand These Commands:')})
})

describe('validateAction()', () => {

  test('if action is not a preserve word nor match any templates, modify it to default `DIALOG`', () => {
    const command = {
      action: 'NO_SUCH_DOC',
      options: {},
    }
    const templates = [
      { name: 'SOME_DOC.md', download_url: 'https://foo.bar/some_doc.md' } ,
    ]
    validateAction(command, templates)
    expect(command.action).toBe('DIALOG')
  })

  test('if action is not a preserve word but match some template, do not modify it', () => {
    const action = 'SOME_DOC'
    const command = {
      action,
      options: {},
    }
    const templates = [
      { name: 'SOME_DOC.md', download_url: 'https://foo.bar/some_doc.md' } ,
    ]
    validateAction(command, templates)
    expect(command.action).toBe(action)

    command.action = 'pr'
    validateAction(command, templates)
    expect(command.action).toBe('pr')
  })
})
