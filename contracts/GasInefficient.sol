// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GasInefficient {
    uint256[] public numbers;

    // Inefficient: repeated storage writes
    function addNumbers(uint256 n) public {
        for (uint256 i = 0; i < n; i++) {
            numbers.push(i);
        }
    }

    // Inefficient: repeated storage reads inside loop
    function sumNumbers() public view returns (uint256) {
        uint256 sum = 0;

        for (uint256 i = 0; i < numbers.length; i++) {
            sum += numbers[i]; // costly storage access each time
        }

        return sum;
    }
}