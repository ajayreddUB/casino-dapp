// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CasinoNFT is ERC721URIStorage {
    // using SafeMath for uint256;
    address public owner;
    uint256 public tokenCounter;
    mapping(uint256 => uint256) public tokenPrices;
    address public authorizedMinter;

    constructor(address initialOwner) ERC721("CasinoNFT", "CNFT") {
        owner = initialOwner;
        tokenCounter = 2;
        mintNFT(
            initialOwner,
            "https://ipfs.io/ipfs/QmWxS5RZbnGVVTCWmCCFXpyfAFwRJXGAuph8rxd7V5m8Mf"
        );
        mintNFT(
            initialOwner,
            "https://ipfs.io/ipfs/QmSArxHhC5vkVKB1ijAauKhb2e4BU2HuLdHkGsowbxq6Tr"
        );
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function setAuthorizedMinter(address _minter) public onlyOwner {
        authorizedMinter = _minter;
    }

    function mintNFT(address to, string memory tokenURI) public {
        uint256 tokenId = tokenCounter;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenCounter = tokenCounter + 1;
    }

    function setPrice(uint256 tokenId, uint256 price) public {
        // require(msg.sender == owner() || msg.sender == authorizedMinter, "Not authorized to set price");
        require(tokenId > 0 && tokenId < tokenCounter, "Token does not exist");
        tokenPrices[tokenId] = price;
    }

    function _approveContract(
        address ownerNFT,
        address erc1155ContractAddress
    ) external {
        if (!isApprovedForAll(ownerNFT, erc1155ContractAddress)) {
            _setApprovalForAll(ownerNFT, erc1155ContractAddress, true);
        }
    }

    function buyNFT(uint256 tokenId) public payable {
        uint256 price = tokenPrices[tokenId];
        require(price > 0, "NFT not for sale");
        require(msg.value == price, "Incorrect value");
        payable(owner).transfer(msg.value);
        _transfer(owner, msg.sender, tokenId);

        tokenPrices[tokenId] = 0;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner).transfer(balance);
    }
}
