import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Button } from 'react-bootstrap';

const Riwayat = () => {
    const [showModal, setShowModal] = useState(false);
    const [dataRiwayat, setDataRiwayat] = useState([]);
    const [dataPesanan, setDataPesanan] = useState([]);

    useEffect(() => {
        const savedDataPesanan = localStorage.getItem('dataPesanan');
        if (savedDataPesanan) {
            const parsedDataPesanan = JSON.parse(savedDataPesanan);
            setDataPesanan(parsedDataPesanan);
            const riwayat = parsedDataPesanan.map(pesanan => ({
                IDpenjual: pesanan.IDpenjual,
                IDpembeli: pesanan.IDpembeli,
                namaLukisan: pesanan.namaLukisan,
                tanggalPesanan: pesanan.tanggalLukisan,
                status: pesanan.status,
            }));
            setDataRiwayat(riwayat);
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => setShowModal(true);

    return (
        <div>
            <div className="mb-3">
                <h3 style={{ marginTop: '-1%', color: '#303030' }}>Riwayat</h3>
            </div>
            <Table bordered hover style={{ marginLeft: '2px', width: '98%', marginTop: '5px', borderRadius: '10px' }}>
                <tbody>
                    <tr >
                        <td colSpan="6" style={{ backgroundColor: '#F9F9F9' }}>
                            <text>Riwayat</text>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form style={{ marginBottom: '7px', marginLeft: '925px', width: '300px' }}>
                                <Form.Group controlId="formSearch">
                                    <Form.Control type="text" placeholder="Cari Riwayat..." />
                                </Form.Group>
                            </Form>
                            <Table bordered style={{ borderRadius: '10px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '1%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>No</th>
                                        <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>IDPenjual</th>
                                        <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>IDPembeli</th>
                                        <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Nama Lukisan</th>
                                        <th style={{ width: '3%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Tanggal Pesanan</th>
                                        <th style={{ width: '4%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataRiwayat.map((riwayat, index) => (
                                        <tr key={index}>
                                            {console.log(riwayat)}
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{index + 1}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{riwayat.IDpenjual}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{riwayat.IDpembeli}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{riwayat.namaLukisan}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{riwayat.tanggalPesanan}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{riwayat.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Body>
                    {/* Isi modal untuk menambahkan riwayat */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
                    <Button variant="primary" onClick={() => {
                        // Handle tambah riwayat
                    }}>
                        Tambahkan
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Riwayat;
