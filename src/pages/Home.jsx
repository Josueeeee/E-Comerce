import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, InputGroup, Card, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postCartThunk } from '../store/slices/cart.slice';
import { categoriesThunk, filterProductThunk, getProductThunk } from '../store/slices/getProdcuts';

const Home = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.getProduct)
    const navigate = useNavigate()
    const [searchProduct, setSearchProduct] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        dispatch(getProductThunk())
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [])

    const actionFilter = () => {
        dispatch(filterProductThunk(searchProduct))
        setSearchProduct("")
    }
    const actionAdd = (id) => {
        alert("añadiendo")
        const data = {
            id: id,
            quantity: 1
        }
        dispatch(postCartThunk(data))
    }

    return (
        <div className='container text-black'>
            <h1>Home</h1>
            <Row className="g-4">
                <Col lg={3} className="mb-4">
                    <h4>Categories</h4>
                    <ListGroup>
                        <ListGroup.Item style={{ cursor: "pointer" }}
                            onClick={() => dispatch(getProductThunk())}>All Products</ListGroup.Item>

                        {
                            categories.map(category => (
                                <ListGroup.Item key={category.id}
                                    onClick={() => dispatch(categoriesThunk(category.id))}
                                    style={{ cursor: "pointer" }}
                                >
                                    {category.name}

                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search product"
                            onChange={e => setSearchProduct(e.target.value)}
                            value={searchProduct}
                        />

                        <Button variant="outline-secondary" id="button-addon2"
                            onClick={actionFilter} >
                            Button
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {
                            products.map(product => (
                                <Col key={product.id}>
                                    <Card style={{ cursor: "pointer", height: "28rem" }} className="p-3">
                                        <div onClick={() => navigate(`/product/${product.id}`)}>
                                            <Card.Img variant="top" src={product.productImgs[0]}
                                                style={{ height: "200px", objectFit: "contain" }}
                                            />
                                            <Card.Footer className="text-muted"></Card.Footer>
                                            <Card.Body>
                                                <Card.Title>{product.title}</Card.Title>
                                            </Card.Body>
                                            <p style={{ color: "gray", margin: "0" }}>Price</p>
                                            <Card.Text>
                                                <b> $ {product.price} </b>
                                            </Card.Text>
                                        </div>
                                        <div className='container-shopping'>
                                            <button className='button' onClick={() => actionAdd(product.id)}>
                                                <i className="fa-solid fa-cart-shopping"></i>
                                            </button>
                                        </div>
                                    </Card>

                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;