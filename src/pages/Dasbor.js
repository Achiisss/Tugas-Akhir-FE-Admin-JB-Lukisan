import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Table, Button, Modal } from 'react-bootstrap';

const Dasbor = () => {
    const [showModal, setShowModal] = useState(false);
    const [pesanan, setPesanan] = useState([]);
    const [lukisan, setLukisan] = useState([]);       
    const [jumlahLukisan, setJumlahLukisan] = useState(0);
    const [jumlahPesanan, setJumlahPesanan] = useState(0);
    const [jumlahPengguna, setJumlahPengguna] = useState(0);

    useEffect(() => {
    const dataLukisan = JSON.parse(localStorage.getItem('dataLukisan'));
    const dataPengguna = JSON.parse(localStorage.getItem('dataPengguna'));
    const dataPesanan = JSON.parse(localStorage.getItem('dataPesanan'));
    if (dataLukisan ) {
        setJumlahLukisan(dataLukisan.length);
    }
    if ( dataPesanan ) {
        setJumlahPesanan(dataPesanan.length);
    }
    if (dataPengguna) {
        setJumlahPengguna(dataPengguna.length);
    }
}, []);

    useEffect(() => {
        const dataLukisan = localStorage.getItem('dataLukisan');
        if (dataLukisan) {
            setLukisan(JSON.parse(dataLukisan));
        }
        const dataPesanan = localStorage.getItem('dataPesanan');
        if (dataPesanan) {
            setPesanan(JSON.parse(dataPesanan));
        }
    }, []);



    const handleShowModal = (index) => {
        const modalName = `showModal${index}`;
        setShowModal(prevState => ({ ...prevState, [modalName]: true }));
    };

    // Fungsi untuk menutup modal gambar
    const handleCloseModal = (index) => {
        const modalName = `showModal${index}`;
        setShowModal(prevState => ({ ...prevState, [modalName]: false }));
    };

    const renderLukisan = () => {
        return lukisan.slice(0, 3).map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <Button variant="link" onClick={() => handleShowModal(index)}>
                        <img src={item.gambarUrl} alt={`GambarUrl ${index + 1}`} style={{ width: '70px', height: '50px' }} />
                    </Button>
                    <Modal show={showModal[`showModal${index}`]} onHide={() => handleCloseModal(index)} centered>
                        <Modal.Body>
                            <img src={item.gambarUrl} alt={`GambarUrl ${index + 1}`} style={{ width: '100%' }} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleCloseModal(index)}>
                                Tutup
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </td>
                <td>{item.nama}</td>
                <td>{item.idPenjual}</td>
                <td>{item.harga}</td>
            </tr>
        ));
    };

    const renderPesanan = () => {
        return pesanan.slice(0, 5).map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.IDpenjual}</td>
                <td>{item.IDpembeli}</td>
                <td>{item.namaLukisan}</td>
                <td>{item.status}</td>
            </tr>
        ));
    };

    return (
        <div>
            <div className="mb-3">
                <h3 style={{ marginTop: '-1%', color: '#303030' }}>Dasbor</h3>
            </div>
            <div className="d-flex justify-content-between mb-3" >
                <div className="col-md-3" style={{ margin: '0 3px', marginLeft: '2px' }}>
                    <a href='/lukisan' style={{ textDecoration: 'none' }}>
                        <Card style={{ borderRadius: '3px', height: '88%', width: '120%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <Card.Body className="d-flex p-0">
                                <div style={{ backgroundColor: '#4592AF', width: '100px', height: '88%', margin: '0', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '3px', borderBottomLeftRadius: '3px' }}>
                                    <i className="bi bi-easel" style={{ fontSize: '3rem', color: 'white' }}></i>
                                </div>
                                <div className="p-3">
                                    <h2 style={{ marginLeft: '213px', color: '#303030' }}>{jumlahLukisan}</h2>
                                    <p style={{ marginLeft: '177px', marginTop: '-5px', color: '#303030' }}>Lukisan</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </a>
                </div>
                <div className="col-md-3" style={{ margin: '0 15px', marginLeft: '28px' }}>
                    <a href='/Pesanan' style={{ textDecoration: 'none' }}>
                        <Card style={{ borderRadius: '3px', height: '88%', width: '120%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <Card.Body className="d-flex p-0">
                                <div style={{ backgroundColor: '#4592AF', width: '100px', height: '88%', margin: '0', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '3px', borderBottomLeftRadius: '3px' }}>
                                    <i className="bi bi-bag" style={{ fontSize: '3rem', color: 'white' }}></i>
                                </div>
                                <div className="p-3">
                                    <h2 style={{ marginLeft: '214px', color: '#303030' }}>{jumlahPesanan}</h2>
                                    <p style={{ marginLeft: '172px', marginTop: '-5px', color: '#303030' }}>Pesanan</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </a>
                </div>
                <div className="col-md-3" style={{ margin: '0 15px', marginRight: '86px' }}>
                    <a href='/pengguna' style={{ textDecoration: 'none' }}>
                        <Card style={{ borderRadius: '3px', height: '88%', width: '120%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <Card.Body className="d-flex p-0">
                                <div style={{ backgroundColor: '#4592AF', width: '100px', height: '88%', margin: '0', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '3px', borderBottomLeftRadius: '3px' }}>
                                    <i className="bi bi-person" style={{ fontSize: '3rem', color: 'white' }}></i>
                                </div>
                                <div className="p-3">
                                    <h2 style={{ marginLeft: '212px', color: '#303030' }}>{jumlahPengguna}</h2>
                                    <p style={{ marginLeft: '156px', marginTop: '-5px', color: '#303030' }}>pengguna</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </a>
                </div>
            </div>




            <Table bordered hover style={{ marginLeft: '2px', width: '98%', marginTop: '-15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                <tbody>
                    <tr>
                        <td colSpan="5" style={{ backgroundColor: '#F9F9F9' }}>
                            <text style={{ fontWeight: 'bold', color: '#303030' }}>Lukisan</text>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5">
                            <Table bordered >
                                <thead>
                                    <tr>
                                        <th style={{ width: '1%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>No</th>
                                        <th style={{ width: '4%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>Gambar Lukisan</th>
                                        <th style={{ width: '3%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>Nama Lukisan</th>
                                        <th style={{ width: '3%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>IDPenjual</th>
                                        <th style={{ width: '3%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderLukisan()}
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                </tbody>
            </Table>


            <Table bordered hover style={{ marginLeft: '2px', width: '98%', marginTop: '5px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <tbody>
                    <tr>
                        <td colSpan="5" style={{ backgroundColor: '#F9F9F9' }}>
                            <text style={{ fontWeight: 'bold', color: '#303030' }}>Pesanan</text>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5">
                            <Table bordered style={{ borderRadius: '10px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '1%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>No</th>
                                        <th style={{ width: '2%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>IDPenjual</th>
                                        <th style={{ width: '2%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>IDPembeli</th>
                                        <th style={{ width: '3%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>Nama Lukisan</th>
                                        <th style={{ width: '4%', color: '#303030', fontSize: 'smaller', backgroundColor: '#F9F9F9' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderPesanan()}
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                </tbody>
            </Table>



        </div >
    );
};

export default Dasbor;