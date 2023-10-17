var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LambdaClient, InvokeCommand, } from "@aws-sdk/client-lambda";
/**
 * @access private
 * @abstract for create lambda client from aws
 * @param {*} config REGION
 * @returns
 */
export const createClient = (config) => new LambdaClient(config);
export const invoke = (name, data = {}, config, lambdaClient) => __awaiter(void 0, void 0, void 0, function* () {
    const { region, env = null } = config;
    let client = lambdaClient;
    if (!lambdaClient) {
        client = createClient({ region });
    }
    if (!client)
        return false;
    return yield invokeObject({
        client,
        name: !!env ? `${name}-${env}` : name,
        data,
    });
});
export const invokeObject = ({ client, name, data = {}, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = new InvokeCommand({
            FunctionName: name,
            InvocationType: "RequestResponse",
            LogType: "None",
            Payload: JSON.stringify(data),
        });
        const { Payload: result } = yield client.send(command);
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
});
export default { createClient, invoke, invokeObject };
