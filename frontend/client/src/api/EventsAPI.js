import {useState, useEffect} from 'react'
import axios from 'axios'

//events API
function EventsAPI() {
    const [events, setEvents] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getEvents = async () => {
            const res = await axios.get(`/api/events?limit=${page*9}&${sort}&title[regex]=${search}`)
            setEvents(res.data.events)
            setResult(res.data.result)
        }
        getEvents()
    },[callback,  sort, search, page])
    
    return {
        events: [events, setEvents],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default EventsAPI
