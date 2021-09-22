import MyLoanItem from "./MyLoanItem";

const MyLoans = (props) => {
  return (
    <section
      className="our_services_area section-padding-100-0 relative hex-pat-1"
      id="services"
    >
      <div className="container">
        <div className="section-heading text-center">
          <span>Address: {props.address}</span>
          <h2 className=" bold fadeInUp" data-wow-delay="0.3s">
            My Loans
          </h2>
        </div>
        <div className="row">
          {props.myLoans.map(
            (loan, index) =>
              (
                <MyLoanItem
                  key={index}
                  loan={loan}
                  redeemLoan={props.redeemLoan}
                />
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default MyLoans;
