const AdminItem = (props) => {
  const verifyLoan = () => {
    props.verifyLoan(props.loan);
  };
  const unverifyLoan = () => {
    props.unverifyLoan(props.loan);
  };

  let object = (
    <div>
      <a onClick={verifyLoan} className="btn info-btn mt-15">
        Verify
      </a>
      <a onClick={unverifyLoan} className="btn info-btn mt-15">
        UnVerify
      </a>
    </div>
  );

  if (props.loan.verification === "verified") {
    object = <p style={{ color: "green" }}>Verified</p>;
  } else if (props.loan.verification === "unverified") {
    object = <p style={{ color: "red" }}>Not Verified</p>;
  }
  return (
    <div className="col-12 col-sm-6">
      <div className="single-blog-area wow fadeInUp" data-wow-delay="0.3s">
        {/* Post Content */}
        <div className="blog-content">
          <div className="post-meta">
            <p>
              By{" "}
              <a href="#" className="post-author">
                {props.loan.name}
              </a>{" "}
              <a href="#">{props.loan.timestamp}</a>{" "}
              <a href="#" className="post-comments">
                NIN: {props.loan.nationalId}
              </a>
            </p>
          </div>
          <a href="index-single-blog.html" className="post-title">
            <h4>Loan Purpose: {props.loan.purpose}</h4>
          </a>
          <p>Amount: {props.loan.amount} cUSD</p>
          <p>Loan Tenure: {props.loan.loanTenure} Months</p>
          <p>Occupation: {props.loan.occupation}</p>
          <p>Address: {props.loan.borrowerHomeAddress}</p>
          {object}
          {props.loan.isPaid ? <p style = {{color: "green"}}>Paid</p>:<p style = {{color: "red"}}>Not Paid</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminItem;
