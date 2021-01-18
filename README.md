# GuardDuty Global Notifier
This solution enables GuardDuty, along with an CloudWatch Events Rule and a Lambda function in each AWS region. 

 ## See instructions, here: https://terryleehillis.medium.com/aws-cdk-automating-guardduty-event-notifications-in-all-regions-f0bbcec6077d

### Requirements: 
1. AWS Account + CLI  installed and configured
2. AWS CDK installed
3. An AWS SNS topic + a subscription

### Setup: 
1. clone the repo
2. Update the SNS topic ARN value in the resource/variable.js file
3. If already have GuardDuty deployed in all regions, delete the guardDuty contructor in bin/event_stack.js file. 
2. Run: 
`npm install`
`cdk boostrap`
`cdk deploy`

### Test: 
1. Grab the detector ID in a GuardDuty region and run: 
`aws guardduty create-sample-findings --detector-id REGIONAL-DETECTOR-ID --finding-types Backdoor:EC2/DenialOfService.Tcp --region AWS-REGION`

2. You should get an email with the notification after about 5 minutes (assuming you subscribed to that SNS topic via email). 

