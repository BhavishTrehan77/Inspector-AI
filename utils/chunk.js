const chunkTextByWords=(text,textSize=500,overlap=50)=>{
    const words=text.trim().split(/\s+/)
    const res=[]
    for(let i=0;i<words.length;i+=textSize-overlap){
        const ans=words.slice(i,i+textSize).join(" ")
        res.push(ans)
    }
    return res
}

const ChunkFiles=(files,projectId)=>{
    const allChunks=[]
    for(const file of files){
        const chunks=chunkTextByWords(file.content,500,50)
        chunks.forEach((chunk,index)=>{
            allChunks.push({
                projectId,
                filePath:file.path,
                sha:file.sha,
                chunkIndex:index,
                content:chunk
            })
        })
    }
    return allChunks
}

module.exports={
    chunkTextByWords,
    ChunkFiles
}