#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LlrtLambdaSampleStack } from '../lib/llrt-lambda-sample-stack';

import * as dotenv from 'dotenv';
dotenv.config();

const app = new cdk.App();
const llrtLambdaStack = new LlrtLambdaSampleStack(app, 'LlrtLambdaSampleStack', {});

//タグを付ける
cdk.Tags.of(llrtLambdaStack).add('Project', process.env.PROJECT_TAG ?? "Sandbox")
cdk.Tags.of(llrtLambdaStack).add('Billing', process.env.BILLING_TAG ?? "Sandbox")
