const VolcanoToken = artifacts.require('VolcanoToken');
const { assert, expect } = require('chai');
//const truffleAssert = artifacts.require('truffle-assertions');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('VolcanoToken', function(accounts) {
  it('should mint a token NFT 1', async function() {
    const contract = await VolcanoToken.deployed();
    await contract.mint(
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      { from: accounts[0] }
    );
    let metadata = await contract.getOwnership(accounts[0]);
    assert.equal(metadata[0].tokenId, 1, 'Token Id minted');
  });

  it('should mint a token NFT 2', async function() {
    const contract = await VolcanoToken.deployed();
    await contract.mint(
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      { from: accounts[0] }
    );
    let metadata = await contract.getOwnership(accounts[0]);
    assert.equal(metadata[1].tokenId, 2, 'Token Id minted');
  });

  it('should mint a token NFT 3', async function() {
    const contract = await VolcanoToken.deployed();
    await contract.mint(
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      { from: accounts[0] }
    );
    let metadata = await contract.getOwnership(accounts[0]);
    assert.equal(metadata[2].tokenId, 3, 'Token Id minted');
  });

  it('should mint a token NFT 4', async function() {
    const contract = await VolcanoToken.deployed();
    await contract.mint(
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      { from: accounts[0] }
    );
    let metadata = await contract.getOwnership(accounts[0]);
    assert.equal(metadata[3].tokenId, 4, 'Token Id minted');
  });

  it('should burn two tokens NFT 3 and 1', async function() {
    const contract = await VolcanoToken.deployed();
    await contract.burn(3, { from: accounts[0] });
    await contract.burn(1, { from: accounts[0] });
    let metadata = await contract.getOwnership(accounts[0]);
    assert.equal(metadata.length, 2, 'Tokens availables');
    assert.equal(metadata[0].tokenId, 2, 'Token 2 is correct');
    assert.equal(metadata[1].tokenId, 4, 'Token 2 is correct');

    //expect().to.throw(new Error("Returned error: VM Exception while processing transaction: revert ERC721: owner query for nonexistent token -- Reason given: ERC721: owner query for nonexistent token."));
    //await expect(() =>
    //  contract
    //    .burn(tokenId, { from: accounts[0] })
    //    .to.be.revertedWith('caller is not the owner')
    //);
    /*await truffleAssert.fails(
      contract.tokenId(),
      truffleAssert.ErrorType.REVERT,
      'ERC721: owner query for nonexistent token'
    );*/
    //assert.equal(tokenId.toNumber(), 1, 'Token 1 minted');
  });

  it('should transfer NFT 2 from account 0 to 1', async function() {
    const contract = await VolcanoToken.deployed();
    let owner = await contract.ownerOf(2);
    const new_owner = accounts[1];
    assert.equal(owner, accounts[0], 'Token Owner');
    await contract.transfer(new_owner, 2, { from: accounts[0] });
    owner = await contract.ownerOf(2);
    assert.equal(owner, accounts[1], 'New Token Owner');
    let metadataFrom = await contract.getOwnership(accounts[0]);
    let metadataTo = await contract.getOwnership(accounts[1]);
    assert.equal(metadataFrom[0].tokenId, 4, 'Token 2 is correct');
    assert.equal(metadataTo[0].tokenId, 2, 'Token 2 is correct');
  });
});
