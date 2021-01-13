#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { CweGdCdkStack } = require('../lib/cwe-gd-cdk-stack');

const app = new cdk.App();
new CweGdCdkStack(app, 'CweGdCdkStack');
