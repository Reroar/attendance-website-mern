const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    StudentId: {
        type: Number,
        id: String,
        required : true,
        unique   :true,
        ref : "courses"

    },
    BatchName: {
        type: Number
    },
    StudentName:{
        type: String
    },
    PhoneNumber:{
        type: Number
    },
    StudentEmailId:{
        type: String
    },
    Section:{
        type: String
    }
})

const StudentModel = new mongoose.model("studentData" , studentSchema)

module.exports = StudentModel