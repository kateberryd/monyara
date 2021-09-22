import AdminItem from "./AdminItem";

const Admin = (props) => {
  return (
    <section className="blog-area section-padding-100-0">
      <div className="container">
        <div className="row">
          {props.loans.map((loan, index) => (
           <AdminItem verifyLoan = {props.verifyLoan} unverifyLoan = {props.unverifyLoan} key={index} loan={loan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Admin;
