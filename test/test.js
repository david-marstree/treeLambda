const treeLambda = require("../lib/cjs/");

const main = async () => {
  const client = treeLambda.createClient({
    region: "ap-southeast-1",
  });
  const result = await treeLambda.invokeObject({
    client,
    name: "buildLinkSecret-main",
    data: {},
  });
  console.log("result", result);

  return result;
};

main();
