"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const invoke = (name, data = {}, config, lambdaClient) => __awaiter(void 0, void 0, void 0, function* () {
    const { region, env = null } = config;
    let client = lambdaClient;
    if (!lambdaClient) {
        client = (0, exports.createClient)({ region });
    }
    if (!client)
        return false;
    try {
        const command = new client_lambda_1.InvokeCommand({
            FunctionName: !!env ? `${name}-${env}` : name,
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
exports.invoke = invoke;
const invokeObject = ({ client, name, data = {}, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!client)
        return false;
    try {
        const command = new client_lambda_1.InvokeCommand({
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
exports.invokeObject = invokeObject;
exports.default = { createClient: exports.createClient, invoke: exports.invoke, invokeObject: exports.invokeObject };
