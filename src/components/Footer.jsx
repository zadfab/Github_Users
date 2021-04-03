import React from 'react'


const Footer = ()=>{

    const date = new Date().getFullYear()
return(
    <>
    <h6 style={{ backgroundColor:"gray",position: 'fixed',width:"100%",textAlign:'center',bottom:'0'}}> Copyright © 2020-{date} </h6>
    </>
)

}

export default Footer;