const chalk = require('chalk');
const moment = require('moment');

class Logger {

  static getTimestamp() {
    let date = new Date();
    return chalk.cyan(moment(date).format('[[]DD/MM/YY HH:mm:ss[]]'));
  }

}

module.exports = Logger;
