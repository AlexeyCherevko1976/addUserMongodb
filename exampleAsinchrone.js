var Redis = require('ioredis');
redis = new Redis();

var def = '2016-01-01 00:00:00+00:00';

function getLastTime(callback) {
  var last = def;
  redis.get('redis_key', function (err, result) {
    callback(result);
  });
}
// Usage:
getLastTime(function(last) {
  console.log(last);
}); // 2016-01-01 00:00:00+00:00
// а хотелось бы видеть 2016-02-02 23:59:59+00:00 полученный из ре