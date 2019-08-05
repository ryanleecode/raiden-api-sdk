# Raiden API SDK

This is an typescript SDK for interacting with the [Raiden API](https://raiden-network.readthedocs.io/en/stable/rest_api.html).

It is built on top of the [openapi generated sdk](https://github.com/drdgvhbh/raiden-openapi-sdk).

## Installation

`npm install raiden-api-sdk`

## Documentation

// TODO

## Usage

```typescript
import Raiden, { Configuration } from 'raiden-api-sdk';
import { NewToken } from './payments';

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
