import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Button } from 'react-bootstrap';

const Pengguna = () => {
    const [showModal, setShowModal] = useState(false);
    const [dataPengguna, setDataPengguna] = useState([]);
    const [Id, setId] = useState(0);
    const [editIndex] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem('dataPengguna');
        if (savedData) {
            const dataPengguna = JSON.parse(savedData);
            const maxId = dataPengguna.reduce((max, pengguna) => (pengguna.id > max ? pengguna.id : max), 0);
            setId(maxId); // Menambahkan 1 dari Id terbesar yang ada di local storage
            setDataPengguna(dataPengguna);
            console.log(Id)
        }
        console.log(Id)
    }, []);
    console.log(Id)

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => setShowModal(true);

    const handleSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        const result = dataPengguna.filter((pengguna) => {
            return (
                pengguna.namaDepan.toLowerCase().includes(keyword) ||
                pengguna.namaBelakang.toLowerCase().includes(keyword) ||
                pengguna.namaDepan.toLowerCase().includes(keyword) ||
                pengguna.email.toLowerCase().includes(keyword) ||
                pengguna.alamat.toLowerCase().includes(keyword) ||
                pengguna.peran.toLowerCase().includes(keyword)
            );
        });
        setDataPengguna(result);
    };

    const handleTambahPengguna = (penggunaData) => {
        const newID = Id + 1
        const newData = [...dataPengguna, { ...penggunaData, id: newID }];
        setDataPengguna(newData);
        localStorage.setItem('dataPengguna', JSON.stringify(newData));
        window.location.reload()
        handleCloseModal();
    };

    return (
        <div>
            <div className="mb-3">
                <h3 style={{ marginTop: '-1%', color: '#303030' }}>Pengguna</h3>
            </div>
            <Table bordered hover style={{ marginLeft: '2px', width: '98%', marginTop: '5px', borderRadius: '10px' }}>
                <tbody>
                    <tr >
                        <td colSpan="6" style={{ backgroundColor: '#F9F9F9' }}>
                            <Button style={{ backgroundColor: '#4592AF', color: 'white', marginLeft: '3px', border: 'none' }} onClick={handleShowModal}>Tambah Pengguna</Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form style={{ marginBottom: '7px', marginLeft: '925px', width: '300px' }}>
                                <Form.Group controlId="formSearch">
                                    <Form.Control type="text" placeholder="Cari Pengguna..." onChange={handleSearch} />
                                </Form.Group>
                            </Form>
                            <Table bordered style={{ borderRadius: '10px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '1%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>No</th>
                                        <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Nama Depan</th>
                                        <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Nama Belakang</th>
                                        <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Email</th>
                                        <th style={{ width: '3%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Alamat</th>
                                        <th style={{ width: '4%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Jenis Kelamin</th>
                                        <th style={{ width: '4%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Peran</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPengguna.map((pengguna, index) => (
                                        <tr key={index}>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{index + 1}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pengguna.namaDepan}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pengguna.namaBelakang}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pengguna.email}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pengguna.alamat}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pengguna.jenisKelamin}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pengguna.peran}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? 'Edit Data Pengguna' : 'Tambah Data Pengguna'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formNamaDepan">
                        <Form.Label>Nama Depan</Form.Label>
                        <Form.Control type="text" placeholder="Masukkan nama depan" />
                    </Form.Group>
                    <Form.Group controlId="formNamaBelakang">
                        <Form.Label>Nama Belakang</Form.Label>
                        <Form.Control type="text" placeholder="Masukkan nama belakang" />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Masukkan email" />
                    </Form.Group>
                    <Form.Group controlId="formAlamat">
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control type="text" placeholder="Masukkan alamat" />
                    </Form.Group>
                    <Form.Group controlId="formJenisKelamin">
                        <Form.Label>Jenis Kelamin</Form.Label>
                        <Form.Control as="select">
                            <option value="L">L (Male)</option>
                            <option value="P">P (Female)</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPeran">
                        <Form.Label>Peran</Form.Label>
                        <Form.Control as="select">
                            <option value="Penjual">Penjual</option>
                            <option value="Pembeli">Pembeli</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
                    <Button variant="primary" onClick={() => {
                        const namaDepan = document.getElementById('formNamaDepan').value;
                        const namaBelakang = document.getElementById('formNamaBelakang').value;
                        const email = document.getElementById('formEmail').value;
                        const alamat = document.getElementById('formAlamat').value;
                        const jenisKelamin = document.getElementById('formJenisKelamin').value;
                        const peran = document.getElementById('formPeran').value;

                        // Validasi email
                        if (!email.includes('@gmail.com')) {
                            alert('Email harus berformat @gmail.com');
                            return;
                        }

                        const penggunaData = { namaDepan, namaBelakang, email, alamat, jenisKelamin, peran };

                        if (editIndex === null) {
                            handleTambahPengguna(penggunaData);
                        }
                    }}>
                        {editIndex !== null ? 'Simpan Perubahan' : 'Tambahkan'}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Pengguna;
