import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
import './btns.css'

//logic for buttons
function BtnRender({event, deleteEvent}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    return (

        <div className="row_btn">
            {
                isAdmin ? 
                <>

                {/* Link for Edit Button */}    
                    <Link id="btn_edit" to={`/edit_event/${event._id}`}>
                        Edit
                    </Link>
                    
                {/* Link for Delete Button */}
                    <Link id="btn_delete" to="#!" 
                    onClick={() =>deleteEvent(event._id)}>
                        Delete
                    </Link>
                    
                

               
                </>
                : <>

                
                </>
            }
                
        </div>
    )
}

export default BtnRender
