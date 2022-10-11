pragma solidity 0.8.17;

// SPDX-License-Identifier: MIT

contract FinalCase {
    //declaring owner variable
    address private owner;


    //declaring events
    event LogLaunch(uint id, address indexed owner, uint endTime);
    event BidEnded(address highestBidder,uint highestBid);
    event HighestBidIncreased(address indexed highestBidder, uint indexed highestBid);

    //In this constructor method we're declaring who is the owner.
    //@dev you can add more specific information.
    constructor(){
        owner = msg.sender;
    }

    //@dev id can be deleted. In this time it's redundant
    //Identify some token information
    struct Token{
        string name;
        string symbol;
        bool ended;
        uint endTime;
        address highestBidder;
        uint highestBid;
    }


    //Mapping Token struct and PledgedAmount that bidders how much money they pledged
    mapping(uint => Token) public tokens;
    mapping(uint => mapping(address => uint)) pledgedAmount;

    //Declaring count to use as a mapping id
    uint public count;

    //a modifier so that only the owner can take action
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    //Getting owner address
    function getOwner()public view returns(address){
        return owner;
    }
    //Getting all mapping as a array output
    function getAll() public view returns(Token[] memory){
        Token[] memory temp = new Token[](count);
        for (uint i = 0; i < count; i++) {
            temp[i] = tokens[i];
        }
        return temp;
    }



    //Function to create Token
    function launch(string memory _tokenName,string memory _symbol,uint _endAt) public onlyOwner{




        //Entering token information and adding tokens mapping
        tokens[count] = Token({
        name: _tokenName,
        symbol: _symbol,
        ended: false,
        endTime: block.timestamp +  _endAt * 1 minutes ,
        highestBidder: address(0),
        highestBid: 0

        });
        //Declaring token id
        count+=1;

        //Trriger the LogLaunch event
        emit LogLaunch(count, msg.sender, tokens[count].endTime);

    }


    //Function for transfer of monet to owner after Bid ends
    function end(uint _id) public payable onlyOwner{
        //Getting token in tokens map
        Token storage token = tokens[_id];
        //Declaring require for the function to work
        require(block.timestamp >= token.endTime, "Not yet ended");
        require(!token.ended,"Already called");

        token.ended = true;

        //Trriger BidEnded event
        emit BidEnded(token.highestBidder,token.highestBid);


        //Transfering highestBid to the owner
        payable(owner).transfer(token.highestBid);
    }

    //Function that people can participate in the bid
    function bid(uint _id) external payable {
        Token storage token = tokens[_id];

        require(block.timestamp <= token.endTime,"Already ended.");
        require(!token.ended,"Already ended");
        require(msg.value > token.highestBid,"There already is a higher bid.");


        //how much money bidders spend for each token
        pledgedAmount[_id][msg.sender] += msg.value;
        //Changing highest Bidder
        token.highestBidder = msg.sender;
        //Changing highest Bid
        token.highestBid = msg.value;

        //Trriger HighestBidIncreased Event
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    //Function can bidders claim their money

    function withdraw(uint _id) public returns (bool) {
        require(!(msg.sender == address(0)),"Can't call with this address");

        Token memory token = tokens[_id];

        uint amount;

        //If the bidder is the highest bidder, he/she can not withdraw some of his/her money.(Total Amount - highest bid)
        if(msg.sender == token.highestBidder){
            amount = pledgedAmount[_id][msg.sender] - token.highestBid;
        } else{
            amount = pledgedAmount[_id][msg.sender];
        }

        //If amount greater than 0 they can withdraw
        if (amount > 0) {
            pledgedAmount[_id][msg.sender] = 0;
            //@dev send can be vulnerable you need to change. It can be better to use call but gas price will be increase
            if (!payable(msg.sender).send(amount)) {

                pledgedAmount[_id][msg.sender] = amount;
                return false;
            }
        }else{
            return false;
        }

        return true;
    }




}