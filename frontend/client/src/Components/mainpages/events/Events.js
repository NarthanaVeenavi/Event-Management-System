import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import BtnRender from '../utils/eventItem/BtnRender'

//events - handling delete all and select all
function Events() {
    const state = useContext(GlobalState)
    const [events, setEvents] = state.eventsAPI.events
    const [token] = state.token
    const [callback, setCallback] = state.eventsAPI.callback

    const deleteEvent = async (id, public_id) => {
        try {


            const deleteEvent = axios.delete(`/api/events/${id}`, {
                headers: { Authorization: token }
            })

            await deleteEvent
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (

        <div className="">
            <table id="table1">
                <thead>
                    <tr>
                        <th style={{ 'textAlign': 'center' }}>Name</th>
                        <th style={{ 'textAlign': 'center' }}>Description</th>
                        <th style={{ 'textAlign': 'center' }}>Location</th>
                        <th style={{ 'textAlign': 'center' }}>Registered Date</th>
                        <th style={{ 'textAlign': 'center' }}>Actions</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        events.map(event => {
                            return <tr>

                                <td>{event.title}</td>
                                <td>{event.description}</td>
                                <td>{event.location}</td>
                                <td>{event.date}</td>

                                <td style={{ 'textAlign': 'center' }}>
                                    <BtnRender event={event} deleteEvent={deleteEvent} />
                                </td>

                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>

    )
}

export default Events
