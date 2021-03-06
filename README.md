# Raiden API SDK

[![npm version](https://badge.fury.io/js/raiden-api-sdk.svg)](https://badge.fury.io/js/raiden-api-sdk)
[![Build Status](https://travis-ci.com/drdgvhbh/raiden-api-sdk.svg?branch=master)](https://travis-ci.com/drdgvhbh/raiden-api-sdk)
[![Downloads](https://img.shields.io/npm/dt/raiden-api-sdk)](https://img.shields.io/npm/dt/raiden-api-sdk)

This is an typescript SDK for interacting with the [Raiden API](https://raiden-network.readthedocs.io/en/latest/rest_api.html).

[Raiden](https://raiden.network) is a second-layer solution for doing payments on [Ethereum](https://www.ethereum.org/).

Also checkout the raw SDK generated using openapi [here](https://github.com/drdgvhbh/raiden-openapi-sdk).

Winning submission for the [Grow Ethereum — Build A Raiden Library In Your Favorite Programming Language challenge](https://gitcoin.co/issue/raiden-network/hackathons/4/3284).

## Installation

`npm install raiden-api-sdk`

## Documentation

https://raiden-api.drdgvhbh.site/

## Running the Tests

`npm run test`

## Usage

```typescript
import Raiden, { Configuration, NewToken } from 'raiden-api-sdk';

// Defaults to http://127.0.0.1:5001/api/v1
const raiden = Raiden.create();

const configuration = new Configuration({
  basePath: 'http://127.0.0.1:5002/api/v1',
});
const raiden2 = Raiden.create(configuration);

const tokenAddress = '0x022E292b44B5a146F2e8ee36Ff44D3dd863C915c';

(async () => {
  const partnerAddress = await raiden2.node.ourAddress().toPromise();

  await raiden.tokens.register(tokenAddress).toPromise();

  const channel = await raiden.channels
    .open({
      tokenAddress,
      partnerAddress,
      totalDeposit: 6 * Math.pow(10, 18),
      settleTimeout: 500,
    })
    .toPromise();

  const paymentReceipt = await raiden.payments
    .initiate(
      NewToken(channel.tokenAddress, 3 * Math.pow(10, 18)),
      channel.partnerAddress,
    )
    .toPromise();

  console.log(paymentReceipt.identifier);
})();
```

## Contributing

Submit a PR, documenting the change and what version of the Raiden client you are using.
