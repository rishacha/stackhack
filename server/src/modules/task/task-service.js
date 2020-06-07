// Contains business logic for the code

import TaskModel from './task-model'
import uuid from 'node-uuid'
import { isTaskValid, isUpdateValid } from './task-validation'
// import e from 'express';

async function getAllTasks(userId) {
    try {
        if (userId) {
            let taskList = await TaskModel.find({ "userId": userId });
            return taskList.map(e=>delete e.userId)
        } else {
            throw new Error("User Id is not valid")
        }
    } catch (err) {
        throw new Error("Could not fetch all tasks - " + err.message)
    }
}

async function updateTaskById(updateDetails, taskId, userId) {
    try {
        if (!taskId) {
            throw new Error("Task Id is invalid")
        }

        if (!updateDetails) {
            throw new Error("Update details are invalid")
        }

        if (!userId) {
            throw new Error("User Id is invalid")
        }

        const updateValid = isUpdateValid(updateDetails)
        if (updateValid.error) {
            throw new Error(updateValid.error.details[0].message, 400)
        } else {
            await TaskModel.findOneAndUpdate({ "taskId": taskId, "userId": userId }, updateDetails, { upsert: false });
        }
    } catch (err) {
        throw new Error("Could not update task - " + err.message)
    }
}

async function deleteTaskById(taskId, userId) {
    try {
        if (!taskId) {
            throw new Error("Task Id is invalid")
        }
        if (!userId) {
            throw new Error("User Id is invalid")
        }

        await TaskModel.deleteOne({ "taskId": taskId, "userId": userId });
    } catch (err) {
        throw new Error("Could not delete task by Id - "+err.message)
    }
}

async function createTask(taskDetails, userId) {
    try {
        if (!userId) {
            throw new Error("User Id is invalid")
        }
        const uniqueTaskId = uuid.v1();

        let taskData = {
            ...taskDetails,
            "userId": userId,
            "taskId": uniqueTaskId,
            "creationDate":Date.now()
        }
        const taskValid = isTaskValid(taskData)
        if (taskValid.error) {
            throw new Error(taskValid.error.details[0].message, 400)
        } else {
            let taskInstance = new TaskModel(taskData)
            await taskInstance.save();
            return {"taskId":taskData.taskId,"message":"Task updated successfully"};
        }

    } catch (err) {
        throw new Error("Could not create task successfully - " + err.message)
    }
}

module.exports = {
    getAllTasks,
    updateTaskById,
    deleteTaskById,
    createTask
}