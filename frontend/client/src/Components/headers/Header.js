import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

//header component
function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/login";
    }

    //handling admin routers
    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_event" >Add Event</Link></li>
                
                
            </>
        )
    }

    //loggout router
    const loggedRouter = () =>{
        return(
            <>
                <button id="logout"><li><Link to="/event" onClick={logoutUser} >Logout</Link></li></button>
            </>
        )
    }
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                <a href={isLogged ? "/event" : "/"}>{isAdmin ? <h6>Event Management System</h6> : <h6><span>Event Management System</span></h6> }</a>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/event" className="links">{isAdmin ? 'Events' : 'Events'}</Link></li>


               


                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login | Register</Link></li>
                }
            </ul>
        </header>
    )
}

export default Header
