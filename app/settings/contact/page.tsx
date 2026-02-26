"use client"


import { useEffect, useState } from "react"

export default function GenAIFetch(){
  const [output, setoutput] = useState("Sample")

  useEffect(()=>{
    async function FetchAi(params: string) {
      const res = await fetch("api/ai/starting_bid",{
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify({params})
      })

      const data = await res.json()
      if(!data){
        console.log("FAiled gen ai");
        
      }
      setoutput(data.output)
    }
    FetchAi("Say about google")
  }, [])

return(
        <div>
          <h2>Genrative AI Content</h2>
          
          <p>{output}</p>
        </div>


)
}