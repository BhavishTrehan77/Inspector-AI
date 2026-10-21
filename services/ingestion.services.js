const { GetMultipleFiles } = require("./github.services")

const allowedExtensions=[
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".go",
    ".cpp",
    ".c",
    ".html",
    ".css",
    ".json",
    ".md"
]

const ignorePaths=[
    "node_modules/",
    ".git/",
    "dist/",
    "build/",
    "coverage/"
]

const isValidFile=(path)=>{
    const ignored=ignorePaths.some((item)=>path.includes(item))
    if(ignored){
        return false
    }
    return allowedExtensions.some((extension)=>path.endsWith(extension))
}

const IngestRepository=async(owner,repo,files)=>{
    const validFiles=files.filter((file)=>isValidFile(file))
    if (validFiles.length === 0) {
        throw new Error("No valid files found")
    }
    const fileContents=await GetMultipleFiles(owner,repo,validFiles)
    return fileContents
}
module.exports={
    isValidFile,
    IngestRepository
}