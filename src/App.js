
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import mobileBG from './assets/images/bg-main-mobile.png';
import desktopBG from './assets/images/bg-main-desktop.png';
import completeIcon from './assets/images/icon-complete.svg';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';
import Cleave from 'cleave.js/react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
function App() {


  const determinedBackground = useMediaQuery("(min-width: 992px)") ? desktopBG : mobileBG;
  
  const [userName, setUserName] = useState('');
  const [userCardNumber, setUserCardNumber] = useState('');
  const [userSecurityCode, setUserSecurityCode] = useState('');
  const [cardExpirationMonth, setCardExpirationMonth] = useState('');
  const [cardExpirationYear, setCardExpirationYear] = useState('');

  const [showForm, setShowForm] = useState(true);

  const handleInputChange = (e) => {
    e.target.setCustomValidity('');
    if (e.target.id === 'user_name') {
      setUserName(e.target.value);
    } else if (e.target.id === 'user_card_number') {
      e.target.setCustomValidity('');
      setUserCardNumber(e.target.value);
      if(e.target.rawValue.length !== 16) {
        e.target.setCustomValidity("Please enter your 16-digit card number.");
      }
    } else if (e.target.id === 'card_security_code') {
        setUserSecurityCode(e.target.rawValue);
    } else if (e.target.id === 'card_expiration_month') {
      if(e.target.value.length === 1) {
        setCardExpirationMonth('0' + e.target.value);
      } else if (e.target.value.length === 2 && e.target.value < 13) {
        setCardExpirationMonth(e.target.value);
      }
    } else if (e.target.id === 'card_expiration_year') {
      if(e.target.value.length === 1) {
        setCardExpirationYear('0' + e.target.value);
      } else if (e.target.value.length === 2 && e.target.value < 100) {
        setCardExpirationYear(e.target.value);
      }
    }
  }

  useEffect(() => {
    try {
      const userInput = document.getElementById('card_security_code');
    if (userSecurityCode.length === 3) {
      userInput.setCustomValidity('');
    } else {
      userInput.setCustomValidity('Please enter 3 digit CVC');
    }
    } catch {
      console.log('Form not being displayed.');
    }
    
  }, [userSecurityCode])
  

  useEffect(() => {
    if (showForm === true) {
      setUserName('');
      setUserCardNumber('');
      setCardExpirationMonth('');
      setCardExpirationYear('');
      setUserSecurityCode('');
    }
  }, [showForm])

  const handleInvalidInput = (e) => {
    if (e.target.value === '') {
      e.target.setCustomValidity('Cannot be blank.');
    } else if (e.target.id === 'user_card_number') {
      e.target.setCustomValidity('Please enter your 16-digit card number.');
    } else {
      e.target.setCustomValidity('Invalid input.');
    }
    
  }

  const handleFormSubmission = (e) => {
    e.preventDefault();
    setShowForm(false);
  }

  const handleContinueButton = () => {
    setShowForm(true);
  }

  return (
    <Container fluid className='p-0 h-100'>
      <Row className='h-100'>
        <Col xs={12} lg={4}>
          <section className="credit_card">
            <div className="credit_card_background" style={ { backgroundImage: `url(${determinedBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
              <div className="credit_card_back">
                <p className="card_ccv">{ userSecurityCode.length > 0 ? userSecurityCode : '123' }</p>
              </div>
              <div className="credit_card_front">
                <div className="large_circle"></div>
                <div className="small_circle"></div>
                <h1 className="card_number">{ userCardNumber.length > 0 ? userCardNumber : '1234 5678 9123 0000' }</h1>
                <h2 className="cardholder_name">{userName.length > 0 ? userName : 'Jane Appleseed'}</h2>
                <h2 className="card_expiration_date">{ cardExpirationMonth.length > 0 ? cardExpirationMonth : '00'}/{ cardExpirationYear.length > 0 ? cardExpirationYear : '00'}</h2>
              </div>
            </div>
          </section>
        </Col>
        
        <Col xs={12} lg={{span: 4, offset: 2}}>
          { showForm ? (
          <section className="user_info container">
            <Form onSubmit={handleFormSubmission} id="user_input_form">
              <Row>
                <label htmlFor="user_name">
                  CARDHOLDER NAME
                </label>
              </Row>
              <Row>
                <input type="text" id="user_name" className="user_input_name" placeholder='e.g. Jane Appleseed' onChange={handleInputChange} required />  
              </Row>                  
              <Row>
                <label htmlFor="user_card_number">
                  CARD NUMBER
                </label>
              </Row>
              <Row>
                <Cleave placeholder='e.g. 1234 5678 9123 0000' id="user_card_number" required options={{creditCard: true}} onChange={handleInputChange} onInvalid={handleInvalidInput} />
              </Row>
              <Row>
                <Col xs={6}>
                  <label htmlFor="card_expiration_month">
                    EXP. DATE (MM/YY)
                  </label>
                </Col>
                <Col xs={0} className='visibility-hidden'>
                  <label htmlFor="card_expiration_year">
                    EXP. DATE (MM/YY)
                  </label>
                </Col>
                <Col xs={6}>
                  <label htmlFor="card_security_code">
                    CVC
                  </label>
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <input type="number" id="card_expiration_month" min="01" max="12" placeholder='MM' required onChange={handleInputChange} onInvalid={handleInvalidInput} />
                </Col>
                <Col xs={3}>
                  <input type="number" id="card_expiration_year" min="00" max="99" placeholder='YY' required onChange={handleInputChange} onInvalid={handleInvalidInput} />
                </Col>
                <Col xs={6}>
                  <Cleave placeholder='e.g. 123' required id="card_security_code" options={{ blocks: [3], numericOnly: true}} onChange={handleInputChange} onInvalid={handleInvalidInput} />
                </Col>
              </Row>           
              
              <Row>
                <button type="submit">Confirm</button>
              </Row>
            </Form>
          </section>
          ) : (
            <section className="user_info container">
              <div className="confirmation_screen">
                <Row>
                  <img src={completeIcon} alt="Checkmark icon" className='completed-icon animate__animated animate__bounceInUp' />
                </Row>
                <Row>
                  <h1 className="completed-thanks animate__animated animate__fadeIn animate__delay-1s">THANK YOU!</h1>
                </Row>
                <Row>
                  <p className="completed-description animate__animated animate__fadeIn animate__delay-1s">We've added your card details</p>
                </Row>
                <Row>
                  <button className='completed-button animate__animated animate__fadeIn animate__delay-1s' onClick={handleContinueButton}>Continue</button>
                </Row>
              </div>
              
            </section>
          ) }
        </Col>
        
      </Row>
      
      
    </Container>
  );
}

export default App;
