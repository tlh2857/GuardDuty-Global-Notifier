#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { CweGdCdkStack } = require('../lib/cwe-gd-cdk-stack');
/*
const regions = ['us-east-1','us-east-2','eu-north-1','ap-south-1','eu-west-3','eu-west-2','eu-west-1',
'ap-northeast-2','ap-northeast-1','sa-east-1','ca-central-1','ap-southeast-1','ap-southeast-2','eu-central-1',
'us-west-1','us-west-2'];
*/

const regions = ['us-west-2']

const app = new cdk.App();
for(let region of regions){
    new CweGdCdkStack(app, `CweGdCdkStack-${region}`,{
        env:{region:region}
    });
}

