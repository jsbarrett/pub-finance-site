//
// gets metadata from an ERC20 contract (Name, Symbol, etc...)
//
const axios = require('axios');

const MORALIS_API_KEY = process.env.MORALIS_API_KEY; // pull key from Netlify

const MORALIS_BASE = "https://deep-index.moralis.io/api/v2/"
const MORALIS_ENDPOINT = "erc20/metadata"
const MORALIS_PARAMS = "?chain=bsc%20testnet&addresses=0x6DbcC67369c9F3D1CB75B07aAC421c6E9700C62d"

const URL = MORALIS_BASE + MORALIS_ENDPOINT + MORALIS_PARAMS;

const REQ_OPTS = {
  url: URL,
  method: "get",
  headers: {
    accept: "application/json",
    "X-API-Key": MORALIS_API_KEY
  }
}

exports.handler = async event => {
  let response;
  try {
    response = await axios.get(URL, REQ_OPTS);
    // DEBUG:
    // console.log('response.data:', response.data);
    return {
       statusCode: response.status,
       body: JSON.stringify(response.data),
      };

  } catch (e) {
    // DEBUG:
    // console.error("error while getting data...")
    return {
      statusCode: 500,
      body: "Error while fetching data from moralis: " + e,
    }
  }
}
