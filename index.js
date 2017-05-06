'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendChangeNotification = functions.database.ref('{courseID}/{classID}/status').onWrite(event => {
	const courseID = event.params.courseID;
	const classID = event.params.classID;
	const status = event.data.val();

        const payload = {
           		notification: {
                		title: 'Firebase Notification',
                		body: 'A class has changed',
             			sound:"default"
			}
	};
	
	const options = {
		priority: "high",
		timeToLive: 60*60*2
	};
	var classTopic = classID.trim();
	return admin.messaging().sendToTopic(classTopic, payload, options);
});
