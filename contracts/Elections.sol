pragma solidity 0.7.4;

contract Elections {
    struct Election{
        uint id;
        string name;
    }

    mapping(uint => Election) elections;

    uint public electionsCount;

    constructor () public {
        addElection("a");
    }

    function addElection(string memory _name) private {
        electionsCount ++;
        elections[electionsCount] = Election(electionsCount, _name);
    }
}