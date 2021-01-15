// Custom Varibles for your environment 

// ARN of the Custom Lambda execution role with permissions to publish to your SNS topic
const CustomLambdaExecutionRoleARN = 'EDIT';

// ARN of the SNS topic to which you've subscribed for events
const SNSTopicARN = 'arn:aws:sns:us-east-1:843982302747:test';



module.exports = {CustomLambdaExecutionRoleARN,SNSTopicARN}; 