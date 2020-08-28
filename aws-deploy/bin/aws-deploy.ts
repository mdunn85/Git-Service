#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GitServiceStack } from '../lib/git-service-stack';

const app = new cdk.App();
new GitServiceStack(app, 'AwsDeployStack');
