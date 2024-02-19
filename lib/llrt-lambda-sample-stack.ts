import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LlrtFunction } from 'cdk-lambda-llrt'

export class LlrtLambdaSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // LLRT Lambda 関数を作成
    const llrtLambda = new LlrtFunction(this, 'llrt-lambda-sample', {
      functionName: 'llrt-lambda-sample',
      llrtVersion: 'latest',
      architecture: lambda.Architecture.ARM_64,
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: 'sample-lambda/src/index.ts',
      handler: "index.handler",
    })

    // Function URLsを付与
    const functionUrl = llrtLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    })
  }
}