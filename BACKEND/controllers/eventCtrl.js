const Events = require('../Models/eventModel')

// Filter, sorting and paginating
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

  
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const eventCtrl = {

    
    getEvents: async(req, res) =>{
        try {
            const features = new APIfeatures(Events.find(), req.query)
            .filtering().sorting().paginating()

            const events = await features.query

            res.json({
                status: 'success',
                result: events.length,
                events: events
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

   
    createEvent: async(req, res) =>{
        try {
            const {event_id, title, description, location,date} = req.body;
           

            const event = await Events.findOne({event_id})
            if(event)
                return res.status(400).json({msg: "This event already exists."})

            const newEvent = new Events({
                event_id, title: title.toLowerCase(), description, location, date,
            })

            await newEvent.save()
            res.json({msg: "Created a event"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //delete events
    deleteEvent: async(req, res) =>{
        try {
            await Events.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Event"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //update events
    updateEvent: async(req, res) =>{
        try {
            const {title, description, location, date} = req.body;
            

            await Events.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), description, location,  date
            })

            res.json({msg: "Updated an Event"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = eventCtrl