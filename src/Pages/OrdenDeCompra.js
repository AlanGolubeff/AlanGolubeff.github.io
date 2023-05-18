import React, { useState } from 'react'
import { addDoc, collection, getFirestore, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { useCart } from 'react-use-cart';
import { Form, Button, Modal } from 'react-bootstrap';


import { useThemeHook } from '../GlobalComponents/ThemeProvider';
export default function OrdenDeCompra() {
    //const [theme] = useThemeHook;
    const {
        items,
        cartTotal,
        emptyCart,
    } = useCart();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [orderCode, setOrderCode] = useState('');
    let newStock = 0
    // const db = getFirestore();

    const order = {
        buyer: { name: name, phone: phone, email: email, address: address },
        items: items,
        total: cartTotal,
        date: serverTimestamp()
    }
    const sendOrder = () => {
        const db = getFirestore();
        const orderCollection = collection(db, 'Orders');
        addDoc(orderCollection, order).then(({ id }) => {
            setOrderCode(id);
            emptyCart();
        })
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    /*items.map(prod => {
        const dbs = getFirestore();
        const queryUpdate = doc(dbs, 'productsPrimaryArray', prod.Id)
        if (prod.stock > 0) {
            newStock = (prod.stock - prod.quantity)
        }
        updateDoc(queryUpdate, { stock: newStock })
        return (console.log(newStock))
    })*/
    return (
        <>

            <div className='buyForm'>
                <Form onSubmit={(e) => { e.preventDefault(); sendOrder() }}>
                    <input type="text" value={name} name="nameForm" id="nameForm" placeholder="name"
                        onChange={(e) => setName(e.target.value)} required
                    />
                    <input type="text" value={email} name="emailForm" id="emailForm" placeholder='email@email.com'
                        onChange={(e) => setEmail(e.target.value)} required
                    />
                    <input type="text" value={phone} name="phoneForm" id="phoneForm" placeholder='+54(0XX)XXX-XX-XX'
                        onChange={(e) => setPhone(e.target.value)} required
                    />
                    <input type="text" value={address} name="addressForm" id="addressForm" required placeholder='Avenida Siempre Viva 123'
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {
                        items.length === 0 ?
                            <Button variant="contained" disabled >Enviar</Button> :
                            <Button onClick={handleOpen} type="submit" variant="contained" >Enviar</Button>
                    }
                </Form>
                {
                    orderCode === "" ? null :
                        <Modal
                            show={open}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Modal heading
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h2>{name}</h2>
                                <h2>{email}</h2>
                                <h2>{phone}</h2>
                                <h2>{address}</h2>
                                <h2>{cartTotal}</h2>
                                <h2>{orderCode}</h2>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleClose} >Close</Button>
                            </Modal.Footer>
                        </Modal>
                }
            </div>
        </>
    )
}