import { CartContext } from "../context/CartContext"
import { useContext, useState, useEffect } from "react"
import '../assets/styles/form.css'

export default function Checkout(){
    const [billingInfo, setBillingInfo] = useState({
        firstName : '',
        lastName : '',
        mobile : '',
        email : '',
        addressline1 : '',
        addressline2 : '',
        country : '',
        city : '',
        zipcode : ''
    })

    const [cardInfo, setCardInfo] = useState({
        cardHolderName : '',
        cardNumber : '',
        expiry : '',
        cvv : ''
    })

    const [isVaildEmail, setIsValidEmail] = useState(true)
    const {cart} = useContext(CartContext)
    const validateEmail = (email)=>{
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
    useEffect(()=> {
        setIsValidEmail(validateEmail(billingInfo.email))
    }, [billingInfo.email])
    
    const validate = (event) => {
        event.preventDefault()
        //validate email
        //validate cardnumber
        //validate cvv
        //validate expiry
        //call api
    }
    const updateTotal = () => {
        return cart.reduce((Total, cur) => {
            return Total + parseFloat(cur.price) * parseFloat(cur.cartCount);
        }, 0);
    };

    const handleClick = (event) => {
        event.preventDefault();

        const {name, value} = event.target;
        if(name === 'firstName'){
            setBillingInfo(prev => {
                return {
                    ...prev,
                    firstName : value
                }
            })
        }else if(name === 'lastName'){
            setBillingInfo(prev => {
                return {
                    ...prev,
                    lastName : value
                }
            })
        }else if(name === 'mobile'){
            setBillingInfo(prev => {
                return {
                    ...prev,
                    mobile : value
                }
            })
        }else if(name === 'email'){
            setBillingInfo(prev => {
                return {
                    ...prev,
                    email : value
                }
            })
        }else if(name === 'addressline1'){
            setBillingInfo(prev => {
                return {
                    ...prev,
                    addressline1 : value
                }
            })
        }else if(name === 'addressline2'){
            setBillingInfo(prev => {
                return {
                    ...prev,
                    addressline2 : value
                }
            })
        }else if(name === 'country'){
            setBillingInfo(prev => {
                return {
                    ...prev,
                    country : value
                }
            })
        }else if(name === 'city'){
            setBillingInfo(prev => {
                return {
                    ...prev,
                    city : value
                }
            })
        }else if(name === 'zipcode'){
            setBillingInfo(prev => {
                return {
                    ...prev,
                    zipcode : value
                }
            })
        }
        
    }

    const cardHandler = (event) => {
        event.preventDefault();
        const {name, value} = event.target
        if(name === 'cardHolderName'){
            setCardInfo(prev => {
                return {
                    ...prev,
                    cardHolderName : value
                }
            })
        }else if(name === 'cardNumber'){
            
            setCardInfo(prev => {
                return {
                    ...prev,
                    cardNumber : value
                }
            })
        }else if(name === 'expiry'){
            setCardInfo(prev => {
                return {
                    ...prev,
                    expiry : value
                }
            })
        }else if(name === 'cvv'){
            if(value.length > 3){
                console.log('Invalid cvv')
                return ;
            }
            setCardInfo(prev => {
                return {
                    ...prev,
                    cvv : value
                }
            })
        }
    }

    const styles = {
        borderColor: '#ff0f0f',
        color: '#ff0f0f'
    }

    let total = updateTotal()
    return (
        <div className = "cart">
            <form className = "form">
                <h1>Billing Details</h1>
                <div className = "name-conatiner">
                    <input
                        type = "text"
                        name = "firstName"
                        placeholder = "First Name"
                        value = {billingInfo.firstName}
                        onChange={handleClick}
                    />
                    <input 
                        type = "text" 
                        name = "lastName" 
                        placeholder = "Last Name"
                        onChange={handleClick}
                        value = {billingInfo.lastName}
                    />
                </div>
                <div className = "contact-info">
                    <input
                        type = "number" 
                        name = "mobile" 
                        placeholder = "Mobile no." 
                        onChange={handleClick}
                        value = {billingInfo.mobile}
                    />
                    <input 
                        type = "email" 
                        name = "email" 
                        placeholder = "Email" 
                        value = {billingInfo.email}
                        onChange={handleClick}
                        style = {isVaildEmail || (billingInfo.email.length === 0)? {} : styles}
                    />
                </div>
                <input 
                    type="text" 
                    name="addressline1" 
                    placeholder="Address line 1" 
                    value = {billingInfo.addressline1}
                    onChange={handleClick}
                />
                <input 
                    type="text" 
                    name="addressline2" 
                    placeholder="Address line 2 (Optional)"
                    value = {billingInfo.addressline2}
                    onChange={handleClick} 
                />
                <div className = "area">
                    <input
                        type="text" 
                        name="country" 
                        placeholder = "Country" 
                        value = {billingInfo.country}
                        onChange={handleClick}
                    />
                    <input 
                        type="text" 
                        name="city" 
                        placeholder = "City"
                        onChange={handleClick} 
                        value = {billingInfo.city}
                    />
                    <input 
                        type="number" 
                        name="zipcode" 
                        placeholder="Zip Code"
                        value = {billingInfo.zipcode}
                        onChange={handleClick}
                    />
                </div>

                <h1>Payment Details</h1>
                <div className = "cardinfo">
                    <input type="text" name = "cardHolderName" placeholder="Card Holder name"/>
                    <input type="number" name = "cardNumber" placeholder="Card Number"/>
                </div>
                <div className = "cardinfo">
                    <input type="number" name ="expiry" placeholder="Expiry"/>
                    <input type="number" name = "cvv" placeholder="CVV" />
                </div>
            </form>
            <div className = "right">
                <div className = "price-details-heading">Price Details</div>
                <hr/>
                <div className = "price-details">
                    <div className = "price-item">
                    <div>Price ({cart.length} items)</div>
                    <div>${total}</div>
                    </div>
                    <div className = "price-item">
                    <div>Delivery Charge</div>
                    <div>
                        {
                        total < 499 && cart.length > 0 ?
                        "$50":
                        "Free"
                    }
                    </div>
                    </div>
                    <div className = "price-item total-amount">
                    <div>Total Amount</div>
                    <div>
                        ${
                        total < 499 && cart.length > 0?
                        total + 50 :
                        total
                        }
                        
                    </div>
                    </div>
                </div>
                <button 
                    className="add-to-cart-button"
                    style = {{width : "100%"}}
                    onClick = {validate}
                >
                    Pay now
                </button>
                </div>
        </div> 
    )}