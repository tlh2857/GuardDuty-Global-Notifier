# GuardDuty Global Notifier
This solution enables GuardDuty, along with an CloudWatch Events Rule and a Lambda function in each AWS region. 

See instructions, here: https://terryleehillis.medium.com/aws-cdk-automating-guardduty-event-notifications-in-all-regions-f0bbcec6077d

what you’ll need in order to get going.
AWS CLI installed and configured
AWS CDK installed
SNS topic created
Git installed (alternatively you can download the code from GitHub, unzip it, and head to step 2.)
Once you have the above items configured, the solution is as easy as 1, 2, 3!
Open up a command prompt / terminal, and run:
git clone https://github.com/tlh2857/GuardDuty-Global-Notifier.git`
2. Then head to the ‘resources’ folder and edit the ‘variables.js’ file. Replace the value that says ‘SNSTopicARN’ with the ARN of the SNS topic that you created and are subscribed to. See:
Image for post
3. If you already have GuardDuty enabled in all regions, then go ahead and remove this line of code in the event_stack.js file under the lib folder:
new guardduty.CfnDetector(this, “GuardDutyDetector”, { enable: true })
By doing this you’ll avoid an error that can stop the deployment of the solution if GuardDuty is already enabled in that region.
4. Perfect. Now hop back into that terminal and run:
npm install
cdk bootstrap
cdk deploy
And if all goes well, you should see the solution deploy right before your very eyes! Note that you’ll need to enter ‘y’ into the console as it will prompt you about making changes to IAM resources in each region that you deploy the solution. One ‘y’ per region unfortunately.
To test, grab the GuardDuty detector ID of any region in AWS and run:
aws guardduty create-sample-findings --detector-id REGIONAL-DETECTOR-ID --finding-types Backdoor:EC2/DenialOfService.Tcp --region AWS-REGION

# Welcome to your CDK JavaScript project!

This is a blank project for JavaScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

## Useful commands

 * `npm run test`         perform the jest unit tests
 * `cdk deploy`           deploy this stack to your default AWS account/region
 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template
