const cdk = require('@aws-cdk/core');
const eventStack = require('../lib/event_stack')
 
class CweGdCdkStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    new eventStack.EventService(this,'Events');
    // The code that defines your stack goes here
  }
}

module.exports = { CweGdCdkStack }
