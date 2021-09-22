// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract Loan {
    struct LoanDetails {
        address payable borrowerAddress;
        string name;
        string borrowerHomeAddress;
        string occupation;
        string purpose;
        string nationalId;
        string verification;
        uint256 amount;
        uint256 loanTenure;
        bool isPaid;
        uint256 timestamp;
    }

    uint256 loanLength = 0;
    uint256 loanRegistrationAmount = 1;
    mapping(uint256 => LoanDetails) internal loan;
    address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address internal bankAddress = 0xb7BF999D966F287Cd6A1541045999aD5f538D3c6;

    modifier isAdmin(uint256 _id) {
        require(msg.sender == bankAddress, "Accessible only to the admin");
        _;
    }

    modifier isOwner(uint256 _index) {
        require(
            msg.sender == loan[_index].borrowerAddress,
            "Accessible only to the owner"
        );
        _;
    }

// submit Loans pay a fee and increase loan length
    function submitLoan(
        string memory _name,
        string memory _borrowerHomeAddress,
        string memory _occupation,
        string memory _purpose,
        string memory _nationalId,
        uint256 _amount,
        uint256 _loanTenure
    ) public {
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                bankAddress,
                loanRegistrationAmount
            ),
            "Error during Loan Registration"
        );

        loan[loanLength] = LoanDetails(
            payable(msg.sender),
            _name,
            _borrowerHomeAddress,
            _occupation,
            _purpose,
            _nationalId,
            "review",
            _amount,
            _loanTenure,
            false,
            block.timestamp
        );
        loanLength++;
    }

    function getLoans(uint256 _index)
        public
        view
        isAdmin(_index)
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            bool,
            uint256
        )
    {
        LoanDetails storage loans = loan[_index];
        return (
            loans.borrowerAddress,
            loans.name,
            loans.borrowerHomeAddress,
            loans.occupation,
            loans.purpose,
            loans.nationalId,
            loans.verification,
            loans.amount,
            loans.loanTenure,
            loans.isPaid,
            loans.timestamp
        );
    }

    function verifyApplicant(uint256 _index) public payable isAdmin(_index) {
        LoanDetails storage singleLoan = loan[_index];
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                bankAddress,
                singleLoan.borrowerAddress,
                singleLoan.amount
            ),
            "Could not disburse funds"
        );
        singleLoan.verification = "verified";
    }

    function unVerifyApplicant(uint256 _index) public isAdmin(_index) {
        loan[_index].verification = "unverified";
    }

    // function to redeem loans with a fixed interest
    function reedem(uint256 _index) public payable isOwner(_index) {
        LoanDetails storage singleLoan = loan[_index];
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                bankAddress,
                (singleLoan.amount + singleLoan.amount * 1 / 10)
            ),
            "Did not reedem loan"
        );
        singleLoan.isPaid = true;
    }

    function isUserAdmin(address _address) public view returns (bool) {
        if (_address == bankAddress) {
            return true;
        }
        return false;
    }

    function getLoanLength() public view returns (uint256) {
        return loanLength;
    }
}
