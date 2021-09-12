//SPDX-License-Identifier: UNLICENSED

pragma solidity >0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract VolcanoToken is Ownable, ERC721("Token NFT Christian Mora", "VTCM") {
    uint256 public tokenId = 1;
    mapping(address => Metadata[]) public ownership;

    struct Metadata {
        uint256 timestamp;
        uint256 tokenId;
        string tokenURI;
    }

    function getOwnership(address _user)
        public
        view
        returns (Metadata[] memory)
    {
        return ownership[_user];
    }

    function mint(string memory uri) public {
        _safeMint(_msgSender(), tokenId);
        Metadata[] storage tokens = ownership[_msgSender()];
        tokens.push(
            Metadata({
                timestamp: block.timestamp,
                tokenId: tokenId,
                tokenURI: uri
            })
        );
        ownership[_msgSender()] = tokens;
        tokenId++;
    }

    function burn(uint256 _tokenId) public onlyOwner {
        require(
            _msgSender() == ERC721.ownerOf(_tokenId),
            "Only Token owner can burn the token"
        );
        _burn(_tokenId);
        _remove(_msgSender(), _tokenId);
    }

    function _remove(address _owner, uint256 _tokenId) internal onlyOwner {
        Metadata[] storage array = ownership[_owner];
        uint256 j = 0;
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i].tokenId != _tokenId) {
                array[j] = array[i];
                j++;
            }
        }
        array.pop();
        ownership[_owner] = array;
    }

    function transfer(address _to, uint256 _tokenId) public {
        setApprovalForAll(_to, true);
        safeTransferFrom(_msgSender(), _to, _tokenId);
        _transferOwnership(_to, _tokenId);
    }

    function _transferOwnership(address _to, uint256 _tokenId) internal {
        require(_to != address(0), "Cannot transfer ownership to 0x0");
        require(
            _to == ERC721.ownerOf(_tokenId),
            "Only Token owner can transfer ownership the token"
        );
        Metadata[] storage arrayFrom = ownership[_msgSender()];
        Metadata[] storage arrayTo = ownership[_to];
        uint256 j = 0;
        for (uint256 i = 0; i < arrayFrom.length; i++) {
            if (arrayFrom[i].tokenId == _tokenId) {
                arrayTo.push(arrayFrom[i]);
            } else {
                arrayFrom[j] = arrayFrom[i];
                j++;
            }
        }
        arrayFrom.pop();
        ownership[_to] = arrayTo;
        ownership[_msgSender()] = arrayFrom;
    }
}
