# pub finance site

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## `netlify dev`

Runs the app in the development mode.\
Open [http://localhost:8888](http://localhost:8888) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

And it'll also make available the netlify functions locally to test against.

## Netlify back end

MORALIS_API_KEY must be specified in the Netlify environment variables, this key can be retrieved from the moralis.io dashboard after setting up an account.

A server in Moralis will then need to be created for each chain you wish to query.

Example calls:

### GetBalance

BSC Testnet:
`$ netlify functions:invoke --payload '{"chain": 97,"addressToCheck": "your_address", "token": "0x6DbcC67369c9F3D1CB75B07aAC421c6E9700C62d"}' getBalance`

Avax Fuji:
`$ netlify functions:invoke --payload '{"chain": 43113,"addressToCheck": "your_address", "token": "0xeC104B9cA585c73D38b87397Cd3B34417Be0EDf6"}' getBalance`

It's also possible to specify no token address and receive all balances:

`$ netlify functions:invoke --payload '{"chain": 43113,"addressToCheck": "your_address"}' getBalance`

### GetERC20Metadata

`$ netlify functions:invoke getERC20Metadata`
