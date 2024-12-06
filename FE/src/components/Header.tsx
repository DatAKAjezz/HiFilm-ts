import { useState } from 'react'
import logo from '../assets/logo.jpg'
import '../styles/Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`)
  }

  return (
    <div className = "header-container">
      <div className = 'logo-container'>
        <img src = {logo} id = "header-logo" />
        <h2>CinaMọt</h2>
      </div>  

      <div className = 'search-container'>
        <form onSubmit={handleSearch}>
          <input 
              type='text' 
              placeholder='  Tìm kiếm phim...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}      
          >
          </input>
          <i className="fa fa-search" aria-hidden="true" id = 'search-icon'></i>        
        </form>
      </div>

      <div className = 'menu-container'>
        <nav className = 'menu'>
          <ul>
            <li><a>Trang chủ  </a></li>
            <li><a>Thể loại <i className="fa-solid fa-caret-down"></i></a></li>
            <li><a>Xem nhiều nhất</a></li>

            {/* Khó quá làm sau */}
            <li onClick = {() => {
              window.alert("Tính năng này đang cập nhật")
            }}><a>WatchParty</a></li>
            <li onClick = {() => {
              window.alert("Tính năng này đang cập nhật")
            }}><a>Log In <i className="fa-solid fa-key"></i></a></li>
            </ul>
        </nav>
      </div>

    </div>
  )
}

export default Header
