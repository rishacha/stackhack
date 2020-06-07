const fs = require('fs')
const util = require('util')
const readDir = util.promisify(fs.readdir)
const path = require('path')
const mongoose = require('mongoose')
const modelMap = require('../../constants/MongoCollection')

function toTitleCase (str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

// Load seeds of all models
async function seedDatabase (runSaveMiddleware = false) {
  const dir = await readDir(__dirname)
  const seedFiles = dir.filter(f => f.endsWith('.seed.js'))
//   console.log(modelMap)
  
  for (const file of seedFiles) {
    const fileName = file.split('.seed.js')[0]
    const modelKey = fileName+'CollectionName'
    // console.log(modelKey)
    const model = mongoose.models[modelMap[modelKey]]

    // console.log(mongoose.models)

    if (!model) throw new Error(`Cannot find Model '${modelMap[modelKey]}'`)
    const fileContents = require(path.join(__dirname, file))

    // console.log("Seeding contents : "+path.join(__dirname, file)+JSON.stringify(fileContents))

    runSaveMiddleware
      ? await model.create(fileContents)
      : await model.insertMany(fileContents)
    
    // console.log("Seeding complete")
  }
}

exports.seedDatabase = seedDatabase