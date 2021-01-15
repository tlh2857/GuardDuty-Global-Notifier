const AWS = require('aws-sdk');
const sns = new AWS.SNS({region:'us-west-2'});



exports.main = async function(event, context) {
  try {
        console.log(event)
        console.log(process.env.NotifyMeARN)
        await sns.publish({
            Message: JSON.stringify(event.detail),
            Subject: `GuardDuty: ${event.detail.type} in ${event.detail.region}`,
            TopicArn: process.env.NotifyMeARN 
    }).promise();


    
  } catch(error) {
    console.log(error)
  }
}



