pragma experimental ABIEncoderV2;

contract Elections {

    uint public election_count = 0;
    string public name = "Elections";
    mapping(uint => Election) public elections;
    string[] defaultArray;
    

    struct Election {
        uint id;
        string title;
        string description;
        string end_time;
        mapping(uint => Candidate) candidates;
        uint candidate_count;
         // Store accounts that have voted
        mapping(address => bool) voters;
    }

    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint vote_count;
    } 

    constructor () public {
        defaultArray.push("test candidate a");
        defaultArray.push("test candidate b");
        defaultArray.push("test candidate c");
        create_election("Default Election", "default description", 
        "20201231", defaultArray);
        elections[0].candidates[0].vote_count += 100;
        elections[0].candidates[1].vote_count += 60;
        elections[0].candidates[2].vote_count += 120;
    }

    function getElection(uint index) public returns (uint, string memory, string memory, string memory, uint) {
        return (elections[index].id, elections[index].title, elections[index].description, elections[index].end_time, elections[index].candidate_count);
    }

    function getCandidate(uint indexE, uint indexC) public returns (uint, string memory, uint) {
        return (elections[indexE].candidates[indexC].id, elections[indexE].candidates[indexC].name, elections[indexE].candidates[indexC].vote_count);
    }

    function vote(uint electionId, uint candidateId) public {
        require(!elections[electionId].voters[msg.sender]);
        require(candidateId >= 0 && candidateId <= elections[electionId].candidate_count);
        elections[electionId].candidates[candidateId].vote_count ++;
        elections[electionId].voters[msg.sender] = true;
        emit VotedEvent(electionId, candidateId);
    }

    function check_voted(uint electionIndex) public returns (bool){
        return elections[electionIndex].voters[msg.sender];
    }

    event VotedEvent(
        uint electionId,
        uint candidateId
    );

    event ElectionCreated (
        uint id,
        string election_title,
        string description,
        string end_time,
        uint candidate_count
    );

    function create_election(string memory title, string memory description, 
        string memory end_time, string[] memory candidates) public {
            // Make sure election title exists
            require(bytes(title).length > 0);
            // Make sure creater address exists
            require(msg.sender!=address(0));

            // Add election to the contract
            elections[election_count].id = election_count;
            elections[election_count].title = title;
            elections[election_count].description = description;
            elections[election_count].end_time = end_time;
            elections[election_count].candidate_count = 0;

            uint _id = elections[election_count].id;

            Election storage election = elections[election_count];

            for (uint i=0; i<candidates.length; i++){
                election.candidates[i] = Candidate(i, candidates[i], 0);
                election.candidate_count++;
            }

            // Trigger an event
            emit ElectionCreated(_id, elections[election_count].title, 
                elections[election_count].description, elections[election_count].end_time,
                elections[election_count].candidate_count);

            // Increment election id
            election_count ++;

    }
}