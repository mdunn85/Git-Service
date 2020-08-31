import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import * as apiGateway from "@aws-cdk/aws-apigateway"

export class GitServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "GitServiceVpc", {
      maxAzs: 2
    });

    const cluster = new ecs.Cluster(this, "GitServiceCluster", {
      vpc: vpc
    });

    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "GitServiceFargate", {
      cluster: cluster,
      taskImageOptions: { image: ecs.ContainerImage.fromAsset('../'), containerPort: 3000 },
    });

    const vpcLink = new apiGateway.VpcLink(this, 'GitServiceVpcLink', {
      vpcLinkName: 'GitServiceAPI',
      targets: [ fargateService.loadBalancer ]
    })

    const integration = new apiGateway.Integration({
      uri: 'http://' + fargateService.loadBalancer.loadBalancerDnsName + '/{proxy}',
      type: apiGateway.IntegrationType.HTTP_PROXY,
      options: {
        connectionType: apiGateway.ConnectionType.VPC_LINK,
        vpcLink: vpcLink,
        requestParameters: {
          'integration.request.path.proxy': 'method.request.path.proxy'
        }
      }
    })

    const api = new apiGateway.RestApi(this, 'GitServiceApiGateway', {
      restApiName: 'GitServiceApi'
    })

    api.root.addProxy({
      defaultIntegration: integration,
      defaultMethodOptions: {
        requestParameters: { 'method.request.path.proxy': true }
      }
    })

  }
}
