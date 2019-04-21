const https = require('https');

const getWeather = () => {
  const options = {
    hostname: 'api.weather.yandex.ru',
    path: `/v1/forecast?lat=55.75396&lon=37.620393&limit=7`,
    headers: { 'X-Yandex-API-Key': 'e9b93d63-4e34-4730-8732-8d241920d5fa' },
  };
  return new Promise((resolve, reject) => {
    https.get(options, (res) => {
      let body = [];
      res.on('error', (error) => {
        reject(error);
      });
      res.on('data', (chunk) => {
        body.push(chunk);
      });
      res.on('end', () => {
        const repos = Buffer.concat(body).toString();
        resolve(repos);
      });
    });
  });
}

module.exports = getWeather;
