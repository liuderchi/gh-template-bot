//@flow

const Handlebars = require('handlebars');

Handlebars.registerHelper(
  'withDefault',
  (x, defaultValue) => (x ? x : defaultValue)
);

module.exports = {
  Handlebars,
};
