const request = require('request');
const ordinal = require('ordinal-suffix');
const bot_id = require('./config').bot_id;
const start = new Date(2018, 2, 30, 20, 0);
const now = new Date();
const today = Math.floor((now - start) / (1000 * 60 * 60 * 24));
const tonight = today + 1;

function toWeeks(n) {
  if (n / 7 < 1) return '';
  if (n / 7 < 2) return '1 week';
  return `${Math.floor(n / 7)} weeks`;
}

function toDays(n) {
  if (n % 7 === 0) return '';
  if (n % 7 === 1) return '1 day';
  return `${n % 7} days`;
}

function toDaysAndWeeks(n) {
  const weekString = toWeeks(n);
  const dayString = toDays(n);

  if (!weekString) return '';
  return `${weekString}${dayString && ` and ${dayString}`}`;
}

request.post({
  url: 'https://api.groupme.com/v3/bots/post',
  form: {
    text: `Beep boop! A quick reminder that you can still count day ${today}! ` +
          `Tonight is the ${ordinal(tonight)} day of the Omer${toDaysAndWeeks(tonight) && ` (${toDaysAndWeeks(tonight)})`}.`,
    bot_id,
  }
}, function(err, resp, body) {
  console.log(err, resp, body);
});