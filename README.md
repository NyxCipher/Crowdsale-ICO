# Crowdsale-ICO
A Crowdsale ICO with React Front-End and a Proof of Stake Implementation written in Solidity
This is a working ICO with KYC and Front-End - I added Staking Function to the token, one of the tests are failing to withdraw tokens.

npm install truffle
npm install ganache-cli
npm install @openzeppelin/contracts@beta3.0.0

Truffle unbox react

npx ganache-cli

truffle migrate --network develop

truffle test

Failing at PoS Test: Withdraw
