const express= require('express');
const mongoose =require('mongoose');

const Veh =require('./models/Vehicle');
const multer = require('multer')
const bodyParser = require('body-parser');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    }
  });
  

const app= express();

// app.use(bodyParser());


const PORT=4300;

mongoose.connect('mongodb+srv://rajeev255:rajeev123@cluster0-uyau0.mongodb.net/EmployeeDb?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
mongoose.connection.on('connected',()=> console.log('mongo connected'))

app.get("/",(req,res)=>{

    
Veh.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });


})

app.post('/send',upload.single('img'),(req,res)=>{


    console.log(req.file.path)

    var ds=new Veh({
    
        name: req.body.name,
        desc: req.body.desc,
        img: req.file.path

    });

    
    ds.save();

    res.send("recived")
})

app.listen(PORT,()=> console.log(`working on ${PORT}`));
