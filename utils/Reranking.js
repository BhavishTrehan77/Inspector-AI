const ai = require("../config/ai")

const Reranking=async(query,ans)=>{
    if(!ans||ans.length==0){
        return []
    }
    const contents=ans.map((res,index)=>{
        return{
            id:index,
            filePath:res.filePath,
            chunkIndex:res.chunkIndex,
            content:res.content
        }
    })
    const response=await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:`You are an ai reRanker act like a ai manager and do check the reuslt with there score the answer should be returned in the order fo there score re rank them on the basis of how correct they are oru query is ${query} and ans is ${JSON.stringify(contents,null,2)} see both compare find result
        Give each candidate a relevance score form 0 to 1 
        1.0 is highly relevamt
        and 0.0 is completely irrelevant

        Return Only json format

        {
  "results": [
    {
      "id": 0,
      "score": 0.95
    },
    {
      "id": 1,
      "score": 0.42
    }
  ]
}
        }
        
        `
    
    })
        const text=response.text.replace(/```json/,"").replace(/```/g,"").trim()
        return text
}
module.exports={
    Reranking
}