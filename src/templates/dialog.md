<!-- this is result of command `/template`-->

## 🤖 Hello {{ withDefault username "Human" }}! I Understand These Commands:

### `/template issue`

open `.github/ISSUE_TEMPLATE.md` or a *[sample issue][issue]*

### `/template pr`

open `.github/PULL_REQUEST_TEMPLATE.md` or a *[sample pull request][pr]*

### `/template feature`

open *[a template to propose new feature][feature]*

### `/template duplicate --num 23`

open custom [Handlebars Template][handlebarsjs], in this case `.github/duplicate.md` with `num` set to 23

for example, you've had `.github/duplicate.md` like [this][example]:

```markdown
<!-- .github/duplicate.md -->
😢 This is duplicate of #{{ withDefault __ "{{ num }}" }}.
```

I would say `😢 This is duplicate of #23.`

---

> Remember to :recycle:**Refresh This Page** after updating your command.

[issue]: https://github.com/TalAter/open-source-templates
[pr]: https://raw.githubusercontent.com/stevemao/github-issue-templates/master/simple/PULL_REQUEST_TEMPLATE.md
[feature]: https://github.com/TalAter/open-source-templates
[handlebarsjs]: http://handlebarsjs.com/
[example]: https://github.com/liuderchi/gh-template-bot/blob/master/src/templates/duplicate.md
