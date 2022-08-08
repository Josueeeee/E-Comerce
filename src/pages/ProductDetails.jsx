import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductThunk } from '../store/slices/getProdcuts';
import { Row, Col, Card } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
const ProductDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const product = useSelector(state => state.getProduct)
    const [getDetails, setGetDetails] = useState({})
    const [suggestedProduct, setSuggestedProduct] = useState([])

    const [counter, setCounter] = useState(0) 
    const [ quantity, setQuantity] = useState("")


    const { id } = useParams()


    useEffect(() => {
        dispatch(getProductThunk())
    }, [])

    useEffect(() => {
        const productDeatils = product.find(product => product.id === Number(id))
        setGetDetails(productDeatils)

        const sueggested = product.filter(product => product?.category.id === getDetails?.category?.id)
        setSuggestedProduct(sueggested)
    }, [product, id])

    return (
        <div className='container'>
            <Row xs={1} md={1} lg={2} className='mb-5'>
                <Col>

                </Col>
                <Col>
                    <h3>{getDetails?.title}</h3>
                    <p>{getDetails?.description}</p>
                    <Row className='mg-2'>
                        <Col>
                            <p>Price</p>
                            <h2>$ {getDetails?.price}</h2>
                        </Col>
                        <Col>
                            <p>Quantity</p>
                            <button onClick={()=> setCounter(counter - 1)}> - </button>
                            <input type="text"
                             value={counter}
                             onChange={e => setQuantity(e.target.value)} 
                             style={{width: 40}}/>
                            <button onClick={()=> setCounter(counter + 1)}>+</button>
                        </Col>
                    </Row>
                    <button style={{width: "100%"}}>Add to card</button>
                </Col>
            </Row>
        <div className='d-flex flex-wrap justify-content-center '> 
            <Row lg={4} >
                {suggestedProduct.map(product => (
                    <Col  key={product.id}>
                    <Card style={{ cursor: "pointer" }} 
                    onClick={()=> navigate(`/product/${product.id}`)}
                    className="p-3"
                    >
                        <Card.Img variant="top" src={product.productImgs[0]} 
                        style={{height: "100px", objectFit: "contain"}} 
                        />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                        </Card.Body>
                        <p>Precie</p>
                        <Card.Text>
                                {product.price}
                            </Card.Text>
                        <Card.Footer className="text-muted">{product.date}</Card.Footer>
                    </Card>
                </Col>
                ))}
            </Row>
        </div>
        </div>
    );
};

export default ProductDetails;