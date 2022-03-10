//
// gets balance from an ERC20 contract
//
// expects the following payload:
// payload = { chain: number, addressToCheck: string [, token: string]}
//

const axios = require("axios");
const ethers = require("ethers");

const MORALIS_API_KEY = process.env.MORALIS_API_KEY; // pull key from Netlify
const MORALIS_BASE = "https://deep-index.moralis.io/api/v2/"

// useful addresses
// const PINT_BSC_TEST = "0x6DbcC67369c9F3D1CB75B07aAC421c6E9700C62d"
// const PINT_AVAX_FUJI = "0xeC104B9cA585c73D38b87397Cd3B34417Be0EDf6"

exports.handler = async event => {

  // require a POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: 'Method Not Allowed, Must POST', headers: { "Allow": "POST" } }
  }

  // get the payload
  const data = JSON.parse(event.body)

  // for now we require the payload to include an address to check the balance of, and a chain
  if (!data.addressToCheck || !data.chain) {
    return { statusCode: 422, body: '"addressToCheck" and "chain" are required parameters' }
  }

  const chain = strToHex(data.chain); // moralis expects hexed chain IDs (strings), not numbers
  const erc20 = data.token || ""; // if erc20 isn't passed, Moralis will return all balances
  const addressToCheck = data.addressToCheck;

  // build the API URL
  const MORALIS_ENDPOINT = `${addressToCheck}/erc20`
  const MORALIS_PARAMS = `?chain=${chain}&token_addresses=${erc20}`
  const URL = MORALIS_BASE + MORALIS_ENDPOINT + MORALIS_PARAMS;

  const REQ_OPTS = {
    url: URL,
    method: "get",
    headers: {
      accept: "application/json",
      "X-API-Key": MORALIS_API_KEY
    }
  }

  let response;
  try {
    response = await axios.get(URL, REQ_OPTS);

    // DEBUG:
    // console.log(event.queryStringParameters);
    // console.log('response:', response)
    // console.log('response.data:', response.data);
    return {
       statusCode: response.status,
       body: JSON.stringify(response.data),
      };

  } catch (e) {
    // DEBUG:
    // console.error("error while getting data...", e)
    if(e.code === "ERR_HTTP_INVALID_HEADER_VALUE"){
      e = "\nPlease set MORALIS_API_KEY in Netlify Environment Variables"
    };

    return {
      statusCode: 500,
      body: "Error while fetching data from moralis: " + e,
    }
  }
}

//
// begin helper functions
//

function strToHex(string){
  try {
    return ethers.utils.hexlify(string)
  } catch (e) {

    return {
      statusCode: 500,
      body: "Error while hexlifying data:" + e,
    }
  }
}
