//SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../interfaces/ICandyMachineFactory.sol";
import "./CandyMachine.sol";

/*
 * The CandyMachineStorage contract contains all of the Contract's state variables which are then inherited by Contract.
 * Via this seperation of storage and logic we ensure that Contract's state variables come first in the storage layout
 * and that Contract has the ability to change the list of contracts it inherits from in the future via upgradeability.
 */
contract CandyMachineFactory is ICandyMachineFactory, UUPSUpgradeable, OwnableUpgradeable {
  /*
   * Initalizes the state variables.
   */
  function initialize() public initializer {
    __Ownable_init();
  }

  /*
   * @notice Authorizes contract upgrades only for the contract owner (contract deployer) via the onlyOwner modifier.
   */
  function _authorizeUpgrade(address) internal override onlyOwner {}

  function newCandyMachine(string[] calldata _metadataURIs, address _owner) external returns(address newCM) {
    CandyMachine candyMachine = new CandyMachine();
    candyMachine.initialize(_metadataURIs, _owner);
    return address(candyMachine);
  }
}
