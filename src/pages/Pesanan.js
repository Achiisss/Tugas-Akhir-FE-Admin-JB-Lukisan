import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Button } from 'react-bootstrap';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

const Pesanan = () => {
    const [showModal, setShowModal] = useState(false);
    const [dataPesanan, setDataPesanan] = useState([]);
    const [dataPengguna, setDataPengguna] = useState([]);
    const [dataLukisan, setDataLukisan] = useState([]);
    const [counter, setCounter] = useState(1);
    const [editIndex, setEditIndex] = useState(null);
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({ IDPenjual: '', IDPembeli: '', namaLukisan: '', status: '' });


    const handleSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        const result = dataPesanan.filter((pesanan) => {
            const idPenjualString = String(pesanan.idPenjual);
            const idPembeliString = String(pesanan.idPembeli);
            return (
                idPenjualString.toLowerCase().includes(keyword) ||
                idPembeliString.toLowerCase().includes(keyword) ||
                pesanan.namaLukisan.toLowerCase().includes(keyword) ||
                pesanan.tanggalLukisan.toLowerCase().includes(keyword) ||
                pesanan.status.toLowerCase().includes
            );
        });
        setDataPesanan(result);
    };

    

    useEffect(() => {
        const saveData = localStorage.getItem('dataPesanan');
        if (saveData) {
            setDataPesanan(JSON.parse(saveData));
            setCounter(JSON.parse(saveData).length + 1)
        }
        const savedDataPengguna = localStorage.getItem('dataPengguna');
        if (savedDataPengguna) {
            setDataPengguna(JSON.parse(savedDataPengguna));
        }
        const savedDataLukisan = localStorage.getItem('dataLukisan');
        if (savedDataLukisan) {
            setDataLukisan(JSON.parse(savedDataLukisan));
        }
    }, []);


    

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ IDPenjual: '', IDPembeli: '', namaLukisan: '', status: '' });
    };

    const handleShowModal = () => setShowModal(true);

    const handleTambahPesanan = (IDpenjual, IDpembeli, namaLukisan, status, tanggalLukisan) => {
        const newData = { IDpenjual, IDpembeli, namaLukisan, status, tanggalLukisan, dataLukisan: dataLukisan.find(lukisan => lukisan.nama === namaLukisan) };
        setDataPesanan([...dataPesanan, newData]);
        handleCloseModal();
        localStorage.setItem('dataPesanan', JSON.stringify([...dataPesanan, newData]));
    };

    const handleEditPesanan = (index, idpenjual, idpembeli, namaLukisan, status) => {
        const newData = [...dataPesanan];
        newData[index] = { id: dataPesanan[index].id, idpenjual, idpembeli, namaLukisan, status, dataLukisan: dataLukisan.find(lukisan => lukisan.nama === namaLukisan) }
        setDataPesanan(newData);
        setEditIndex(null);
        handleCloseModal();
    };

    const handleStatusChange = (index, newStatus) => {
        const newData = [...dataPesanan];
        newData[index].status = newStatus;
        setDataPesanan(newData);
        localStorage.setItem('dataPesanan', JSON.stringify(newData)); // Menyimpan kembali data pesanan ke localStorage
    };


    console.log(dataPesanan);

    return (
        <div>
            <div className="mb-3">
                <h3 style={{ marginTop: '-1%', color: '#303030' }}>Pesanan</h3>
            </div>
            <Table bordered hover style={{ marginLeft: '2px', width: '98%', marginTop: '5px', borderRadius: '10px' }}>
                <tbody>
                    <tr >
                        <td colSpan="6" style={{ backgroundColor: '#F9F9F9' }}>
                            <Button style={{ backgroundColor: '#4592AF', color: 'white', marginLeft: '3px', border: 'none' }} onClick={handleShowModal}>Tambah Pesanan</Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form style={{ marginBottom: '7px', marginLeft: '925px', width: '300px' }}>
                                <Form.Group controlId="formSearch">
                                    <Form.Control type="text" placeholder="Cari Pesanan..." onChange={handleSearch} />
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
                                    {dataPesanan.map((pesanan, index) => (
                                        <tr key={index}>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{index + 1}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pesanan.IDpenjual}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pesanan.IDpembeli}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pesanan.namaLukisan}</td>
                                            <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pesanan.tanggalLukisan}</td>
                                            <td>
                                                <DropdownButton style={{ border: 'none' }} title={pesanan.status} onSelect={(eventKey) => { setStatus(eventKey); handleStatusChange(index, eventKey); }}>
                                                    <Dropdown.Item eventKey="Belum Bayar">Belum Bayar</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Sudah Bayar">Sudah Bayar</Dropdown.Item>
                                                    <Dropdown.Item eventKey="OTW">OTW</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Diterima">Diterima</Dropdown.Item>
                                                </DropdownButton>
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
                    <Modal.Title>Tambah Data Pesanan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form.Group controlId="formIdPenjual">
                        <Form.Label>ID Penjual</Form.Label>
                        <Form.Control as="select">
                            {dataPengguna.filter(pengguna => pengguna.peran === 'Penjual').map((pengguna, index) => (
                                <option key={index} value={index + 1}>{`Id ${pengguna.id} - ${pengguna.namaDepan}`}</option>
                                
                            ))}
                        </Form.Control>
                    </Form.Group> */}
                    <Form.Group controlId="formIdPenjual">
                        <Form.Label>ID Penjual</Form.Label>
                        <Form.Control as="select" value={formData.IDPenjual} onChange={(e) => setFormData({ ...formData, IDPenjual: e.target.value })}>
                            {dataPengguna.filter(pengguna => pengguna.peran === 'Penjual').map((pengguna, index) => (
                                <option key={index} value={pengguna.id}>{`Id ${pengguna.id} - ${pengguna.namaDepan}`}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formIdPembeli">
                        <Form.Label>ID Pembeli</Form.Label>
                        <Form.Control as="select" value={formData.IDPembeli} onChange={(e) => setFormData({ ...formData, IDPembeli: e.target.value })}>
                            {dataPengguna.filter(pengguna => pengguna.peran === 'Pembeli').map((pengguna, index) => (
                                <option key={index} value={pengguna.id}>{`Id ${pengguna.id} - ${pengguna.namaDepan}`}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formNamaLukisan">
                        <Form.Label>Nama Lukisan</Form.Label>
                        <Form.Control as="select" value={formData.namaLukisan} onChange={(e) => setFormData({ ...formData, namaLukisan: e.target.value })}>

                            {dataLukisan.map((lukisan, index) => (
                                <option key={index} value={lukisan.nama}>{lukisan.nama}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formTanggalPesan">
                        <Form.Label>Tanggal Pesanan</Form.Label>
                        <div className="input-group">
                            <Form.Control type="date" value={formData.tanggalPesanan} onChange={(e) => setFormData({ ...formData, tanggalPesanan: e.target.value })} />
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
                    <Button style={{ backgroundColor: '#4592AF', color: 'white' }} onClick={() => {
                        const IDPenjual = document.getElementById('formIdPenjual').value;
                        const IDPembeli = document.getElementById('formIdPembeli').value;
                        const namaLukisan = document.getElementById('formNamaLukisan').value;
                        const tanggalLukisan = document.getElementById('formTanggalPesan').value;
                        const status = 'Pilih status'; // Default status
                        const pesananData = { IDPenjual, IDPembeli, namaLukisan, status };

                        if (editIndex !== null) {
                            handleEditPesanan(editIndex, IDPenjual, IDPembeli, namaLukisan, status, tanggalLukisan);
                        } else {
                            handleTambahPesanan(IDPenjual, IDPembeli, namaLukisan, status, tanggalLukisan);
                        }
                    }}>
                        {editIndex !== null ? 'Simpan Perubahan' : 'Tambahkan'}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Pesanan;



// import React, { useState, useEffect } from 'react';
// import { Table, Modal, Form, Button } from 'react-bootstrap';
// import { DropdownButton, Dropdown } from 'react-bootstrap';
// import 'react-datepicker/dist/react-datepicker.css';

// const Pesanan = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [dataPesanan, setDataPesanan] = useState([]);
//     const [dataPengguna, setDataPengguna] = useState([]);
//     const [dataLukisan, setDataLukisan] = useState([]);
//     const [counter, setCounter] = useState(1);

//     useEffect(() => {
//         const saveData = localStorage.getItem('dataPesanan');
//         if (saveData) {
//             setDataPesanan(JSON.parse(saveData));
//             setCounter(JSON.parse(saveData).length + 1)
//         }
//         const savedDataPengguna = localStorage.getItem('dataPengguna');
//         if (savedDataPengguna) {
//             setDataPengguna(JSON.parse(savedDataPengguna));
//         }
//         const savedDataLukisan = localStorage.getItem('dataLukisan');
//         if (savedDataLukisan) {
//             setDataLukisan(JSON.parse(savedDataLukisan));
//         }
//     }, []);

//     const [editIndex, setEditIndex] = useState(null);
//     const [status, setStatus] = useState('');
//     const [formData, setFormData] = useState({ idPenjual: '', idPembeli: '', namaLukisan: '', status: '' });

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setFormData({ idPenjual: '', idPembeli: '', namaLukisan: '', status: '' });
//     };

//     const handleShowModal = () => setShowModal(true);

//     const handleTambahPesanan = (idpenjual, idpembeli, namaLukisan, status) => {
//         const newData = { id: counter, idpenjual, idpembeli, namaLukisan, status, dataLukisan: dataLukisan.find(lukisan => lukisan.nama === namaLukisan) };
//         console.log("Data yang akan ditambahkan:", newData); // Tambahkan log untuk memeriksa data yang akan ditambahkan
//         setDataPesanan([...dataPesanan, newData]);
//         handleCloseModal();
//     };

//     const handleEditPesanan = (index, idpenjual, idpembeli, namaLukisan, status) => {
//         const newData = [...dataPesanan];
//         newData[index] = { id: dataPesanan[index].id, idpenjual, idpembeli, namaLukisan, status, dataLukisan: dataLukisan.find(lukisan => lukisan.nama === namaLukisan) }
//         console.log("Data yang akan diubah:", newData[index]); // Tambahkan log untuk memeriksa data yang akan diubah
//         setDataPesanan(newData);
//         setEditIndex(null);
//         handleCloseModal();
//     };

//     const handleStatusChange = (index, newStatus) => {
//         const newData = [...dataPesanan];
//         newData[index].status = newStatus;
//         setDataPesanan(newData);
//     };

//     return (
//         <div>
//             <div className="mb-3">
//                 <h3 style={{ marginTop: '-1%', color: '#303030' }}>Pesanan</h3>
//             </div>
//             <Table bordered hover style={{ marginLeft: '2px', width: '98%', marginTop: '5px', borderRadius: '10px' }}>
//                 <tbody>
//                     <tr>
//                         <td colSpan="6" style={{ backgroundColor: '#F9F9F9' }}>
//                             <Button style={{ backgroundColor: '#4592AF', color: 'white', marginLeft: '3px', border: 'none' }} onClick={handleShowModal}>Tambah Pesanan</Button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colSpan="6">
//                             <Form style={{ marginBottom: '7px', marginLeft: '925px', width: '300px' }}>
//                                 <Form.Group controlId="formSearch">
//                                     <Form.Control type="text" placeholder="Cari Pesanan..." />
//                                 </Form.Group>
//                             </Form>
//                             <Table bordered style={{ borderRadius: '10px' }}>
//                                 <thead>
//                                     <tr>
//                                         <th style={{ width: '1%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>No</th>
//                                         <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>IDPenjual</th>
//                                         <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>IDPembeli</th>
//                                         <th style={{ width: '2%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Nama Lukisan</th>
//                                         <th style={{ width: '3%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Tanggal Pesanan</th>
//                                         <th style={{ width: '4%', fontSize: 'smaller', color: '#303030', backgroundColor: '#F9F9F9' }}>Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {dataPesanan.map((pesanan, index) => (
//                                         <tr key={index}>
//                                             <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{index + 1}</td>
//                                             <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pesanan.IDPenjual}</td>
//                                             <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pesanan.IDPembeli}</td>
//                                             <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pesanan.NamaLukisan}</td>
//                                             <td style={{ color: '#6D6D6D', fontSize: 'smaller' }}>{pesanan.TanggalPesan}</td>
//                                             <td>
//                                                 <DropdownButton style={{}} title={status || 'Pilih Status'} onSelect={(eventKey) => { setStatus(eventKey); handleStatusChange(index, eventKey); }}>
//                                                     <Dropdown.Item eventKey="Belum Bayar">Belum Bayar</Dropdown.Item>
//                                                     <Dropdown.Item eventKey="Sudah Bayar">Sudah Bayar</Dropdown.Item>
//                                                     <Dropdown.Item eventKey="OTW">OTW</Dropdown.Item>
//                                                     <Dropdown.Item eventKey="Diterima">Diterima</Dropdown.Item>
//                                                 </DropdownButton>
//                                             </td>
//                                         </tr>
//                                     ))}

//                                 </tbody>
//                             </Table>
//                         </td>
//                     </tr>
//                 </tbody>
//             </Table>
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Tambah Data Pesanan</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 <Form.Group controlId="formIdPenjual">
//                         <Form.Label>ID Penjual</Form.Label>
//                         <Form.Control as="select">
//                             {dataPengguna.filter(pengguna => pengguna.peran === 'Penjual').map((pengguna, index) => (
//                                 <option key={index} value={index + 1}>{`Id ${index + 1} - ${pengguna.namaDepan}`}</option>
//                             ))}
//                         </Form.Control>
//                     </Form.Group>
//                     <Form.Group controlId="formIdPembeli">
//                         <Form.Label>ID Pembeli</Form.Label>
//                         <Form.Control as="select">
//                             {dataPengguna.filter(pengguna => pengguna.peran === 'Pembeli').map((pengguna, index) => (
//                                 <option key={index} value={index + 1}>{`Id ${index + 1} - ${pengguna.namaDepan}`}</option>
//                             ))}
//                         </Form.Control>
//                     </Form.Group>
//                     <Form.Group controlId="formNamaLukisan">
//                         <Form.Label>Nama Lukisan</Form.Label>
//                         <Form.Control as="select" value={formData.namaLukisan} onChange={(e) => setFormData({ ...formData, namaLukisan: e.target.value })}>
//                             <option value="">Pilih Nama Lukisan</option>
//                             {dataLukisan.map((lukisan, index) => (
//                                 <option key={index} value={lukisan.nama}>{lukisan.nama}</option>
//                             ))}
//                         </Form.Control>
//                     </Form.Group>
//                     <Form.Group controlId="formTanggalPesan">
//                         <Form.Label>Tanggal Pesanan</Form.Label>
//                         <div className="input-group">
//                             <Form.Control type="date" value={formData.tanggalPesanan} onChange={(e) => setFormData({ ...formData, tanggalPesanan: e.target.value })} />
//                         </div>
//                     </Form.Group>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
//                     <Button variant="primary" onClick={() => {
//                         const IDPenjual = document.getElementById('formIdPenjual').value;
//                         const IDPembeli = document.getElementById('formIdPembeli').value;
//                         const namaLukisan = document.getElementById('formNamaLukisan').value;
//                         const tanggalLukisan = document.getElementById('formTanggalPesan').value;
//                         const status = 'Belum Di Bayar'; // Default status
//                         const pesananData = { IDPenjual, IDPembeli, namaLukisan, status };

//                         if (editIndex !== null) {
//                             handleEditPesanan(editIndex, IDPenjual, IDPembeli, namaLukisan, status, tanggalLukisan);
//                         } else {
//                             handleTambahPesanan(IDPenjual, IDPembeli, namaLukisan, status, tanggalLukisan);
//                         }
//                     }}>
//                         {editIndex !== null ? 'Simpan Perubahan' : 'Tambahkan'}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default Pesanan;



