<p align="center" >
  <a href="https://github.com/apps/template">
    <img height="72" src="./docs/logo.png">
  </a>
</p>


# GitHub Template Bot

[![Build Status][travis-status]][travis-project]
[![Dependency Status][david-status]][david-project]
[![DevDependency Status][david-dev-status]][david-dev-project]
[![PeerDependency Status][david-peer-status]][david-peer-project]
[![license][license-badge]][license]

:robot: Generate *Markdown Templates* for different *Issues*, *Pull Requests* and even *Feature Requests*


## Quick Start

1. Install Template Bot at [GitHub Apps Page][gh-app-page]

2. Now you can type one of these commands in issue/PR then submit

- `/template issue` for general issues
- `/template feature` to *Propose a Feature* in issue
- `/template pr` for general pull request
- `/template ReplyDup` to fetch your own `.github/ReplyDup.md` template
- `/template` to ask :robot: for help

3. Refresh the page. Template Bot will create Markdown Template for you :tada:


## Demo

![demo1][demo1]

---

![demo2][demo2]

---

Forgot command? Don't worry. Bot will help you :100:

<img width="650" alt="demo3" src="https://user-images.githubusercontent.com/4994705/33139825-ff63b434-cf73-11e7-87c3-076007336a95.png">


## Why

We *create issues for different purposes*:

> *Report a Bug, Propose a Feature, Asking for Help ...*

But we are used to setup [one `ISSUE_TEMPLATE.md`][gh-issue-doc] for our workflow. \
So **Template Bot** is built to [generate templates for different scenarios][prob-to-solve].


## Dev Guide

### Run on Local Machine
  - **Requirements**
      - Node >= 10
      - Yarn >= 1.3.2
  - **Environment**
      - create file `.env` from [`.env.example`](.env.example)
      - edit `.env` and set [`APP_ID`](.env.example#L2) according to your GitHub App
      - download private key to project root according to your GitHub App
      - NOTE: to create and config a Github App please follow [this Probot doc][doc-gh-app]
  - **Install and Run**

```bash
$ yarn --pure-lockfile
$ yarn run start:nodemon
```

### Test

```bash
$ yarn run jest
```

### Deploy to Heroku

```bash
$ sh jobs/deploy-heroku.sh
```

### Notes

  - Inspired by [evenchange4/gh-polls-bot][gh-polls-bot], a Bot creating polls in your issues
  - Built with [probot][probot], an api-friendly nodejs bot framework
  - Built with [`create-probot-app`][create-probot-app] boilerplate for quick start
  - Deployed on Heroku following [this doc by Probot][doc-deploy]


## [CONTRIBUTING](CONTRIBUTING.md)


## [CHANGELOG](CHANGELOG.md)


## LICENSE

MIT license https://liuderchi.mit-license.org

[travis-status]: https://travis-ci.org/liuderchi/gh-template-bot.svg?branch=master "travis-status"
[travis-project]: https://travis-ci.org/liuderchi/gh-template-bot "travis-project"
[david-status]: https://david-dm.org/liuderchi/gh-template-bot/status.svg "david-status"
[david-project]: https://david-dm.org/liuderchi/gh-template-bot "david-project"
[david-dev-status]: https://david-dm.org/liuderchi/gh-template-bot/dev-status.svg "david-dev-status"
[david-dev-project]: https://david-dm.org/liuderchi/gh-template-bot#info=devDependencies "david-dev-project"
[david-peer-status]: https://david-dm.org/liuderchi/gh-template-bot/peer-status.svg "david-peer-status"
[david-peer-project]: https://david-dm.org/liuderchi/gh-template-bot#info=peerDependencies "david-peer-project"
[license-badge]: https://img.shields.io/github/license/liuderchi/gh-template-bot.svg "license-badge"
[license]: http://liuderchi.mit-license.org/ "license"

[gh-app-page]: https://github.com/apps/template "gh-app-page"

[gh-issue-doc]: https://help.github.com/articles/creating-an-issue-template-for-your-repository/ "gh-issue-doc"
[prob-to-solve]: https://github.com/RichardLitt/knowledge/issues/9 "prob-to-solve"

[demo1]: https://user-images.githubusercontent.com/4994705/33142241-588e1f8e-cf7b-11e7-8e6d-73b355ac3a3a.gif "demo1"
[demo2]: https://user-images.githubusercontent.com/4994705/33141626-5dfc957e-cf79-11e7-9c37-42dd15c4d2db.gif "demo2"
[demo3]: https://user-images.githubusercontent.com/4994705/33139825-ff63b434-cf73-11e7-87c3-076007336a95.png "demo3"

[doc-gh-app]: https://probot.github.io/docs/development/#configure-a-github-app "doc-gh-app"

[gh-polls-bot]: https://github.com/evenchange4/gh-polls-bot "gh-polls-bot"
[probot]: https://probot.github.io "probot"
[create-probot-app]: https://github.com/probot/create-probot-app "create-probot-app"
[doc-deploy]: https://probot.github.io/docs/deployment/#heroku "doc-deploy"
