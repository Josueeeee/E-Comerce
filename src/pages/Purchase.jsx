import React, { useEffect, useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurcharseThunk } from '../store/slices/getPurcharse.slice';

const Purchase = () => {

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchase)

    useEffect(() => {
        dispatch(getPurcharseThunk())
    }, [])

    let total = () => {
        purchases.map(products => {
            let totalAmount = 0
            products.cart.products.map(product =>
                totalAmount += product.price * product.productsInCart?.quantity
            )

        })

    }


    return (
        <div>
            {purchases.map(products => (
                <Card key={products.id} className="m-3">
                    <Card.Header style={{ background: "#F85555", color: "white" }}>
                        {products.createdAt}
                    </Card.Header>
                    <Row xs={1} md={2} lg={3} >
                        {products.cart.products.map(product => (
                            <Card.Body className='p-4' key={product.id}>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    <input value={product.productsInCart.quantity}
                                        onChange={e => e.target.value}
                                        style={{ width: "3rem", textAlign: "center" }}
                                    />
                                </Card.Text>
                                <Card.Text >
                                    <b>$ {product.price}</b>

                                </Card.Text>
                                <Card.Text >
                                    total: <b>$ {product.price * product.productsInCart?.quantity}</b>
                                </Card.Text>
                            </Card.Body>
                        ))}
                    </Row>
                    <Card.Footer>

                    </Card.Footer>
                </Card>
            ))}
        </div>
    );
};

export default Purchase;