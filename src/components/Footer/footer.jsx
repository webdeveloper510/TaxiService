import React , { useState } from "react";
import footerlogo from '../../assets/images/footer-logoo.png';



const Footer=()=> {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your newsletter subscription logic here
    console.log(`Subscribed with email: ${email}`);
    // You can send the email to your backend or a third-party service for actual subscription handling
       if (email.trim() === '') {
      setErrorMessage('Please enter your email.');
    } else {
      // Implement your newsletter subscription logic here
      console.log(`Subscribed with email: ${email}`);
      // You can send the email to your backend or a third-party service for actual subscription handling
      setErrorMessage('test error msg'); // Clear the error message
    }
  }
  
      return (
        <footer>
        
           
          {/* <div className="logo"><img src={logo} className="App-logo" alt="logo" /></div> */}
          <div class="footer-outer">
          <div class="footer-inner">
         <div className="about-footer">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, <br/>
               consectetur adipiscing elit, sed do <br/>
               eiusmod tempor incididunt ut labore<br/> et dolore magna aliqua.</p>
               <img src ={ footerlogo} />
         </div>
          
          <div className="contact-footer">
          <h3>Contact Us</h3>
          <p>512-(653214897)</p>
          </div>

          <div className="news-footer">
            <h3>Newsletter</h3>
            <h4>subscribe to our newsletters!</h4>
             <form className="newsletter-email-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              /><br/>
              <button class="news-btn" type="submit">Subscribe</button>
            </form>
 {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          </div>
          </div>
          </div>
       
        </footer>
      );
    };
  
   export default Footer; 