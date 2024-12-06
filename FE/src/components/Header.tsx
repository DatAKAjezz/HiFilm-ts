import { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'
import '../styles/Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`)
  }

  const handleDrop = () => {
    setIsDropped(prev => !prev);
  }

  const closeMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).closest(".menu-container")) {
      setIsDropped(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

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
          <i onClick={handleSearch} className="fa fa-search" aria-hidden="true" id = 'search-icon'></i>        
        </form>
      </div>

      <div className = 'menu-container'>
        <nav className = 'menu'>
          <ul>
            <li onClick = {() => {navigate('/')}}><a>Trang chủ  </a></li>
            <li className = "movie-types" onClick={handleDrop}>
              <a>Thể loại 
                {" "}<i className="fa-solid fa-caret-down" 
                        style={{transform: isDropped ? "rotateX(180deg)" : "rotateX(0)"}}>  
                      </i>
              </a>
              <nav style={{height: isDropped ? '120px' : '0'}}>
                <ul>
                  <li>Hành Động</li>
                  <li>Kinh dị</li>
                  <li>Phiêu lưu</li>
                  <li>Hoạt hình</li>
                  <li>Tình cảm</li>
                  <li>Hài hước</li>
                  <li>Lịch sử</li>
                  <li>Khoa Học</li>
                  <li>Viễn tưởng</li>
                </ul>
              </nav>
            </li>
            <li>
              <a>Xem nhiều nhất</a>
            </li>

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
