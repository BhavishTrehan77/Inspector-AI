const GetRepository=async(owner,repo)=>{
    const response=await fetch(
           `https://api.github.com/repos/${owner}/${repo}`,
           {
            headers:{
                 Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2026-03-10"
            }
           }
    )
    if(!response.ok){
        if(response.status===404){
            throw new Error("repository not found")
        }
        if(response.status==403){
            throw new Error("Github api rate limit or access denied")
        }
        throw new Error("github api error")
    }
    const data=await response.json()
    return{
        id: data.id,
        name: data.name,
        fullName: data.full_name,
        owner: data.owner.login,
        description: data.description,
        private: data.private,
        defaultBranch: data.default_branch,
        htmlUrl: data.html_url
    }
}

const GetFileContent=async(owner,repo,path)=>{
    const response=await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,

        {
            headers:{
                Accept:"application/vnd.github+json",
                "X-GitHub-Api-Version": "2026-03-10"
            }
        }
    )
    if(!response.ok){
        throw new Error(`GitHub API error: ${response.status}`)

    }
    const data=await response.json()
    if(data.type!="file"){
         throw new Error("Requested path is not a file")
    }
    const content=Buffer.from(data.content,"base64").toString("utf-8")
    // this content=Buffer is the step were we are reading the data from the that github file

    return{
        path:data.path,
        content,
        sha:data.sha // this sha is basically for the updation suppose we updat anything in  the existing file so we have to etch that changes here also
    }


}
const GetMultipleFiles=async(owner,repo,files)=>{
    const results=[]
    for(const path of files){
        try{
            const file=await GetFileContent(owner,repo,path)
            results.push(file)
        }catch(err){
             console.log(`Failed to fetch file: ${path}`)
            console.log(err.message)
        }
    }
    return results
}



module.exports={
    GetRepository,
    GetFileContent,
    GetMultipleFiles
}