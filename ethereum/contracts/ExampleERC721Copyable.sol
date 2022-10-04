// SPDX-License-Identifier: MIT

/*
 * Original credit to: @sidarth16 (https://github.com/sidarth16)
 * From: https://github.com/sidarth16/Rentable-NFTs/blob/main/contracts/RentableNft.sol
 */

pragma solidity ^0.8.0; 

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";

import "../interfaces/IERC721CopyableUpgradeable.sol";

contract ExampleERC721Copyable is ERC721URIStorageUpgradeable, IERC721CopyableUpgradeable {

  function initialize() public initializer {
    __ERC721_init("TestCopyableNFT","TCN");
  }

  function mintCopy(address _to, uint256 _tokenIdMaster, uint256 _tokenIdCopy) external {
    _safeMint(_to, _tokenIdCopy);
    _setTokenURI(_tokenIdCopy, tokenURI(_tokenIdMaster));
  }
}