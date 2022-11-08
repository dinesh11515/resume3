// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract Resume3 is ERC721 {


    uint256 public tokenCounter;
    uint256 public creatingPrice;

    address payable owner;

    mapping(address => string) public ipfsCid;
    mapping(uint256 => string) public tokenURIs;
    mapping(address => uint256) public tokenOwner;
    
    AggregatorV3Interface internal priceFeed;

    constructor() ERC721("Resume3", "RS3"){
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
        creatingPrice = 50000000; // 0.5 usd
    }

    function create(string memory _ipfsCid) public payable{
        require(bytes(_ipfsCid).length > 0, "IPFS CID is required");
        require(msg.value >= getMatic(), "Not enough Matic");
        unchecked{
            tokenCounter++;
        }
        if(tokenOwner[msg.sender] == 0){
            tokenOwner[msg.sender] = tokenCounter;
            ipfsCid[msg.sender] = _ipfsCid;
            _safeMint(msg.sender, tokenCounter);
            setTokenURI(tokenCounter, _ipfsCid);
        }
        else{
            uint256 tokenId = tokenOwner[msg.sender];
            ipfsCid[msg.sender] = _ipfsCid;
            setTokenURI(tokenId, _ipfsCid);
        }
        owner.transfer(msg.value);
    }

    function  getCidByAddress(address _address) public view returns(string memory){
        return ipfsCid[_address];
    }

    function getCidByTokenId(uint256 _tokenId) public view returns(string memory){
        return tokenURIs[_tokenId];
    }

    function getLatestPrice() internal view returns (int) {
        (,int price,,,) = priceFeed.latestRoundData();
        return price;
    }

    function getMatic() public view returns (uint256) {
        int price = getLatestPrice();
        uint256 matic = uint256(price);
        uint256 listingPrice = (10 ** 18 * creatingPrice)/matic;
        return listingPrice;
    }

    function setTokenURI(uint256 _tokenId, string memory _tokenURI) public {
        tokenURIs[_tokenId] = _tokenURI;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked(tokenURIs[_tokenId],"/data.json"));
    }

    function updatePrice(uint256 _price) public {
        require(msg.sender == owner, "You are not the owner");
        creatingPrice = _price;
    }   

    receive() external payable {}
}