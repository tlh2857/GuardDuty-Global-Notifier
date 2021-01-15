const core = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const events = require("@aws-cdk/aws-events");
const targets = require("@aws-cdk/aws-events-targets");
const iam = require("@aws-cdk/aws-iam")

    const testLambdaExecutionRoleARN = 'arn:aws:iam::959423908895:role/LambdaTestSNSExecutionRole'
    const testSNSARN = 'arn:aws:sns:us-west-2:959423908895:test'
    // const NotifyMePublishPolicyARN = "arn:aws:iam::270265193454:policy/NotifyMeSNSPublishOnlyPolicy";
    const NotifyMeLambdaExecutionRoleARN = "arn:aws:iam::270265193454:role/NotifyMeLambdaExecutionRole";
    const NotifyMeARN = 'arn:aws:sns:us-west-2:270265193454:NotifyMe';


class EventService extends core.Construct {
  constructor(scope, id, props) {
    super(scope, id, props);

    const lambdaExecutionRole = iam.Role.fromRoleArn(this, 'Role', props.test?testLambdaExecutionRoleARN:NotifyMeLambdaExecutionRoleARN, {
        // Set 'mutable' to 'false' to use the role as-is and prevent adding new
        // policies to it. The default is 'true', which means the role may be
        // modified as part of the deployment.
        mutable: false,
      });

    const handler = new lambda.Function(this, "GD-event-hanlder", {
      runtime: lambda.Runtime.NODEJS_10_X, // So we can use async in widget.js
      code: lambda.Code.fromAsset("resources"),
      handler: "gdEventHandler.main",
      environment: {
        NotifyMeARN: props.test? testSNSARN:NotifyMeARN
      },
      role: lambdaExecutionRole
    });

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