const  mongoose =require('mongoose');


var vehicleSchema = new mongoose.Schema({

    name: {
        type: String,
        
       
    },
    
    desc:{
        type:String
        
    },
    img:{
        type: String
        
    }
});

const Veh= mongoose.model('vehicle', vehicleSchema);


module.exports=Veh