// Code 

const Joi = require('@hapi/joi');

const isTaskValid = (userDTO) => {

    const schema = {
        "taskId": Joi.string().required(), // "t1", // string or MongoId
        "userId":Joi.string().required(), // "u1", // string
        "taskStatus":Joi.number().required().min(0).max(2), //0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
        "dueDate": Joi.date().iso().greater(Joi.ref('creationDate')).greater(Date.now()),// Date.now(), // timestamp
        "creationDate":Joi.date().iso().required().greater(Date.now()),//Date.now(), // timestamp
        "taskDetails":Joi.object().keys({
            "title": Joi.string().required(),//"Sample T1 U1", // string
            "labels":Joi.array().items(Joi.string()), //["tag1","tag2","tag3"], // array of strings
            "desc":Joi.string() //"Sample description of the task", // string
        })
    }
    return Joi.validate(userDTO, schema);
}

const isUpdateValid = (userDTO) => {

    const schema = {
        // "taskId": Joi.string().required(), // "t1", // string or MongoId
        // "userId":Joi.string().required(), // "u1", // string
        "taskStatus":Joi.number().min(0).max(2), //0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
        "dueDate": Joi.date().iso().greater(Date.now()),// Date.now(), // timestamp
        //"creationDate":Joi.date().iso().required(),//Date.now(), // timestamp
        "taskDetails":Joi.object().keys({
            "title": Joi.string(),//"Sample T1 U1", // string
            "labels":Joi.array().items(Joi.string()), //["tag1","tag2","tag3"], // array of strings
            "desc":Joi.string() //"Sample description of the task", // string
        })
    }
    return Joi.validate(userDTO, schema);
}

module.exports = {
    isTaskValid,
    isUpdateValid
}