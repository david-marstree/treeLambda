import { LambdaClient, InvokeCommand, } from "@aws-sdk/client-lambda";
/**
 * @access private
 * @abstract for create lambda client from aws
 * @param {*} config REGION
 * @returns
 */
export const createClient = (config) => new LambdaClient(config);
export const invoke = async (name, data = {}, config, lambdaClient) => {
    const { region, env = null } = config;
    let client = lambdaClient;
    if (!lambdaClient) {
        client = createClient({ region });
    }
    if (!client)
        return false;
    return await invokeObject({
        client,
        name: !!env ? `${name}-${env}` : name,
        data,
    });
};
export const invokeObject = async ({ client, name, data = {}, }) => {
    try {
        const command = new InvokeCommand({
            FunctionName: name,
            InvocationType: "RequestResponse",
            LogType: "None",
            Payload: JSON.stringify(data),
        });
        const { Payload: result } = await client.send(command);
        if (!result)
            return false;
        const jsonString = Buffer.from(result).toString("utf8");
        const parsedData = JSON.parse(jsonString);
        return parsedData;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
export default { createClient, invoke, invokeObject };
