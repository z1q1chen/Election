pragma solidity 0.5.16;

contract Elections {
    struct Election{
        uint id;
        string name;
    }

    struct Candidate {
        uint id;
        string name;
        uint vote_count;
    }

    mapping(uint => Election) electionList;

    uint public electionsCount;

    constructor () public {
        addElection("Demo");
    }

    function getElection() public returns (uint , string memory) {
        return (electionList[0].id, electionList[0].name);
    }


    function addElection(string memory _name) private {
        electionsCount ++;
        electionList[electionsCount] = Election(electionsCount, _name);
    }
}