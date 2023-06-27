const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const StudentModel = require('./models/studentDataModel')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors())

app.use(cors({
    origin: "http://localhost:5001",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

const PORT = 5505

const uri = "mongodb://localhost:27017"

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, connectionParams).then(() => {
    console.log("connected to database")
}).catch((e) => {
    console.log("error while connecting to database", e);
})

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post("/studentData", bodyParser.json(), async (req, res) => {


    try {
        const studentData = new StudentModel({
            //getting data from frontend
            id:String,
            StudentId: req.body.StudentId,
            BatchName:req.body.BatchName,
            StudentName: req.body.StudentName,
            PhoneNumber:req.body.PhoneNumber,
            Section:req.body.Section,
            StudentEmailId:req.body.StudentEmailId,
           
        })


        // console.log(channel.event_description);
        console.log('data from front',req.body[0].StudentName);

        // console.log(event_name);

        const inserted = await StudentModel.insertMany(req.body)
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

//api to insert single student data
app.post("/oneStudentData", bodyParser.json(), async (req, res) => {


    try {
        const studentData = new StudentModel({
            //getting data from frontend
            StudentId: req.body.StudentId,
            BatchName:req.body.BatchName,
            StudentName: req.body.StudentName,
            PhoneNumber:req.body.PhoneNumber,
            Section:req.body.Section,
            StudentEmailId:req.body.StudentEmailId,
           
        })


        // console.log(channel.event_description);
        console.log('data from front',studentData.StudentName);

        // console.log(event_name);

        const inserted = await studentData.save();
        console.log(inserted)
        res.status(200).send({ "msg": "inserted to db" })
    } catch (e) {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    }

})

//api to fetch student data

app.get("/fetchStudentData", urlencodedParser, (req, res) => {
    StudentModel.find({}).then((data) => {
        res.status(200).send(data)
        console.log('data from database' , data);
    }).catch((e) => {
        console.log(e)
        res.status(500).send({ "msg": "error" })
    })

})

app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
})

