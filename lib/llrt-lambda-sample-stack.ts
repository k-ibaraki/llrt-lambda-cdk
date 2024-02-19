import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LlrtLambdaSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // LLRTのLayerを作成
    const llrtLayer = new lambda.LayerVersion(this, "LlrtLayer", {
      code: lambda.Code.fromAsset("asset/llrt-lambda-arm64.zip"),
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_18_X,
        lambda.Runtime.PROVIDED_AL2,
      ],
      compatibleArchitectures: [lambda.Architecture.ARM_64],
    })

    // Lambda 関数を作成
    const llrtLambda = new lambda.Function(this, 'llrtLambdaSample', {
      functionName: "llrt-lambda-sample",
      code: lambda.Code.fromAsset('sample-lambda/src/'),
      handler: 'index.handler',
      //runtime: lambda.Runtime.PROVIDED_AL2,
      runtime: lambda.Runtime.NODEJS_18_X
      // architecture: lambda.Architecture.ARM_64,
      // layers: [llrtLayer],
    });
    // Function URLsを付与
    const functionUrl = llrtLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    })
  }
}