// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CasinoChip is ERC20 {
    address public owner;
    // token=0.01eth
    uint256 public constant tokenPrice = 10000000000000000 wei; // Price of one token in ETH,token=0.1

    constructor(uint256 _initialsuppy) ERC20("CasinoChip", "CCHIP") {
        owner = msg.sender;
        _mint(msg.sender, _initialsuppy * 10 ** decimals()); 
    }

    // Buy tokens with ETH
    function buyTokens(address sender) external payable {
        require(msg.value > 0, "You need to send some Ether");
        uint256 amountToBuy = (msg.value / tokenPrice) * 10 ** decimals();
        require(balanceOf(owner) >= amountToBuy, "Not enough tokens available");
        _transfer(owner, sender, amountToBuy);
    }
    

    // Withdraw tokens and receive ETH back
    function withdrawTokens(address sender, uint256 tokenAmount) external {
        require(balanceOf(sender) >= tokenAmount, "Insufficient token balance");
        _transfer(sender, owner, tokenAmount);
        payable(sender).transfer((tokenAmount / 10** decimals()) * tokenPrice);
    }
    
    // Transfer tokens to another address
    function transferTokens(address sender, address recipient, uint256 amount) external {
        _transfer(sender, recipient, amount);
    }
    

    // Allows the contract to receive ETH
    receive() external payable {}

    // Withdraw ETH from the contract (only owner)
    function withdrawETH(address sender) external {
        require(sender == owner, "Only the owner can withdraw ETH");
        payable(owner).transfer(address(this).balance);
    }
}
