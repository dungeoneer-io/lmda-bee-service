const https = require('https');

async function post(url, data) {
  const dataString = JSON.stringify(data)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length,
    },
    timeout: 1000, // in ms
  }

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new Error(`HTTP status code ${res.statusCode}`))
      }

      const body = []
      res.on('data', (chunk) => body.push(chunk))
      res.on('end', () => {
        const resString = Buffer.concat(body).toString()
        resolve(resString)
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request time out'))
    })

    req.write(dataString)
    req.end()
  })
};

exports.handler = async (lambdaE) => {
    console.log('Dungeoneer.io');
    console.log('lmda-bee-service');
    console.log('================');
    const { entity, event } = lambdaE.detail.fullDocument;
      const message = `:rotating_light: Blizzard Entity Event\n\`\`\`${entity.type} Entity was ${event}. #${entity.id}\`\`\``;

      const response = await post(
        process.env.DISCORD_NOTIFICATION_WEBHOOK,
        { content: message }
      );
      return response;
};
