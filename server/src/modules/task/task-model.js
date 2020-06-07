//Require Mongoose
var mongoose = require('mongoose');
const taskCollection = require('../../constants/MongoCollection').taskCollectionName;
//Define a schema
var Schema = mongoose.Schema;

//TODO: Variable labels
//TODO: Add subtask/task types

// Task Schema
var taskSchema = new Schema({
    taskId:{
        type:String,
        required:[true,"Task ID is required for every task"]
    },
    userId:{
        type:String,
        required:[true,"User ID is required for every task"]
    },
    taskStatus:{ 
        type: Number, 
        default: 0,
        required:[true,"No Task Status provided"],
        enum: [0,1,2]
    }, // 0 - New, 1 - In-Progress, 2 - Completed (int)
    dueDate:{
        type:Date, // timestamp
        required:false
    },
    creationDate:{
        type:Date,
        default:Date.now(),
        required:[true,"Task should have a creation date"]
    }, // timestamp
    taskDetails:{
        title:{
            type:String, 
            required:[true,"Task should have a title"]
        },
        labels:{
            type:[String], // array of tags
            required:false
        },
        desc:{
            type:String, 
            required:false
        },
    }
    
});
/*
taskSchema.statics={
    create : function(data, cb) {
        var hero = new this(data);
        hero.save(cb);
    },          
    get: function(query, cb) {
        this.find(query, cb);
    },     
    getByName: function(query, cb) {
        this.find(query, cb);
    },     
    update: function(query, updateData, cb) { 
        this.findOneAndUpdate(query, 
            {$set: updateData},{new: true}, cb);
    },     
    delete: function(query, cb) {    
        this.findOneAndDelete(query,cb);
    }
    
}
*/


module.exports = mongoose.model("Task",taskSchema,taskCollection)