# Upgraded version of SYNTHETIX Single asset staking contract

This repo is meant to be used by projects that are in need of a single asset staking contract.

It is an upgraded version of Synthetix's single asset staking contract. It allows users to end the reward pool early, and the rewards from the previous reward pool are forwarded to the next reward pool.

This in practice means, that right now unlike in Synthetix version of the smart contract, you are actually able to end the reward pool early, and there is no "gap" in between the end of the reward pool and the moment the deployer adds more funds to the contract.

Also the contract supports a GRACE_PERIOD token lock. This means users cannot withdraw immediately without paying a 10% penalty fee. In order to withdraw the tokens, users must wait for 7 days (this is the default value).

This is a hardhat repository. Before doing anything run

```bash
yarn install
```

to install all the dependencies.

In order to properly run this project you must fill out .env file with the following variables:

```bash
MUMBAI_RPC_URL= // the rpc url for the mumbai testnet
GOERLI_RPC_URL= // the rpc url for the goerli testnet
PRIVATE_KEY= // private key of the account deploying the contracts
COINMARKETCAP_API_KEY= // coinmarketcap api key
POLYGONSCAN_API_KEY= // polygonscan api key
REPORT_GAS= // true or false
ETHERSCAN_API_KEY= // etherscan api key
```

To deploy the smart contract locally you need to write:

```bash
yarn hardhat deploy
```

Or if you wish to deploy to the mumbai testnet you must write:

```bash
yarn hardhat deploy --network mumbai
```

To run unit tests write:

```bash
yarn hardhat test
```
