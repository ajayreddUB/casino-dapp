// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./CasinoChip.sol"; // Your ERC20 contract
import "./CasinoNFT.sol"; // Your ERC721 contract

contract CasinoItems is ERC1155 {
    CasinoChip private casinoChip; // Instance of ERC20 contract
    CasinoNFT private casinoNFT; // Instance of ERC721 contract

    // Unique IDs for different types of tokens
    uint256 private constant CHIP_ID = 1;
    uint256 private constant NFT_ID = 2;
    uint256 private seed=1234;
    address public owner;

    constructor(address payable _casinoChipAddress, address _casinoNFTAddress) ERC1155("Casino1155") {
        owner = msg.sender;
        casinoChip = CasinoChip(_casinoChipAddress);
        casinoNFT = CasinoNFT(_casinoNFTAddress);
    }

    // Updated mint function with only owner access
    // function mint(address to, uint256 id, uint256 amount, string memory tokenURI) public {
    //     require(msg.sender == owner, "Only the owner can mint");
    //     if (id == CHIP_ID) {
    //         casinoChip.mint(to, amount); // Mint ERC20 tokens
    //     } else if (id == NFT_ID) {
    //         casinoNFT.mintNFT(to, tokenURI); // Mint ERC721 tokens
    //     }
    // }
    function uri(uint256 tokenId) public view override returns (string memory) {
        if (tokenId >= NFT_ID) { // Assuming NFT_ID and upwards are for ERC-721 tokens
            return casinoNFT.tokenURI(tokenId); // Directly get the URI from the CasinoNFT contract
        } else {
            return super.uri(tokenId); // Or return a default URI
        }
    }
    // Custom balanceOf function
    function balanceOf(address account, uint256 id) public view override returns (uint256) {
        if (id == CHIP_ID) {
            // Return balance from CasinoChip (ERC20) contract
            return casinoChip.balanceOf(account);
        } else if (id >= NFT_ID) {
            // For ERC-721, return 1 if owned, 0 if not
            // This requires iterating through NFTs or maintaining a mapping
            // Here, we assume a simple case where NFT_ID directly maps to a tokenId
            return casinoNFT.ownerOf(id) == account ? 1 : 0;
        } else {
            super.balanceOf(account,id);
        }
    }

    // Custom balanceOfBatch function
    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
        public
        view
        override
        returns (uint256[] memory)
    {
        require(accounts.length == ids.length, "accounts and ids length mismatch");

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }
    function buyNFTWithERC20(uint256 tokenId, uint256 erc20Amount) public {
        uint256 nftPrice = casinoNFT.tokenPrices(tokenId);
        require(nftPrice > 0, "NFT not for sale or invalid token ID");
        require(erc20Amount >= (nftPrice/casinoChip.tokenPrice())* 10 **casinoChip.decimals(), "Not enough ERC20 tokens to buy the NFT");

        address nftOwner = casinoNFT.ownerOf(tokenId);
        require(nftOwner != msg.sender, "Cannot buy your own NFT");

        // Transfer ERC20 tokens from buyer to NFT owner
        casinoChip.transferFrom(msg.sender, nftOwner, erc20Amount);

        // Transfer NFT ownership from current owner to buyer
        casinoNFT.safeTransferFrom(nftOwner, msg.sender, tokenId);

        // Optionally, reset the NFT price or perform any other post-purchase logic
        casinoNFT.setPrice(tokenId, 0);
    }
   

    function rollDice(uint256 betAmount, uint256 chosenNumber, uint256 userProvidedSeed) public {
        require(casinoChip.balanceOf(msg.sender) >= betAmount, "Insufficient CasinoChip balance");
        casinoChip.transferFrom(msg.sender, casinoChip.owner(), betAmount);

        // Update seed with user input and block difficulty (can also use timestamp)
        seed = uint256(keccak256(abi.encodePacked(seed, userProvidedSeed, msg.sender)));
        seed = uint(keccak256(abi.encodePacked(block.timestamp, seed, msg.sender))) % 100;


        uint256 winningNumber = (seed % 6) + 1;

        if (winningNumber == chosenNumber) {
            uint256 reward = betAmount * 5;
            require(casinoChip.balanceOf(casinoChip.owner()) >= reward, "Insufficient CasinoChip in owner");
            casinoChip.transferFrom(casinoChip.owner(),msg.sender, reward);
        }
        // In case of loss, the betAmount is already transferred to the contract
    }

    function buyTokens() external payable {
        casinoChip.buyTokens{value: msg.value}(msg.sender);
    }

    function withdrawTokens(uint256 tokenAmount) external {
        casinoChip.withdrawTokens(msg.sender, tokenAmount);
    }

    function transferTokens(address recipient, uint256 amount) external {
        casinoChip.transferTokens(msg.sender, recipient, amount);
    }

    function setPriceofNFT(uint256 tokenId, uint256 price) public {
        casinoNFT.setPrice(tokenId, price);
    }

    function buyNFTWithETH(uint256 tokenId) public payable {
        casinoNFT.buyNFT{value: msg.value}(tokenId);
    }

    // Withdraw ETH (similar to your existing contracts)
    function withdrawETH() external {
        require(msg.sender == owner, "Only the owner can withdraw ETH");
        payable(owner).transfer(address(this).balance);
        casinoChip.withdrawETH(msg.sender);
    }
    // Custom batch transfer function for represented ERC-20 and ERC-721 tokens
    function customSafeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public {
        require(ids.length == amounts.length, "IDs and amounts length mismatch");

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            if (id == CHIP_ID) {
                // Logic for transferring the represented ERC-20 tokens
                require(casinoChip.balanceOf(from) >= amount, "Insufficient ERC-20 balance");
                casinoChip.transferFrom(from, to, amount);
            } else if (id >= NFT_ID) {
                // Logic for transferring the represented ERC-721 token
                require(amount == 1, "Can only transfer one ERC-721 token at a time");
                require(casinoNFT.ownerOf(amount) == from, "ERC-721 token not owned by sender");
                casinoNFT.safeTransferFrom(from, to, amount);
            } else {
                revert("Invalid token type");
            }
        }

        // Optionally, emit a custom event or handle any additional logic
    }
}
