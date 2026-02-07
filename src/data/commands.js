export const commands = {
    's3': {
        description: 'Simple Storage Service (S3) operations',
        subcommands: {
            'ls': {
                description: 'List S3 buckets or objects',
                execute: (args, state) => {
                    if (args.length === 0) {
                        const buckets = state.buckets || ['demo-bucket-1', 'assets-storage', 'logs-backup'];
                        return {
                            success: true,
                            output: buckets.map(b => `2024-02-06 12:00:00 ${b}`).join('\n')
                        };
                    }
                    return { success: true, output: 'objects in bucket...' };
                }
            },
            'mb': {
                description: 'Make bucket',
                execute: (args, state) => {
                    const bucketName = args[0]?.replace('s3://', '');
                    if (!bucketName) return { success: false, output: 'Error: Bucket name required' };
                    return {
                        success: true,
                        output: `make_bucket: s3://${bucketName}`,
                        reward: 100
                    };
                }
            }
        }
    },
    'ec2': {
        description: 'Elastic Compute Cloud (EC2) operations',
        subcommands: {
            'describe-instances': {
                description: 'List your EC2 instances',
                execute: () => ({
                    success: true,
                    output: JSON.stringify([
                        { InstanceId: 'i-04f7a2a9', Type: 't2.micro', State: 'running' }
                    ], null, 2)
                })
            }
        }
    },
    'help': {
        description: 'Show available commands',
        execute: () => ({
            success: true,
            output: 'Available services: s3, ec2, iam, lambda, cloudwatch\nTry: aws s3 ls'
        })
    }
};
