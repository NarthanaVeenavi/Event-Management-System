import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    event_id: '',
    title: '',
    description: '',
    location: '',
    date: '',
    _id: ''
}

function CreateEvent() {
    const state = useContext(GlobalState)
    const [event, setEvent] = useState(initialState)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [events] = state.eventsAPI.events
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.eventsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            events.forEach(event => {
                if(event._id === param.id) {
                    setEvent(event)
                   
                }
            })
        }else{
            setOnEdit(false)
            setEvent(initialState)
            
        }
    }, [param.id, events])


    const handleChangeInput = e =>{
        const {name, value} = e.target
        setEvent({...event, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            
            if(onEdit){
                await axios.put(`/api/events/${event._id}`, {...event}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/events', {...event}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/event")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

   
    return (
        <div className="create_event">
            

            <form onSubmit={handleSubmit} id="createeventform">

                
                
                <div className="row">
                    <label htmlFor="event_id">Event ID</label>
                    <input type="text" name="event_id" id="event_id" required
                    value={event.event_id} onChange={handleChangeInput} disabled={onEdit} placeholder="Event ID"/>
                </div>

              
                <div className="row">
                    <label htmlFor="title">Name</label>
                    <input type="text" name="title" id="title" required
                    value={event.title} onChange={handleChangeInput} placeholder="Name"/>
                </div>

               
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={event.description} rows="5" onChange={handleChangeInput} style={{borderColor: "rgb(212, 212, 219)"}} />
                </div>

               

                <div className="row">
                    <label htmlFor="location">Location </label>
                    <select  name="location" id="eventdwn" required  required value={event.location} onChange={handleChangeInput} >
                    <option>Select Location</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                    
                </div>
                
                <div className="row">
                    <label htmlFor="date">Date </label>
                    <input type="date" name="date" id="date" required
                    value={event.date} onChange={handleChangeInput} placeholder="date"/>
                </div>


                {/* buttons */}
                <button type="submit" id="btncreate">{onEdit? "Update Event" : "Create Event"}</button>
               
                
            </form>
        </div>
    )
}

export default CreateEvent
