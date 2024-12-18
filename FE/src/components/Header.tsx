import { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'
import '../styles/Header.css'
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';

const Header = () => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const navigate = useNavigate();

  const {allMovies} = useMovies();

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
      <div className = 'logo-container' onClick={() => {navigate('/')}}>
        <img src = {logo} id = "header-logo" />
        <h2>CinaMọt</h2>
      </div>  

      <div className = 'search-container'>
        <form onSubmit={handleSearch}>
          <input 
              type='text' 
              placeholder={`  Tìm kiếm....  [${allMovies.length} phim]`}
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
            <li onClick = {() => {navigate('/')}}><a>Trang chủ</a></li>
            <li className = "movie-types" onClick={handleDrop}>
              <a>Thể loại 
                {" "}<i className="fa-solid fa-caret-down" 
                        style={{transform: isDropped ? "rotateX(180deg)" : "rotateX(0)"}}>  
                      </i>
              </a>
              <div style={{height: isDropped ? '120px' : '0'}}>
                  <p onClick={() => {}}>Hành Động</p>
                  <p>Kinh dị</p>
                  <p>Phiêu lưu</p>
                  <p>Hoạt hình</p>
                  <p>Tình cảm</p>
                  <p>Hài hước</p>
                  <p>Lịch sử</p>
                  <p>Khoa Học</p>
                  <p>Viễn tưởng</p>
              </div>
            </li>
            <li onClick={() => {navigate('/search?q=&sort=Lượt+xem&type=&genre=&country=&year=&isNavigated=')}}>
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
