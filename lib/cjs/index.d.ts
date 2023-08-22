import { LambdaClientConfig } from "@aws-sdk/client-lambda";
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
export type InvokeConfig = LambdaClientConfig & {
    env?: string | undefined | null;
};
declare const _default: {
    invoke: (name: string, data: PayloadData | undefined, config: InvokeConfig) => Promise<any>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map