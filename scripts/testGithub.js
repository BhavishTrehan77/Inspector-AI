const {
    GetRepository,
    GetFileContent,
    GetMultipleFiles
} = require("../services/github.services")

const {
    isValidFile,
    IngestRepository
} = require("../services/ingestion.services")


const runTest = async () => {

    const owner = "aelassas"
    const repo = "bookcars"

    console.log("1. Testing repository...")

    const repository = await GetRepository(owner, repo)

    console.log(repository)


    console.log("\n2. Testing single file...")

    const file = await GetFileContent(
        owner,
        repo,
        "README.md"
    )

    console.log({
        path: file.path,
        sha: file.sha,
        preview: file.content.slice(0, 100)
    })


    console.log("\n3. Testing file validation...")

    console.log(
        "auth.js:",
        isValidFile("src/controllers/auth.js")
    )

    console.log(
        "image.png:",
        isValidFile("public/image.png")
    )

    console.log(
        "node_modules/test.js:",
        isValidFile("node_modules/test.js")
    )


    console.log("\n4. Testing multiple files...")

    const files = [
        "README.md",
        "package.json"
    ]

    const multipleFiles = await GetMultipleFiles(
        owner,
        repo,
        files
    )

    console.log(
        multipleFiles.map(file => ({
            path: file.path,
            sha: file.sha
        }))
    )


    console.log("\n5. Testing repository ingestion...")

    const ingestion = await IngestRepository(
        owner,
        repo,
        files
    )

    console.log(
        ingestion.map(file => ({
            path: file.path,
            sha: file.sha,
            contentLength: file.content.length
        }))
    )
}


runTest().catch(error => {
    console.error("TEST FAILED:", error.message)
})