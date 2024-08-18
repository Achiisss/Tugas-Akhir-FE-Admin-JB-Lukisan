import React from 'react'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
 
const Sidebar = () => { 
  return ( 
    <div className='text-white p-2 pt-3' style={{ width: '250px', height: '100%', backgroundColor: '#303030', boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)', position: 'fixed', top: 0, left: 0, overflowY: 'auto' }}> 
      <a href='/' style={{ color: 'inherit', textDecoration: 'none' }}> 
        <img src='/images/Support.png' alt='Logo' style={{ width: '26px', height: '33px', marginLeft: '12px' }} /> 
        <span className='ms-3 fs-5 fw-bold ' style={{ color: '#4592AF' }}>ADMINISTRATOR</span> 
      </a> 
      <hr className='text-secondary' /> 
      <ul className='nav nav-pills flex-column'> 
        <li className='nav-item p-1'> 
        <a href='/' className='nav-link text-white' aria-current='page'> 
        <i className='bi bi-speedometer2 me-3 fs-5'></i> 
        <span className='fs-6 '>Dasbor</span> 
        </a>
        </li> 
        <li className='nav-item p-1'> 
          <a href='/lukisan' className='nav-link text-white' aria-current='page'> 
            <i className='bi bi-easel me-3 fs-5'></i> 
            <span className='fs-6 '>Lukisan</span> 
          </a> 
        </li> 
        <li className='nav-item p-1'> 
          <a href='/pengguna' className='nav-link text-white' aria-current='page'> 
            <i className='bi bi-person me-3 fs-5'></i> 
            <span className='fs-6 '>Pengguna</span> 
          </a> 
        </li> 
        <li className='nav-item p-1'> 
          <a href='/pesanan' className='nav-link text-white' aria-current='page'> 
            <i className='bi bi-bag me-3 fs-5'></i> 
            <span className='fs-6 '>Pesanan</span> 
          </a> 
        </li> 
        <li className='nav-item p-1'> 
          <a href='/riwayat' className='nav-link text-white' aria-current='page'> 
            <i className='bi bi-clock-history me-3 fs-5'></i> 
            <span className='fs-6 '>Riwayat</span> 
          </a> 
        </li> 
        <li className='nav-item p-1'> 
          <a href='/login' className='nav-link text-white' aria-current='page'> 
            <i className='bi bi-arrow-bar-left me-3 fs-5'></i> 
            <span className='fs-6 '>Logout </span> 
          </a> 
        </li> 
      </ul> 
    </div> 
  ); 
}; 
 
export default Sidebar;