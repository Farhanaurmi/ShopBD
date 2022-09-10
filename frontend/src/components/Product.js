import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
            <Card className="my-3 p-3 rounded">
                <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />  
                </Link>  
                <Card.Body>
                <Link to={`/product/${product._id}`}>
                <Card.Title as="div" >
                <strong>
                {product.name}
                    </strong>
                    </Card.Title>  
                </Link> 
                <Card.Text as="div" >
                <div className="my-3">
                <Rating value={product.rating} text={product.reviews && `${product.reviews.length} reviews`} color={'#40bcc9'} />
                    </div>
                    </Card.Text>
                <Card.Text as="h3" >
                
                ৳{product.price}
                    
                    </Card.Text>
                </Card.Body>
            </Card> 
    )
}

export default Product