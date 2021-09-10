# dapp-nfts
Encode Academy - Create DApp to show details of and transfer NFTs

# Features:
Create DApp to show details of and transfer NFTs

## Front-end:
- Allows transfer of NFT’s (ERC721) in exchange for token (ERC20) between web3 accounts
- Values shown on front-end update regularly (~ once per second)
- Show market cap (list of NFT’s must be tracked and stored somewhere)
- Recommended written in NodeJS Express, however can use Flutter or ReactJS if preferred

## NFT:
- Store depiction (image/text etc) of NFT on IPFS (or any other suitable NFT storage platform)
- Link location to NFT when initially minted
- NFT allows transfer of ownership
- Each NFT has a value (# ERC20) (extra) value can be different

### Develop on local blockchain (extra) then deploy to a testnet
### (extra) Market cap of NFT market depends on
- Number of 721’s
- Liquidity available (increasing at an average rate)

### (extra) Data/state of NFT market should be stored on IPFS/other decentralised storage platform
### Keep code:
- Readable and well commented
- Modular
- Rely on standard libraries where possible
- Tested (next session)


# Truffle Box Installed
https://www.trufflesuite.com/boxes/react

# Installation
First ensure you are in a new and empty directory.

1. Run the unbox command via npx and skip to step 3. This will install all necessary dependencies. A Create-React-App is generated in the client directory.

```
npx truffle unbox react
```
2. Alternatively, you can install Truffle globally and run the unbox command.

```
npm install -g truffle
truffle unbox react
```
3. Run the development console.

```
truffle develop
```
4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with truffle.
```
compile
migrate
```
5. In the client directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
```
// in another terminal (i.e. not in the truffle develop prompt)
cd client
npm run start
```
6. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
```
// inside the development console.
test

// outside the development console..
truffle test
```
7. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
```
// ensure you are inside the client directory when running this
npm run test
```
8. To build the application for production, use the build script. A production build will be in the client/build folder.
```
// ensure you are inside the client directory when running this
npm run build
```