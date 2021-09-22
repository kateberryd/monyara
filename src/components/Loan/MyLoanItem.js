const MyLoanItem = (props) => {
  const redeemLoan = () => {
    props.redeemLoan(props.loan);
  };

  let object;
  if (props.loan.verification === "review") {
    object = <p className = "text-uppercase" style = {{color: "orange"}}>Under review</p>;
  } else if (props.loan.verification === "verified" && !props.loan.isPaid) {
    object = <a onClick={redeemLoan} className="btn info-btn mt-15">
      Redeem
    </a>
  } else if (props.loan.verification === "verified" && props.loan.isPaid) {
    object = <p className = "text-uppercase" style = {{color: "green"}}>Paid</p>;
  } else if (props.loan.verification === "unverified") {
    object = <p className = "text-uppercase" style = {{color: "red"}}>Loan was not Approved</p>;
  }
  return (
    <div className="col-12 col-md-6 col-lg-4">
      {/* Content */}
      <div
        className="service_single_content v2 text-center wow fadeInUp"
        data-wow-delay="0.2s"
      >
        <div className="serv_icon">
          <img src="img/icons/s1.png" alt="" />
        </div>
        <div className="service-content">
          <h6 className=" bold">{props.loan.name}</h6>
          <p>Amount: {props.loan.amount}cUSD + 10% interest</p>
          {object}
        </div>
      </div>
    </div>
  );
};

export default MyLoanItem;
