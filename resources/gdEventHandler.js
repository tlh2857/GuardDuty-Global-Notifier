const AWS = require('aws-sdk');
const sns = new AWS.SNS({region:'us-west-2'});



exports.main = async function(event, context) {
  try {
        console.log(event)
        console.log(process.env.SNSTopicARN)
        await sns.publish({
            Message: JSON.stringify(event.detail),
            Subject: `GuardDuty: ${event.detail.type} in ${event.detail.region}`,
            TopicArn: process.env.SNSTopicARN 
    }).promise();


    
  } catch(error) {
    console.log(error)
  }
}



