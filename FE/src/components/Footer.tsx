import React from 'react'

const Footer = () => {
  return (
    <div style={divStyle}>
        <p>Powered by <a style={{color: 'white'}} href = 'https://ophim17.cc/' target='_blank'>OPhim1.com</a></p>
        <a style={{color: 'white'}} target='_blank' href='https://portfoliouuu.vercel.app'>_Jezz</a>
    </div>
  )
}

const divStyle: React.CSSProperties = {
    height: '10vh',
    backgroundColor: 'black',
    color: 'white',
    marginTop: '2%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
}

export default Footer
