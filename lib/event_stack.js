const core = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const events = require("@aws-cdk/aws-events");
const targets = require("@aws-cdk/aws-events-targets");
const iam = require("@aws-cdk/aws-iam");
const {CustomLambdaExecutionRoleARN,SNSTopicARN} = require("../resources/variables");


class EventService extends core.Construct {
  constructor(scope, id, props) {
    super(scope, id, props);


/*
    const lambdaExecutionRole = (iam.Role.fromRoleArn(this, 'Role', CustomLambdaExecutionRoleARN, {
        mutable: false,
      }));
*/

    const handler = new lambda.Function(this, "GD-event-hanlder", {
      runtime: lambda.Runtime.NODEJS_10_X, // So we can use async in widget.js
      code: lambda.Code.fromAsset("resources"),
      handler: "gdEventHandler.main",
      environment: {
        SNSTopicARN: SNSTopicARN
      }
    });

    handler.addToRolePolicy( new iam.PolicyStatement({
      "actions":["sns:Publish"],
      "resources": [SNSTopicARN]
     }))

    const rule = new events.Rule(this, 'rule', {
        eventPattern: {
            source: [
              "aws.guardduty"
            ],
            detailType: [
              "GuardDuty Finding"
            ]
          },
    });
    
    rule.addTarget(new targets.LambdaFunction(handler));

  }
}

module.exports = { EventService }