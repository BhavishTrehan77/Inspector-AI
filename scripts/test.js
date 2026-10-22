require("dotenv").config()

const connectdb = require("../config/mongo")
const { RagAnswer } = require("../services/rag.services")

const run = async () => {
    try {
        await connectdb()

        const userId = "6ad88a846bed0e88efd13b65"
        const projectId = "6ad88b111384855d5fca1a5c"

        const result = await RagAnswer(
            userId,
            projectId,
            "Where is authentication handled in this project?"
        )

        console.log("\nANSWER:\n")
        console.log(result.answer)

        console.log("\nSOURCES:\n")
        console.log(result.sources)

    } catch (error) {
        console.error("RAG test failed:", error)
    }
}

run()