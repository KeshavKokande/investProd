import { useState, useEffect } from 'react';
import style from './Payment.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import chip from './chip.png';
import cardtype from './cardtype.png';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Payment = () => {


    const navigate = useNavigate();
    const { advisor_id, plan_id, days } = useParams();
    const [position, setPosition] = useState('0px');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [roted, setRoted] = useState('0deg');

    const changeCard = () => {
        setPosition('-100px');
    }

    const cardNumebrHandler = (event) => {
        const cardType = GetCardType(event.target.value);
        if (cardType === 'Visa') {
            setPosition('0px')
        } else if (cardType === 'Mastercard') {
            setPosition('-95px')
        } else if (cardType === 'AMEX') {
            setPosition('-195px')
        } else if (cardType === 'Discover') {
            setPosition('-295px')
        }
        setNumber(event.target.value)
    }

    const cardHolderHandler = (event, capitalizedValue) => {
        const name = capitalizedValue || event.target.value;
        setName(name)
    }

    function GetCardType(number) {
        // visa
        var re = new RegExp("^4");
        if (number.match(re) != null)
            return "Visa";

        // Mastercard 
        // Updated for Mastercard 2017 BINs expansion
        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
            return "Mastercard";

        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null)
            return "AMEX";

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "Discover";

        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null)
            return "Diners";

        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null)
            return "Diners - Carte Blanche";

        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "JCB";

        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null)
            return "Visa Electron";

        return "";
    }

    const monthHandler = (event) => {
        let inputMonth = event.target.value;
        
        // Check if the input is a single digit and not '0'
        if (inputMonth.length === 1 && inputMonth !== '0') {
            // If it's a single digit other than '0', update the state with the input
            setMonth(inputMonth);
        } else if (inputMonth.length === 2 && parseInt(inputMonth) <= 12) {
            // If it's a two-digit number and less than or equal to 12, update the state
            setMonth(inputMonth);
        } else if (inputMonth.length === 0) {
            // If the input is empty, update the state to empty
            setMonth('');
        }
        // Ignore input that doesn't meet the conditions
    };
    
    

    const yearHandler = (event) => {
        setYear(event.target.value)
    }

    const cvcHandler = () => {
        setRoted('180deg')
    }

    const cvcRemove = () => {
        setRoted('0deg')
    }

    const cvcValue = (event) => {
        setCvc(event.target.value)
    }



    const handleSubscribe = async () => {

        try {
            const response = await fetch(`https://localhost:8000/api/v1/client/subscribePlan/advisor/${advisor_id}/plan/${plan_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    planDays: days
                })
            });

            if (!response.ok) {
                throw new Error('Failed To Buy Plan');
            }

            const data = await response.json();
            //   console.log('Buy plan response:', data);

            if (data.status === 'success') {

                Swal.fire({
                    title: 'Success',
                    text: 'Plan Bought Successfully!',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/planDetail/${plan_id}`)
                    }
                });


            }
        } catch (error) {
            console.error('Error buying plan:', error.message);
            Swal.fire('Error', 'Failed to buy plan. Please try again later.', 'error');
        }
    };

    const onlyAllowNumbers = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const isValidKey = /^\d+$/.test(keyValue); // Check if the pressed key is a digit
        if (!isValidKey) {
            event.preventDefault(); // Prevent the input if the key is not a digit
        }
    };    

    return (
        <div className={style.fullCover} style={{ paddingTop: '40px', backgroundColor: '#000', height: '100vh' }}>

            <div className={style.coverInner} style={{ transform: `rotateY(${roted})` }}>

                <div className={style.card}>
                    <div className={style.cardHeader}>
                        <div className={style.leftCardName}>Credit Card</div>
                        <div className={style.rightCardType} style={{ backgroundImage: `url(${cardtype})`, backgroundPositionX: `${position}` }}></div>
                    </div>
                    <div className={style.cardChip}>
                        <img src={chip} alt="Chip" />
                    </div>
                    <div className={style.cardNumber}>
                        {number ? number.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/, '') : '**** **** **** ****'}
                        <div className={style.textRight}>
                            <div className={style.validThrough}>VALID<br />THRU</div>
                            <div className={style.monthYear}>{month ? month : '00'}/{year ? year : '00'}</div>
                        </div>
                    </div>
                    <div className={style.footerCard} onClick={changeCard}>
                        {name ? name : 'Card Holder Name'}
                    </div>
                </div>

                <div className={`${style.card} ${style.cardBack}`}>
                    <div className={style.cardHeader}>
                        <div className={style.backLine}></div>
                    </div>
                    <p className={style.authorizedSignature}><small>AUTHORIZED SIGNATURE</small></p>
                    <div className={`p-1 d-flex align-items-center justify-content-end ${style.cvcPlace}`}>
                        <div className='text-dark'>{cvc ? cvc : '***'}</div>
                    </div>
                    <p className={style.demoText}><small>Our security is our priority. Please ensure the safety of your card by safeguarding the Card Verification Code (CVC) located on this side. This three-digit code is crucial for online and over-the-phone transactions, helping to prevent unauthorized use of your card. Never share this code with anyone, including merchants or customer service representatives</small></p>
                </div>
            </div>

            <div className={style.cardDetails}>
                <div>
                    <input
                        maxLength={16}
                        value={number}
                        onChange={cardNumebrHandler}
                        className='form-control'
                        placeholder="CARD NUMBER"
                        pattern="[0-9]*" // Only allow numeric characters
                        onKeyPress={(event) => {
                            const keyCode = event.keyCode || event.which;
                            const keyValue = String.fromCharCode(keyCode);
                            const isValidKey = /^\d+$/.test(keyValue); // Check if the pressed key is a digit
                            if (!isValidKey) {
                                event.preventDefault(); // Prevent the input if the key is not a digit
                            }
                        }}
                    />
                </div>

                <div>
                    <input
                        onChange={(event) => {
                            const inputValue = event.target.value;
                            const capitalizedValue = inputValue.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
                            const alphabeticValue = capitalizedValue.replace(/[^A-Za-z\s]/g, ''); // Remove non-alphabetic characters
                            cardHolderHandler(event, alphabeticValue); // Pass event and alphabetic value to the handler
                        }}
                        value={name}
                        className='form-control'
                        placeholder="CARD HOLDER NAME"
                        title="Please enter only alphabetic characters"
                    />
                </div>




                <div className={style.holderDetail}>
                    <div><input value={month} onChange={monthHandler} onKeyPress={onlyAllowNumbers} maxLength={2} className='form-control' placeholder="MONTH" /></div>
                    <div><input value={year} onChange={yearHandler} onKeyPress={onlyAllowNumbers} maxLength={2} minLength={2} className='form-control' placeholder="YEAR" /></div>
                    <div><input maxLength={3} value={cvc} className='form-control' onChange={cvcValue} onKeyPress={onlyAllowNumbers} placeholder="CVC" onFocus={cvcHandler} onBlur={cvcRemove} /></div>
                </div>

                <div><button className='btn btn-dark' onClick={handleSubscribe}>Submit</button></div>
            </div>
        </div>
    )
}

export default Payment;
