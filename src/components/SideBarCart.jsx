import React, { useEffect, useState } from 'react';
import { Offcanvas, Row, Col } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { deletProductThunk, getCartThunk, purcharseProductThunk, updatinProductInCartthunk } from '../store/slices/cart.slice';

const SideBar = ({ show, handleClose }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productsCart = useSelector(state => state.cart);
    const [quantity, setQuantity] = useState(productsCart.map(product => product.cart?.productsInCart.quantity))
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [productsCart])

    const updateProduct = () => {
        const data = {
            id: getDetails.id,
            quantity: counter
        }
        dispatch(updatinProductInCartthunk(data))
    }

    const deleteProduct = (id) => {
        dispatch(deletProductThunk(id))
    }

    const purcharseProduct = () => {
        dispatch(purcharseProductThunk())
        navigate("/purchase")
        handleClose()
    }

    let total = () => {
        let totalAmount = 0
        productsCart.map(product => {
            totalAmount += product.price * product.productsInCart.quantity
        })
        return totalAmount
    }


    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>{productsCart.map(cart => (
                        <div style={{ marginBottom: "2rem" }} key={cart.id}>
                            <Row lg={2}>
                                <Col>
                                    {cart.brand}
                                    <p> <b>{cart.title}</b></p>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <button onClick={() => deleteProduct(cart.id)}
                                        style={{ border: "none", color: "red" }}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </Col>
                            </Row>
                            <div>
                                <Row lg={2} >
                                    <Col>
                                        <button onClick={() => setCounter(counter - 1)}> - </button>
                                        <input type="text"
                                            name={cart.id}
                                            value={cart.productsInCart.quantity}
                                            onChange={e => setCounter(Number(e.target.name))}
                                            style={{ width: 40 }} />
                                        <button onClick={() => setCounter(counter + 1)}> + </button>
                                    </Col>
                                    <Col className='d-flex justify-content-end align-items-end'>
                                        <p>total </p>

                                        <p>    $<b>{cart.price * cart.productsInCart.quantity}</b></p>
                                    </Col>
                                </Row>
                                <hr />
                            </div>
                        </div>
                    ))}</div>
                </Offcanvas.Body>
                <hr />
                <div className='text-center p-2'>
                    <p>Total</p> <h2><b>$ {total()}</b></h2>
                </div>
                <button onClick={purcharseProduct}
                    style={{
                        background: "#F85555", border: "none",
                        padding: "1rem", color: "white", fontSize: "2rem"
                    }} >
                   Checkout
                </button>
            </Offcanvas>
        </div>
    );
};

export default SideBar;