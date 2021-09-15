import React, { Component } from 'react';
import VolcanoTokenContract from './contracts/VolcanoToken.json';
import getWeb3 from './getWeb3';
import { NFTStorage, File } from 'nft.storage';

import './App.css';

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const deployedNetwork = VolcanoTokenContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VolcanoTokenContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      console.log(await instance.methods.owner().call());

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { web3, accounts, contract } = this.state;
    const account = accounts[0];
    const { owner, symbol, mint, getOwnership } = contract.methods;
    console.log(contract.methods);
    console.log(account);
    console.log(await owner().call());
    console.log(await symbol().call());
    //await mint("hola").send({ from: account });
    let o = await getOwnership(account).call();
    console.log(o);
    //this.uploadNFT('Pinpie','Pin is not delicious beef!');
    //let mi = await mint("http://demo.com").send({ from: this.account });
    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.owner();
    //console.log(await response.call());

    // Update state with the result.
    //this.setState({ storageValue: response });
  };

  uploadNFT = async (name, description) => {
    const apiKey = '<API KEY>';
    const client = new NFTStorage({ token: apiKey });

    const metadata = await client.store({
      name: name,
      description: description,
      image: new File(
        [
          /* data */
        ],
        'pinpie.jpg',
        { type: 'image/jpg' }
      )
    });
    console.log(metadata.url);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>NFT Exchange</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>
          The stored value is: {this.state.storageValue}
        </div>
      </div>
    );
  }
}

export default App;
