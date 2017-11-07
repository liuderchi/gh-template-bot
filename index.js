module.exports = (robot) => {
  // Your code here
  console.log('Yay, the app was loaded!')

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

  robot.on(['issues.opened', 'issues.edited'], async context => {
    const params = context.issue({
      body: `Echo: ${context.payload.issue.body}`
    })
    return context.github.issues.createComment(params)
  })
}
