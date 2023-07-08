# Project Title

Single Asset Staking Platform for cryptocurrency projects.

## Description

This project is a staking platform for crypto tokens. It is designed specifically for one token, but it can be easily cloned and modified to support other tokens for single asset staking.

## Live Preview

![App Screenshot](https://i.postimg.cc/1XYYSSLZ/unistake.png)

## Features

- Overview of staked tokens, APR, your token deposits, and earned tokens.
- Claim rewards, withdraw tokens, and deposit tokens functionality.
- Support for four different wallet providers: Metamask, Portis, Wallet Connect, and Coinbase Wallet.
- Fully responsive design that works on all screen sizes.
- Option to mint UNI Tokens for testing.
- Runs on Mumbai testnet.

## Tech Stack

- Frontend: React (with TypeScript), Redux and TailwindCSS
- Backend (smart contract layer): Solidity, Hardhat and Chai/Mocha for testing

## How to Use

1. Connect your wallet (Metamask, Portis, Wallet Connect, or Coinbase Wallet).
2. Mint some UNI Tokens for testing by clicking the button below the overview screen on the main page.
3. Click on the deposit button to view the current staking overview.
4. Choose to claim rewards, withdraw tokens, or deposit tokens.
5. See your staking overview update live right in front of your eyes!

## Setup

To run this project locally, you need to follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Start the local server using `npm start`.
4. Make sure your wallet is connected to the Mumbai testnet to properly test the website.

## Smart contract layer

In order to read in-depth about the implementation of the staking contract, please visit the smart-contract folder. The smart contract is an updated version of SYNTHETIX's implementation of a staking contract.

## Contributing

Contributions are always welcome!
