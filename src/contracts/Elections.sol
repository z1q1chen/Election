pragma solidity 0.5.16;

contract Elections {

    uint public election_count = 0;
    string public name = "Elections";
    mapping(uint => Election) public elections;

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
        bytes32 name;
        uint vote_count;
    }

    event ElectionCreated (
        uint id,
        string election_title,
        string description,
        string end_time,
        uint candidate_count
    );

    function create_election(string memory title, string memory description, 
        string memory end_time, bytes32[] memory candidates) public {
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

    // // voted event
    // event VotedEvent (
    //     uint indexed _candidateId
    // );


    // function vote (uint _candidateId) public {
    //     // require that they haven't voted before
    //     require(!voters[msg.sender]);

    //     // require a valid candidate
    //     require(_candidateId > 0 && _candidateId <= candidatesCount);

    //     // record that voter has voted
    //     voters[msg.sender] = true;

    //     // update candidate vote Count
    //     candidates[_candidateId].voteCount ++;

    //     // trigger voted event
    //     emit VotedEvent(_candidateId);
    // }

}