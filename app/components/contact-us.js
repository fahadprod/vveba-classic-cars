const ContactUs = () => {
  return (
    <div className="wrapper">
      <section className="section-5 target" id="contact">
        <h1 className="section-heading">Contact Us</h1>
        <form className="contact-form">
          <input 
            type="text" 
            className="form-input" 
            placeholder="Your Full Name" 
          />
          <input 
            type="email" 
            className="form-input" 
            placeholder="Your Email" 
          />
          <textarea 
            className="form-input" 
            placeholder="Enter Message"
          ></textarea>
          <input 
            className="form-btn" 
            type="submit" 
            value="Submit" 
          />
        </form>
        <p className="copyright">
          Copyright &copy; CodeAndCreate All Rights Reserved
        </p>
      </section>
    </div>
  );
};

export default ContactUs;