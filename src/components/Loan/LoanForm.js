import { useState } from "react";


const LoanForm = (props) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [purpose, setPurpose] = useState('');
    const [nin, setNin] = useState('');
    const [amount, setAmount] = useState(0);
    const [duration, setDuration] = useState(0);

    const submitHandler = (e)=>{
        e.preventDefault();
        props.submitForm(name, address, occupation, purpose, nin, amount, duration);
    }

  return (
    <div className="contact_form green mt-s">
      <form onSubmit = {submitHandler}>
        <div className="row">
          <div className="col-12 col-md-12">
            <div className="group fadeInUp" data-wow-delay="0.2s">
              <input type="text" name="name" id="name" onChange = {(e)=>setName(e.target.value)} required />
              <span className="highlight" />
              <span className="bar" />
              <label className="w-text">Name</label>
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="group fadeInUp" data-wow-delay="0.2s">
              <input type="text" name="address" id="name" onChange = {(e)=>setAddress(e.target.value)} required />
              <span className="highlight" />
              <span className="bar" />
              <label className="w-text">Address</label>
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="group fadeInUp" data-wow-delay="0.2s">
              <input type="text" name="amount" id="name" onChange = {(e)=>setOccupation(e.target.value)} required />
              <span className="highlight" />
              <span className="bar" />
              <label className="w-text">Occupation</label>
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="group fadeInUp" data-wow-delay="0.2s">
              <input type="text" name="purpose" id="name" onChange = {(e)=>setPurpose(e.target.value)} required />
              <span className="highlight" />
              <span className="bar" />
              <label className="w-text">Purpose</label>
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="group fadeInUp" data-wow-delay="0.2s">
              <input type="text" name="nin" id="name" onChange = {(e)=>setNin(e.target.value)} required />
              <span className="highlight" />
              <span className="bar" />
              <label className="w-text">National ID number</label>
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="group fadeInUp" data-wow-delay="0.2s">
              <input type="text" name="amount" id="name" onChange = {(e)=>setAmount(e.target.value)} required />
              <span className="highlight" />
              <span className="bar" />
              <label className="w-text">Loan Amount</label>
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="group fadeInUp" data-wow-delay="0.3s">
              <input type="number" name="duration" id="email" onChange = {(e)=>setDuration(e.target.value)} required />
              <span className="highlight" />
              <span className="bar" />
              <label className="w-text">Select The Number of Months</label>
            </div>
          </div>
          <div className="col-12 text-center fadeInUp" data-wow-delay="0.6s">
            <button type="submit" className="btn more-btn">
              Apply for this Loan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;
