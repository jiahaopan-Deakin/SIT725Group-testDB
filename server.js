const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var url = "mongodb+srv://SIT715:admin@sit715collectionlist.ku11fnz.mongodb.net/GetDoc?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser:true}, (err) =>{
  if (err){
    throw err;
  }
  else{
    console.log("Connect successfully");
  }
})

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const DoctorClassSchema = new mongoose.Schema({
  _email: {type: String},
  _name: {type: String},
  _password: {type: String},

  _comments: {type: Array},
  _experience: {type: Array, 
      _HospitalName: {type: String},
      _Duration: {type: String}
  },
  _education: {type: Array,
      _UniName: {type: String},
      _Degree: {type: String}
    },
  _AvailableTime: {type: Array,
      _date: {type: Date},
      _from: {type: String},
      _to: {type: String},
      _Status: {type: Boolean}}

},{collection:'DoctorClass'})

const Doctor = mongoose.model('Doctor', DoctorClassSchema)

const doctor = new Doctor({
  _email: "123@gmail.com",
  _name: "Li Lei",
  _password: "123456",
  _comments: ["Nice doctor", "Pretty nice experience"],
  _experience: [{_HospitalName: "RenMin", _Duration: "5 years"},
               {_HospitalName: "No2", _Duration: "7 years"}],
  _education: [{_UniName: "Deakin", _Degree: "PHD"},
               {_UniName: "Monash", _Degree: "PHD"}],
  _AvailableTime: [{_date: "15/09/2022", _from:"9am", _to:"9.30am", _Status: false}]
})
doctor.save();
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log('App running at http://localhost:' + port);
});
