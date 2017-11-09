const { getCommand, insertTemplate } = require('../template')

describe('getCommand()', () => {
  test('returns null action when issue body is empty', () => {
    expect(getCommand(''))
      .toMatchObject({
        action: null,
      })
  })
  test('returns DIALOG action when issue body starts with `/template`, but not match issue|pr|feature', () => {
    expect(getCommand('/template foo '))
      .toMatchObject({
        action: 'DIALOG',
      })
    expect(getCommand('/template features'))
      .toMatchObject({
        action: 'DIALOG',
      })
  })
  test('returns null action when issue body not starts with `/template`, without special markdown checkbox format', () => {
    expect(getCommand('\n\n/template pr'))
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
