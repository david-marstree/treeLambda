"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeObject = exports.invoke = exports.createClient = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
/**
 * @access private
 * @abstract for create lambda client from aws
 * @param {*} config REGION
 * @returns
 */
const createClient = (config) => new client_lambda_1.LambdaClient(config);
exports.createClient = createClient;
const invoke = async (name, data = {}, config, lambdaClient) => {
    const { region, env = null } = config;
    let client = lambdaClient;
    if (!lambdaClient) {
        client = (0, exports.createClient)({ region });
    }
    if (!client)
        return false;
    return await (0, exports.invokeObject)({
        client,
        name: !!env ? `${name}-${env}` : name,
        data,
    });
};
exports.invoke = invoke;
const invokeObject = async ({ client, name, data = {}, }) => {
    try {
        const command = new client_lambda_1.InvokeCommand({
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
exports.invokeObject = invokeObject;
exports.default = { createClient: exports.createClient, invoke: exports.invoke, invokeObject: exports.invokeObject };
