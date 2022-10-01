import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart, saveSubtotalPrice } from '../actions/cartAction'

function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]): 1
    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [couponlist, setCouponlist] = useState([])
    const cart = useSelector(state => state.cart)
    const { cartItems,sub_total_price } = cart
    console.log('cartItems:', cartItems)
    const getCouponList = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/coupon')
        const data = await response.json()
        console.log(data)
        setCouponlist(data)
    }
    const CouponHandler = (e) => {
        e.preventDefault()

        if(code && couponlist){
            const coupon = couponlist.filter(coupon => coupon.code === code)
            if(coupon.length > 0){
                const discount = coupon[0].discount
                const totalPrice = cartItems.reduce((acc, item) => acc+ item.qty * item.price, 0).toFixed(2)
                const discountPrice = totalPrice - discount
                dispatch(saveSubtotalPrice(discountPrice))
                alert('Coupon Applied')
            }else{
                alert('Invalid Coupon Code')
            }
        }else{
            alert('Invalid Coupon Code')
        }
    }

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
        getCouponList()
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                    ৳{item.price}
                                    </Col>

                                    <Col md={3}>
                                    <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {
                                                    [...Array(item.countInstock).keys()].map((x)=>(
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button 
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(item.product)}
                                        > 
                                        <i className='fas fa-trash-alt '></i> 
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                          <Row>
                            <Col md={10}>
                              <input type="text" onChange={(e)=>setCode(e.target.value)} className="form-control" placeholder="Enter Coupon Code" />
                              </Col>
                              <Col md={2}>
                              <Button type='button' onClick={CouponHandler} className="btn btn-primary btn-block">
                                Apply
                              </Button>
                            </Col>
                          </Row>
                          </ListGroup.Item>
                    </ListGroup>
                )}
            </Col>


            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Total ({cartItems.reduce((acc, item) => acc+ item.qty, 0)}) items</h2>
                            {sub_total_price === 0 ? (
                               <>৳{cartItems.reduce((acc, item) => acc+ item.qty * item.price, 0).toFixed(2)}</>
                            ) : (
                                <>৳{sub_total_price}</>
                            )}
                           
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button 
                        type='button' 
                        className='btn-block' 
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                        >
                                                Checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen

