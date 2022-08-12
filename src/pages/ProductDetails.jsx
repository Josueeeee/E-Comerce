import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductThunk } from '../store/slices/getProdcuts';
import { Row, Col, Card } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { postCartThunk } from '../store/slices/cart.slice';
const ProductDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const product = useSelector(state => state.getProduct)
    const [getDetails, setGetDetails] = useState({})
    const [suggestedProduct, setSuggestedProduct] = useState([])
    const [image, setImage] = useState("")

    const [counter, setCounter] = useState(1)

    const { id } = useParams()


    useEffect(() => {
        dispatch(getProductThunk())
    }, [])

    const actionAdd = () => {
        alert("añadiendo")
        const data = {
            id: getDetails.id,
            quantity: counter
        }
        dispatch(postCartThunk(data))
    }

    useEffect(() => {
        const productDeatils = product.find(product => product.id === Number(id))
        setGetDetails(productDeatils)

        const sueggested = product.filter(product => product?.category.id === getDetails?.category?.id)
        setSuggestedProduct(sueggested)
    }, [product, id])

    return (
        <div className='container'>
            <Row xs={1} md={1} lg={2} className='mb-5'>
                <Col className='text-center'>
                <img className='p-5' src={image || getDetails?.productImgs?.[0]} style={{height: "20rem"}}/>
                   <Row lg={3} className="m-3">
                   <img  src={getDetails?.productImgs?.[0]} alt=""  style={{height: "6rem", objectFit: "contain" }} onClick={()=> setImage(getDetails?.productImgs?.[0])} />
                   <img  src={getDetails?.productImgs?.[1]} alt="" style={{height: "6rem", objectFit: "contain" }}  onClick={()=> setImage(getDetails?.productImgs?.[1])} />
                   <img  src={getDetails?.productImgs?.[2]} alt=""  style={{height: "6rem", objectFit: "contain" }} onClick={()=> setImage(getDetails?.productImgs?.[2])} />
                   </Row>
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
                            <button onClick={() => setCounter(counter - 1)}> - </button>
                            <input type="text"
                                value={counter}
                                onChange={e => setCounter(Number(e.target.value))}
                                style={{ width: 40 }} />
                            <button onClick={() => setCounter(counter + 1)}> + </button>
                        </Col>
                    </Row>
                    <button style={{
                        background: "#F85555", border: "none",
                        color: "white", fontSize: "1.5rem",
                        width: "100%"
                    }}
                        onClick={() => actionAdd()}>Add to card
                    </button>
                </Col>
            </Row>
            <div className='d-flex flex-wrap justify-content-center '>
                <Row lg={4} >
                    {suggestedProduct.map(product => (
                        <Col key={product.id}>
                            <Card style={{ cursor: "pointer", height: "22rem" }}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="p-3"
                            >
                                <Card.Img variant="top" src={product.productImgs[0]}
                                    style={{ height: "100px", objectFit: "contain" }}
                                />
                                <Card.Footer className="text-muted">{product.date}</Card.Footer>
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                <p>Precie</p>
                                <Card.Text>
                                    {product.price}
                                </Card.Text>
                                <div className='container-shopping'>
                                    <button className='button' ><i className="fa-solid fa-cart-shopping"></i></button>
                                </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ProductDetails;