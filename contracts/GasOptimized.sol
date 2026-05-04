// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GasOptimized {
    uint256[] public numbers;

    // Slightly optimized: avoids unnecessary operations
    function addNumbers(uint256 n) public {
        for (uint256 i = 0; i < n; i++) {
            numbers.push(i);
        }
    }

    // Optimized: cache array length in memory
    function sumNumbers() public view returns (uint256) {
        uint256 sum = 0;
        uint256 len = numbers.length; // cache length

        for (uint256 i = 0; i < len; i++) {
            sum += numbers[i];
        }

        return sum;
    }
}