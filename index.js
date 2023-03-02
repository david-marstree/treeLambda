const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');


/**
 * @access private
 * @abstract for create lambda client from aws
 * @param {*} config REGION
 * @returns 
 */
const _createClient = (config) => (new LambdaClient(config));


/**
 * @access public
 * @abstract invoke lambda function from aws
 * @param {*} name String
 * @param {*} data object for request lambda
 * @param {*} config object for create ssmclient
 * @return {*} values 
 */
exports.invoke = async (name, data = {}, config) => {
    const { region, env = null } = config;
    try {
        const client = _createClient({ region });
        const command = new InvokeCommand({
            FunctionName: (!!env) ? `${name}-${env}` : name,
            InvocationType: 'RequestResponse',
            LogType: 'None',
            Payload: JSON.stringify(data),
        });
        const { Payload } = await client.send(command);
        const jsonString = Buffer.from(Payload).toString('utf8');
        const parsedData = JSON.parse(jsonString);

        return parsedData

    } catch (error) {
        console.log(error);
        return false
    }
}