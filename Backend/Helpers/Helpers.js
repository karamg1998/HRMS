const dayjs = require("dayjs");

function is_email_valid(email)
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getCurrentMySQLTime() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
}

module.exports = {getCurrentMySQLTime, is_email_valid}