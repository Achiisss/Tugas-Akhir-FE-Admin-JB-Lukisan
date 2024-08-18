import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Button } from 'react-bootstrap';

const Lukisan = () => {
    const [showModal, setShowModal] = useState(false);
    const [dataLukisan, setDataLukisan] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [gambarUrl, setGambarUrl] = useState(null);
    const [showModalGambar, setShowModalGambar] = useState(false);
    const [gambarModalUrl, setGambarModalUrl] = useState(null);
    const [dataPengguna, setDataPengguna] = useState([]);
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const savedData = localStorage.getItem('dataLukisan');
        if (savedData) {
            setDataLukisan(JSON.parse(savedData));
            setCounter(JSON.parse(savedData).length + 1);
        }
        const savedGambarUrl = localStorage.getItem('gambarUrl');
        if (savedGambarUrl) {
            setGambarUrl(savedGambarUrl);
        }
        const savedDataPengguna = localStorage.getItem('dataPengguna');
        if (savedDataPengguna) {
            setDataPengguna(JSON.parse(savedDataPengguna));
        }
    }, []);

    const handleSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        const result = dataLukisan.filter((lukisan) => {
            // Pastikan bahwa idPenjual adalah string sebelum memanggil toLowerCase()
            const idPenjualString = String(lukisan.idPenjual);
            return (
                lukisan.nama.toLowerCase().includes(keyword) ||
                idPenjualString.toLowerCase().includes(keyword) ||
                lukisan.harga.toLowerCase().includes(keyword)
            );
        });
        setDataLukisan(result);
    };

    const updateDataLukisan = (newData) => {
        localStorage.setItem('dataLukisan', JSON.stringify(newData));
        setDataLukisan(newData);
    };

    const [formData, setFormData] = useState({
        gambarUrl: '',
        nama: '',
        idPenjual: '',
        harga: '',
        jenisKelamin: ''
    });

    const handleHapusLukisan = (index) => {
        const confirmation = window.confirm("Apakah Anda yakin untuk menghapus data ini?");
        if (confirmation) {
            const newData = [...dataLukisan];
            newData.splice(index, 1);
            updateDataLukisan(newData);
        };
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setGambarUrl(null);
    };

    const handleShowModal = () => setShowModal(true);

    const handleCloseModalGambar = () => setShowModalGambar(false);
    const handleShowModalGambar = (gambarUrl) => {
        setGambarModalUrl(gambarUrl);
        setShowModalGambar(true);
    };

    const handleTambahLukisan = (nama, harga, gambarUrl, id) => {
        const idPenjual = dataPengguna.find(pengguna => pengguna.peran === 'Penjual').id;
        const penjual = dataPengguna.find(pengguna => pengguna.id === idPenjual);
        console.log("ini adalah id : ", id)
        const newData = [...dataLukisan, { id: counter, nama, harga, gambarUrl, idPenjual: id, namaPenjual: `${penjual.namaDepan} ` }];
        updateDataLukisan(newData);
        handleCloseModal(); // Menutup modal setelah menambahkan data baru
    };

    const handleEditLukisan = (index, nama, idPenjual, harga, gambarUrl) => {
        const newData = [...dataLukisan];
        newData[index] = { id: dataLukisan[index].id, nama, idPenjual, harga, gambarUrl };
        updateDataLukisan(newData);
        setEditIndex(null);
        handleCloseModal();
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        setFormData(dataLukisan[index]);
        setGambarUrl(dataLukisan[index].gambarUrl);
        handleShowModal();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setGambarUrl(url);

        // Simpan URL gambar ke local storage
        localStorage.setItem('gambarUrl', url);
    };


    return (
        <div>
            <div className="mb-3">
                <h3 style={{ marginTop: '-1%', color: '#303030' }}>Lukisan</h3>
            </div>
            <Table bordered hover style={{ marginLeft: '2px', width: '98%', marginTop: '5px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <tbody>
                    <tr >
                        <td colSpan="6" style={{ backgroundColor: '#F9F9F9' }}>
                            <Button style={{ backgroundColor: '#4592AF', color: 'white', marginLeft: '3px', border: 'none' }} onClick={handleShowModal}>Tambah Data Lukisan</Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form style={{ marginBottom: '7px', marginLeft: '925px', width: '300px' }}>
                                <Form.Group controlId="formSearch">
                                    <Form.Control type="text" placeholder="Cari lukisan..." onChange={handleSearch}   />
                                </Form.Group>
                            </Form>
                            <Table bordered style={{ borderRadius: '10px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '1%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>No</th>
                                        <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Gambar Lukisan</th>
                                        <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Nama Lukisan</th>
                                        <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>IDPenjual</th>
                                        <th style={{ width: '3%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Harga</th>
                                        <th style={{ width: '4%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataLukisan.map((lukisan, index) => (
                                        <tr key={index}>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{index + 1}</td>
                                            <td>
                                                <Button variant="link" onClick={() => handleShowModalGambar(lukisan.gambarUrl)}>
                                                    <img src={lukisan.gambarUrl} alt={`Gambar ${index + 1}`} style={{ width: '70px', height: '50px' }} />
                                                </Button>
                                            </td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{lukisan.nama}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{lukisan.idPenjual}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{lukisan.harga}</td>
                                            <td>
                                                <Button variant="secondary" onClick={() => handleEditClick(index)} >Edit</Button>
                                                <Button variant="danger" onClick={() => handleHapusLukisan(index)} style={{ marginLeft: '5px' }}>Hapus</Button>
                                            </td>
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
                    <Modal.Title>{editIndex !== null ? 'Edit Data Lukisan' : 'Tambah Data Lukisan'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formGambar">
                        <Form.Label>Gambar Lukisan: </Form.Label>
                        {gambarUrl && <img src={gambarUrl} alt="Preview" style={{ width: '30%', margin: '5px' }} />}
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Form.Group controlId="formNama">
                        <Form.Label>Nama Lukisan</Form.Label>
                        <Form.Control type="text" placeholder="Masukkan nama lukisan" />
                    </Form.Group>
                    {/* <Form.Group controlId="formIdPenjual">
                        <Form.Label>ID Penjual</Form.Label>
                        <Form.Control as="select">
                            {dataPengguna.filter(pengguna => pengguna.peran === 'Penjual').map(pengguna => (
                                <option key={pengguna.id} value={pengguna.id}>{`Id ${pengguna.id} - ${pengguna.namaDepan}`}</option>
                            ))}
                        </Form.Control>
                    </Form.Group> */}
                    <Form.Group controlId="formIdPenjual">
                        <Form.Label>ID Penjual</Form.Label>
                        <Form.Control as="select" value={formData.idPenjual} onChange={(e) => setFormData({ ...formData, idPenjual: e.target.value })}>
                            {dataPengguna.filter(pengguna => pengguna.peran === 'Penjual').map((pengguna, index) => (
                                <option key={index} value={pengguna.id}>{`Id ${pengguna.id} - ${pengguna.namaDepan}`}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formHarga">
                        <Form.Label>Harga</Form.Label>
                        <Form.Control type="text" placeholder="Masukkan harga" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
                    <Button variant="primary" onClick={() => {
                        const nama = document.getElementById('formNama').value;
                        const idPenjual = document.getElementById('formIdPenjual').value;
                        const harga = document.getElementById('formHarga').value;
                        if (editIndex !== null) {
                            handleEditLukisan(editIndex, nama, idPenjual, harga, gambarUrl);
                        } else {
                            handleTambahLukisan(nama, harga, gambarUrl, idPenjual);
                        }
                    }}>
                        {editIndex !== null ? 'Simpan Perubahan' : 'Tambahkan'}
                    </Button>

                </Modal.Footer>
            </Modal>
            <Modal show={showModalGambar} onHide={handleCloseModalGambar} centered>
                <Modal.Body>
                    <img src={gambarModalUrl} alt="gambar" style={{ width: '100%' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalGambar}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Lukisan;
