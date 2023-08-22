const treeLambda = require("../lib/cjs/");
const {createClient} = require('pexels');

const main = async () => {
  const result = await treeLambda.invoke("buildLinkSecret", {}, {
    region: "ap-southeast-1",
    env:'main'
  });

  const client = createClient(result.PEXELS_API_KEY)
  const response = await client.photos.search({
     query: "cat",
     per_page: 1
   })

  console.log(response)

  return result

}

main()
