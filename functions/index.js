/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// [END import]

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.changeStatus = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const newstatus = req.query.status;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref().set({status: newstatus}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.send("success");
  });
  checkCall();

});

function checkCall(){
  return admin.database().ref().once('value').then(function(snapshot) {
    var currentStatus = snapshot.val().status;
    if (currentStatus = "2") {
      sendCall();
      console.log("send call");
    }
  });
}

function sendCall(){
  let pd = require('pagerduty');
  // let Web3 = require('web3');
  let pager = new pd({
    serviceKey: "58064bf662dc4019a7455f1d66c4042a"
  });

  // Twilio Credentials
  // Twilio Credentials
const accountSid = 'AC89f181a6daf9db95566103d9501a6737';
const authToken = '7468b3d277805c4dec146c8b45a008aa';
// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
    to: '+16783157113',
    from: '+15105925031',
    body: "Someone is trying to steal your bike. Check the PhiRacks app to learn more",
    // mediaUrl: 'https://climacons.herokuapp.com/clear.png',
  })
  .then((message) => console.log(message.sid));


  pager.create({
    description: 'testError', // required
    details: {
      foo: 'bar'
    },
    callback: function(err, response) {
      if (err) throw err;
  /*
      pager.acknowledge({
        incidentKey: response.incident_key, // required
        description: 'Got the test error!',
        details: {
          foo: 'bar'
        },
        callback: function(err, response) {
          if (err) throw err;

          pager.resolve({
            incidentKey: response.incident_key, // required
            description: 'Resolved the test error!',
            details: {
              foo: 'bar'
            },
            callback: function(err, response) {
              if (err) throw err;
            }
          });
        }
      });
  */
    }

});
}
