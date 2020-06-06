module.exports={
    "taskList":[
        {  
            "taskId":"t1", // string or MongoId
            "userId":"u1", // string
            "taskStatus":0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
            // "dueDate":Date.now(), // timestamp
            "creationDate":Date.now(), // timestamp
            "taskDetails":{
                "title":"Sample T1 U1", // string
                "labels":["tag1","tag2","tag3"], // array of strings
                "desc":"Sample description of the task", // string
            }
        },
        {  
            "taskId":"t2", // string or MongoId
            "userId":"u1", // string
            "taskStatus":0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
            // "dueDate":Date.now(), // timestamp
            "creationDate":Date.now(), // timestamp
            "taskDetails":{
                "title":"Sample T2 U1", // string
                "labels":["tag1","tag2","tag3"], // array of strings
                "desc":"Sample description of the task", // string
            }
        },
        {  
            "taskId":"t3", // string or MongoId
            "userId":"u2", // string
            "taskStatus":0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
            // "dueDate":Date.now(), // timestamp
            "creationDate":Date.now(), // timestamp
            "taskDetails":{
                "title":"Sample T1 U2", // string
                "labels":["tag1","tag2","tag3"], // array of strings
                "desc":"Sample description of the task", // string
            }
        },
        {  
            "taskId":"t4", // string or MongoId
            "userId":"u2", // string
            "taskStatus":0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
            // "dueDate":Date.now(), // timestamp
            "creationDate":Date.now(), // timestamp
            "taskDetails":{
                "title":"Sample T2 U2", // string
                "labels":["tag1","tag2","tag3"], // array of strings
                "desc":"Sample description of the task", // string
            }
        }
    ]
}