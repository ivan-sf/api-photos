import {connect} from 'mongoose'
export async function startConnection(){
    await connect('mongodb://localhost/photo-gallery-db',{
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology: true
    })
    console.log('database connect')
}

