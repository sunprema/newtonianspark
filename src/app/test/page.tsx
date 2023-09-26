'use client'


import { Button } from "@/components/ui/button"
import { useState } from "react"

const Page = () => {

    
    const [startTime, setStartTime] = useState<string>()
    const [data, setData] = useState<string>()
    const [endTime, setEndTime] = useState<string>()

    const handleStreamingResponse = async() => {
        
        const response = await fetch('/api/streaming',{
            'method':'POST',
            'body' : JSON.stringify({'name':'sundar'}),
            'headers' :{
                'Content-Type' : 'application/json'
            }

        })
        const stream = response.body
        let chunkSize = 0
        const chunks:string[] = []

        function processStreamingData(stream:ReadableStream<Uint8Array>){
            const reader = stream.getReader()
            
            function processData({done, value}:{ done: boolean, value?: Uint8Array }){
                if(done){
                    console.log("Stream completed , current chunk size", chunkSize)
                    console.log(chunks)
                    if(chunks){
                        const completeResponse = chunks.join("")
                        console.log(`COMPLETED_RESPONSE : ${completeResponse}`)
                        const _startTime = completeResponse.substring( completeResponse.indexOf("<startTime>"), completeResponse.indexOf("</startTime>"))
                        const _data = completeResponse.substring( completeResponse.indexOf("<data>"), completeResponse.indexOf("</data>"))
                        const _endTime = completeResponse.substring( completeResponse.indexOf("<endTime>"), completeResponse.indexOf("</endTime>"))

                        setStartTime(_startTime)
                        setEndTime(_endTime)
                        setData(_data)
                    }
                    return;                     
                }
                const text = new TextDecoder().decode(value)
                console.log('Received chunk' , text)
                chunks.push(text)
                chunkSize++;
                console.log("current chunk size : ", chunkSize)
                reader.read().then(processData)
            }

            reader.read().then(processData)
            console.log( chunks) 
            

        }

        if(stream != null){
            processStreamingData(stream)
        }
        
        
        
    }

    return <div className="container mx-auto mt-32">
        <Button onClick={ handleStreamingResponse}> Get Streaming Response </Button>
        <h4> Hello: {startTime} </h4>
        <h6>{endTime}</h6>
        <code>
            {data}
        </code>
    </div>

}

export default Page