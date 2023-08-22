import {
  LambdaClient,
  InvokeCommand,
  LambdaClientConfig,
} from "@aws-sdk/client-lambda";

/**
 * @access private
 * @abstract for create lambda client from aws
 * @param {*} config REGION
 * @returns
 */
const _createClient = (config: LambdaClientConfig): LambdaClient =>
  new LambdaClient(config);

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

const invoke = async (
  name: string,
  data: PayloadData = {},
  config: InvokeConfig,
) => {
  const { region, env = null } = config;
  try {
    const client = _createClient({ region });
    const command = new InvokeCommand({
      FunctionName: !!env ? `${name}-${env}` : name,
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: JSON.stringify(data),
    });
    const { Payload: result } = await client.send(command);
    if (!result) return false;
    const jsonString = Buffer.from(result).toString("utf8");
    const parsedData = JSON.parse(jsonString);

    return parsedData;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default { invoke };
