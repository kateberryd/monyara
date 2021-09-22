import LoanForm from "../Loan/LoanForm";

const Body = (props) => {
  return (
    <div>
      {/* ##### Welcome Area Start ##### */}
      <section className="hero-section ai1 relative" id="home">
        <div className="overlay" />
        {/* Hero Content */}
        <div className="hero-section-content">
          <div className="container ">
            <div className="row align-items-center">
              {/* Welcome Content */}
              <div className="col-12 col-lg-6 col-md-12">
                <div className="welcome-content text-left">
                  <div className="promo-section">
                    <h3 className="special-head cyan">
                      You Financial Status is in a Good Hands
                    </h3>
                  </div>
                  <h1
                    className="bold wow fadeInUp b-text"
                    data-wow-delay="0.2s"
                  >
                    Loans and Funding Company With New Financial Solutions
                  </h1>
                  {/* <p className="wow fadeInUp" data-wow-delay="0.3s">Lorem ipsum dolor sit amet, adipisicing elit. Quod corrupti laborum, quasi? Dolor sapiente amet optio harum dolores, voluptate, tempora dolorem fugiat fuga autem .</p> */}
                  <div
                    className="info-btn-group fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <a href="#apply" className="btn info-btn green-btn mr-3">
                      get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding-0-70 relative map-before">
        <div className="container">
          <div className="section-heading text-center">
            <span>How It Works</span>
            <h2 className="wow fadeInUp d-blue bold" data-wow-delay="0.3s">
              Get Your Loan in 3 Easy Steps
            </h2>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              {/* Content */}
              <div
                className="service_single_content transparent text-center wow fadeInUp"
                data-wow-delay="0.2s"
              >
                {/* Icon */}
                <div className="how_icon">
                  <img src="img/icons/h1.png" className="colored-icon" alt="" />
                </div>
                <h6>Select amount and terms</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              {/* Content */}
              <div
                className="service_single_content transparent text-center wow wow fadeInUp"
                data-wow-delay="0.3s"
              >
                {/* Icon */}
                <div className="how_icon">
                  <img src="img/icons/h2.png" className="colored-icon" alt="" />
                </div>
                <h6>Enter your personal information</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              {/* Content */}
              <div className="service_single_content transparent text-center wow fadeInUp">
                {/* Icon */}
                <div className="how_icon">
                  <img src="img/icons/h3.png" className="colored-icon" alt="" />
                </div>
                <h6>Get Loan Approved in 48 hours</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='apply' className="creative-facts section-padding-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="who-we-contant">
                <div className="promo-section">
                  <h3 className="special-head ">Our Core Features!</h3>
                </div>
                <h4 className="d-text bold fadeInUp" data-wow-delay="0.3s">
                  Why Choose Our Company
                </h4>
                <div className="services-block-four mt-30">
                  <div className="inner-box">
                    <div className="icon-img-box">
                      <img src="img/icons/d1.png" alt="" />
                    </div>
                    <h3>
                      <a href="#">Fixed Interest Rate</a>
                    </h3>
                    <div className="text">
                      Whether for 1 month or 12, we charge a fixed interest rate of 10%         
                    </div>
                  </div>
                </div>
                <div className="services-block-four">
                  <div className="inner-box">
                    <div className="icon-img-box">
                      <img src="img/icons/d2.png" alt="" />
                    </div>
                    <h3>
                      <a href="#">Direct Funds &amp; Quick Loan approvals</a>
                    </h3>
                    <div className="text">
                      Get your money directly to your wallet
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <LoanForm submitForm = {props.submitForm}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
