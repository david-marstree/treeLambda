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
export const createClient = (config: LambdaClientConfig): LambdaClient =>
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

export type InvokeConfig = {
  env?: string | undefined | null;
};

export type InvokeProps = {
  client: LambdaClient;
  name: string;
  data?: PayloadData;
};

export const invoke = async (
  name: string,
  data: PayloadData = {},
  config: LambdaClientConfig & InvokeConfig,
  lambdaClient?: LambdaClient,
) => {
  const { region, env = null } = config;
  let client: LambdaClient | undefined = lambdaClient;
  if (!lambdaClient) {
    client = createClient({ region });
  }
  if (!client) return false;
  try {
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

export const invokeObject = async ({
  client,
  name,
  data = {},
}: InvokeProps) => {
  if (!client) return false;
  try {
    const command = new InvokeCommand({
      FunctionName: name,
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

export default { createClient, invoke, invokeObject };
