import logo from '../assets/logo.jpg'
import '../styles/Header.css'

const Header = () => {
  return (
    <div className = "header-container">
      <div className = 'logo-container'>
        <img src = {logo} id = "header-logo" />
        <h2>Cina-Mọt</h2>
      </div>  

      <div className = 'search-container'>
        <input type='text' placeholder='Tìm kiếm phim...'>
        </input>
        <i className="fa fa-search" aria-hidden="true" id = 'search-icon'></i>        
      </div>

      <div className = 'menu-container'>
        <nav className = 'menu'>
          <ul>
            <li><a>Trang chủ  </a></li>
            <li><a>Thể loại <i className="fa-solid fa-caret-down"></i></a></li>
            <li><a>Xem nhiều nhất</a></li>
          </ul>
        </nav>
      </div>

    </div>
  )
}

export default Header
