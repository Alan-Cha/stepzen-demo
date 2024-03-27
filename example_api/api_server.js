// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: openapi-to-graphql
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict'

let server // holds server object for shutdown

/**
 * Starts the server at the given port
 */
function startServer(PORT) {
  const express = require('express')
  const app = express()

  const bodyParser = require('body-parser')
  app.use(bodyParser.json())

  app.get('/users/:user_id', (req, res) => {

    let user_id = req.params['user_id']

    switch (user_id) {
      case 'alan_cha':
        res.send({
          firstName: "Alan",
          lastName: "Cha",
          friendIds: ["erik-wittern", "gbaudart", "JamesD123"],
          interests: ["graphql", "programming"]
        })
        return

      case 'erik-wittern':
        res.send({
          firstName: "Erik",
          lastName: "Wittern",
          friendIds: ["erik-wittern", "JamesD123"],
          interests: ["graphql", "programming", "MtG", "tennis"]
        })
        return

      case 'gbaudart':
        res.send({
          firstName: "Guillaume",
          lastName: "Baudart",
          friendIds: ["alan_cha", "erik-wittern"],
          interests: ["research"]
        })
        return

      case 'JamesD123':
        res.send({
          firstName: "James",
          lastName: "Davis",
          friendIds: ["gbaudart", "JamesD123"],
          interests: ["math problems"]
        })
        return
    }
  })

  return new Promise((resolve) => {
    server = app.listen(PORT, () => {
      console.log(`Example API accessible on port ${PORT}`)
      resolve()
    })
  })
}

/**
 * Stops server.
 */
function stopServer() {
  return new Promise((resolve) => {
    server.close(() => {
      console.log(`Stopped API server`)
      resolve()
    })
  })
}

// If run from command line, start server:
if (require.main === module) {
  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 8000;
  }

  startServer(port)
}

module.exports = {
  startServer,
  stopServer
}
