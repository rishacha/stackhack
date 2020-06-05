// Contains business logic for the code

import TaskModel from 'task-model'
import uuid from 'node-uuid'
import {isTaskValid,isUpdateValid} from 'task-validation'

function getAllTasks(userId){
    try {
        if(userId){
            taskList = await TaskModel.find({"userId":userId});
            return taskList
        }else {
            throw new Error("User Id is not valid")
        }
    } catch(err){
        throw new Error("Could not fetch all tasks - "+err.message)
    }
}

function updateTaskById(updateDetails, taskId,userId){
    try {
        if(!taskId){
            throw new Error("Task Id is invalid")
        }

        if(!updateDetails || !isUpdateValid(updateDetails)){
            throw new Error("Update details are invalid")
        }

        if(!userId){
            throw new Error("User Id is invalid")
        }
        await TaskModel.findOneAndUpdate({"taskId":taskId,"userId":userId}, updateDetails, {upsert: true});
    } catch(err){
        throw new Error("Could not update task - "+err.message)
    }
}

function deleteTaskById(taskId,userId){
    try {
        if(!taskId){
            throw new Error("Task Id is invalid")
        }
        if(!userId){
            throw new Error("User Id is invalid")
        }
        
        await TaskModel.deleteOne({"taskId":taskId, "userId":userId});
    } catch(err){
        throw new Error("Could not delete task by Id")
    }
}

async function createTask(taskDetails,userId){
    try {
        if(!userId){
            throw new Error("User Id is invalid")
        }
        const uniqueTaskId = uuid.v1();
        
        taskData = {
            ...taskDetails,
            "userId":userId,
            "taskId":uniqueTaskId
        }
        
        if (isTaskValid(taskData)){
            let taskInstance = new TaskModel(taskData)
            await taskInstance.save();
        } else {
            throw new Error("Task Invalid !")
        }
        
    } catch(err){
        throw new Error("Could not create task successfully - "+err.message)
    }
}

module.exports={
    getAllTasks,
    updateTaskById,
    deleteTaskById,
    createTask
}