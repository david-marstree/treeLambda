import { LambdaClient, LambdaClientConfig } from "@aws-sdk/client-lambda";
/**
 * @access private
 * @abstract for create lambda client from aws
 * @param {*} config REGION
 * @returns
 */
export declare const createClient: (config: LambdaClientConfig) => LambdaClient;
/**
 * @access public
 * @abstract invoke lambda function from aws
 * @param {*} name String
 * @param {*} data object for request lambda
 * @param {*} config object for create ssmclient
 * @return {*} values
 */
export type PayloadData = {
    [key: string]: any;
};
export type InvokeConfig = {
    env?: string | undefined | null;
};
export type InvokeProps = {
    client: LambdaClient;
    name: string;
    data?: PayloadData;
};
export declare const invoke: (name: string, data: PayloadData | undefined, config: LambdaClientConfig & InvokeConfig, lambdaClient?: LambdaClient) => Promise<any>;
export declare const invokeObject: ({ client, name, data, }: InvokeProps) => Promise<any>;
declare const _default: {
    createClient: (config: LambdaClientConfig) => LambdaClient;
    invoke: (name: string, data: PayloadData | undefined, config: LambdaClientConfig & InvokeConfig, lambdaClient?: LambdaClient | undefined) => Promise<any>;
    invokeObject: ({ client, name, data, }: InvokeProps) => Promise<any>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map