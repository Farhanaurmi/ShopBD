import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartAction'

function ShippingScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode) //house no
    const [country, setCountry] = useState("Dhaka") //division

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    console.log(country)

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <div className='mb-2'>Division</div>
            <Form.Group controlId='country' >
                    <Form.Label></Form.Label>
                   
            <select defaultValue={'Dhaka'} onChange={(e) => setCountry(e.target.value)} className='division-selectcss'>
              <option value='Barisal'>Barisal</option>
              <option value='Chittagong'>Chittagong</option>
              <option value='Dhaka'>Dhaka</option>
              <option value='Khulna'>Khulna</option>
              <option value='Mymensingh'>Mymensingh</option>
              <option value='Rajshahi'>Rajshahi</option>
              <option value='Rangpur'>Rangpur</option>
              <option value='Sylhet'>Sylhet</option>
            </select>
          
            </Form.Group>

            <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>

            </Form.Group>

            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>

            </Form.Group>


            <Form.Group controlId='postalCode'>
                    <Form.Label>House No.</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your house no.'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>

            </Form.Group>

            <Button 
                    type='submit'
                    variant='primary'
                > 
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
