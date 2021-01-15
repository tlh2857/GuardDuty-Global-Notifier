const AWS = require('aws-sdk');

// extract the region of the SNS topic from the ARN
const regionRegEx = RegExp(`^(?:[^:]+:){3}([^:]+).*`);
const region = regionRegEx.exec(process.env.SNSTopicARN)[1];

// set the region of the SNS topic in the SNS constructor
const sns = new AWS.SNS({region:region});



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



