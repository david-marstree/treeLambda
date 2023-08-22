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
exports.invoke = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
/**
 * @access private
 * @abstract for create lambda client from aws
 * @param {*} config REGION
 * @returns
 */
const _createClient = (config) => new client_lambda_1.LambdaClient(config);
const invoke = (name, data = {}, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { region, env = null } = config;
    try {
        const client = _createClient({ region });
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
exports.default = { invoke: exports.invoke };
