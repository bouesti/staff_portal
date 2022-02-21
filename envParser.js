// envparser.js
const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed


module.exports = function () {
  // Let's stringify our variables
  for (var key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      key = parsedEnv[key]
      // parsedEnv[key] = JSON.stringify(parsedEnv[key])
    }
  }
  return parsedEnv
}
