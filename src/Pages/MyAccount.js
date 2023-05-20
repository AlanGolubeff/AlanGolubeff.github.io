import { React, useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Image, Card, Badge } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import Heading from '../components/Heading';
import profilePix from '../images/profile-picture.png';
import { FaClipboardList, FaUser } from 'react-icons/fa';
import { GiWallet } from 'react-icons/gi';
import { IoLocationSharp } from 'react-icons/io5';
import './my-account.css';
//import OrderCard from '../components/OrderCard';
import getOrders from './orders/orderscompleted';



const MyAccount = () => {
    const [theme] = useThemeHook();
    const [orders, setOrders] = useState([]);
    const [itemsData, setItemsData] = useState([]);

    useEffect(() => {
        getOrders().then((orders) => {
            setOrders(orders);

            const itemsData = orders.map((order) => order.items);
            setItemsData(itemsData);
            console.log(itemsData);
            console.log(orders);
        });
    }, []);
    return (
        <Container className="py-5 mt-5">
            <Heading heading="My Account" />
            <Tab.Container defaultActiveKey="my-orders">
                <Row className="justify-content-evenly mt-4 p-1">
                    <Col sm={3} className={`${theme ? 'text-light bg-dark' : 'text-black bg-light'} p-2 rounded h-100 mb-3 user-menu`}>
                        <Row className="mb-3 py-2">
                            <Col xs={3} className="pe-0">
                                <Image
                                    src={profilePix}
                                    thumbnail
                                    fluid
                                    roundedCircle
                                    className="p-0"
                                />
                            </Col>
                            <Col xs={9} className="pt-1">
                                <span>Bienvenido,</span>
                                <h4>Alan Golubeff</h4>
                            </Col>
                        </Row>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="mb-3">
                                <Nav.Link eventKey="my-orders">
                                    Mis Ordenes
                                    <FaClipboardList size="1.4rem" />
                                </Nav.Link>
                                <Nav.Link eventKey="account-details">
                                    Detalles de la Cuenta
                                    <FaUser size="1.4rem" />
                                </Nav.Link>
                                <Nav.Link eventKey="address">
                                    Direccion
                                    <IoLocationSharp size="1.4rem" />
                                </Nav.Link>
                                <Nav.Link eventKey="wallet">
                                    Billetera
                                    <GiWallet size="1.4rem" />
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8} className={`${theme ? 'text-light bg-dark' : 'text-black bg-light'} p-2 rounded`}>
                        <Tab.Content>
                            <Tab.Pane eventKey="my-orders">
                                <Heading heading="Mis Ordenes" size="h3" />
                                {orders.map((p) => {
                                    return (
                                        <Card key={orders.id} className={`${theme ? 'bg-light-black text-light' : 'bg-light text-black'} mb-3`} border={theme ? 'warning' : 'primary'}>
                                            <Card.Header>
                                                <b>{p.date.toDate().toLocaleDateString()}</b>
                                                <small className="float-end">ID de la orden: {p.id}</small>
                                            </Card.Header>
                                            <Row className="p-2">
                                                <Col xs={3} sm={2}>
                                                    <Card.Img variant="top" src={p.items[0].image} />
                                                </Col>
                                                <Col>
                                                    <Card.Body>
                                                        <Card.Title>{p.buyer.name}</Card.Title>
                                                        <Card.Text>
                                                            <Badge pill bg="success">
                                                                Entregado el {p.date.toDate().toLocaleDateString()}
                                                            </Badge>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                        </Card>)
                                })}

                            </Tab.Pane>
                            <Tab.Pane eventKey="account-details">
                                <Heading heading="Detalles de la Cuenta" size="h3" />
                            </Tab.Pane>
                            <Tab.Pane eventKey="address">
                                <Heading heading="Direccion" size="h3" />
                            </Tab.Pane>
                            <Tab.Pane eventKey="wallet">
                                <Heading heading="Billetera" size="h3" />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default MyAccount;