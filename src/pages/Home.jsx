import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, InputGroup, Card, FormControl,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categoriesThunk, filterProductThunk, getProductThunk } from '../store/slices/getProdcuts';

const Home = () => {
    const dispatch = useDispatch()  
    const products = useSelector(state => state.getProduct)
    const navigate = useNavigate()
    const [searchProduct, setSearchProduct] = useState("")
    const [categories, setCategories] =useState([])

    useEffect(()=>{
        dispatch(getProductThunk())
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
        .then(res => setCategories(res.data.data.categories) )
    },[])

    const actionFilter = () =>{
        dispatch(filterProductThunk(searchProduct))
        setSearchProduct("")
    }   

    return (
        <div className='container'>
            <h1>Home</h1>
            <Row className="g-4">
                <Col lg={3} className="mb-4">
                    <h4>Categories</h4>
                    <ListGroup>
                        <ListGroup.Item style={{cursor: "pointer"}}
                        onClick={()=> dispatch(getProductThunk())}>All Products</ListGroup.Item>
                        {
                            categories.map(category => (
                                <ListGroup.Item key={category.id}
                                 onClick={() => dispatch(categoriesThunk(category.id))}
                                 style={{cursor: "pointer"}}
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
                                <Col  key={product.id}>
                                    <Card style={{ cursor: "pointer" }} 
                                    onClick = {() => navigate(`/product/${product.id}`)}
                                    className="p-3"
                                    >
                                        <Card.Img variant="top" src={product.productImgs[0]} 
                                        style={{height: "200px", objectFit: "contain"}} 
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
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;