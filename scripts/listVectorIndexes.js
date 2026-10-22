require("dotenv").config()

const connectdb = require("../config/mongo")
const { ListVectorIndexes } = require("../services/vector.services")

const run = async () => {
    try {
        await connectdb()

        const indexes = await ListVectorIndexes()

        console.log(JSON.stringify(indexes, null, 2))
    } catch (error) {
        console.error(error)
    }
}

run()