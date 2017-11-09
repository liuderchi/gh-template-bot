#!/bin/bash
set -e

source .env


# config heroku app
heroku config:set APP_ID=$APP_ID \
  WEBHOOK_SECRET=$WEBHOOK_SECRET \
  PRIVATE_KEY="$(cat ./*.private-key.pem)" 1>/dev/null

# deploy heroku app
git push heroku master -f
git tag "deploy-$(date '+%Y-%m-%d-%Hh_%Mm')"
