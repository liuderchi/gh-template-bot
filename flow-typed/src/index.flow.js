// NOTE separate flow type declaration for src/**/*.js

/*::
declare type Robot = {
  on: function,
}
*/


/*::
declare type GetContentPara = {
  owner: string,
  repo: string,
  path?: string,
}
*/


/*::
declare type Payload = {
  issue: any,
  repository: any,
  comment: any,
  pull_request: any,
}
*/

/*::
declare type Context = {
  payload: Payload,
  github: any,
  issue: { body: string } => string,
}
*/
