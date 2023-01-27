const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const notifySend = require('node-notifier').NotifySend
var notifier = new notifySend()

app.use(express.json())

app.post('/api/v1/shopping', (request, response) => {
  const timestamp = new Date()
  notifier.notify({
    title: 'Shopping',
    message: `You need to go shopping ! request sent at ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`,
    urgency: 'critical',
  })
  response.status(200).send('notification sent successfully')
})

app.post('/api/v1/food', (request, response) => {
  const timestamp = new Date()
  notifier.notify({
    title: 'Food',
    message: `You need to go food ! request sent at ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`,
    urgency: 'critical',
  })
  response.status(200).send('notification sent successfully')
})

app.post('/api/v1/other', (request, response) => {
  const msg = request.body?.msg
  const timestamp = new Date()
  if (!msg) {
    response
      .status(400)
      .send({ error: 'Missing required parameter : msg' })
      .end()
  } else {
    notifier.notify({
      title: 'Other',
      message: `You need to do ${msg} ! request sent at ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`,
      urgency: 'critical',
    })
    response.status(200).send({ msg: msg, time: timestamp })
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
