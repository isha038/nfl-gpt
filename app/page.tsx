"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import logo from "./assets/football.png"
import { useChat } from  "ai/react"

import {Message} from "ai"
import Bubble from "./components/Bubble"
import LoadingBubble from "./components/LoadingBubble"
import PromptSuggestionRow from "./components/PromptSuggestionRow"

const Home = () =>{
 
    
    const {append, isLoading, messages, input, handleInputChange, handleSubmit} = useChat()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null 
    const noMessages = !messages || messages.length === 0

    const handlePrompt = (promptText) =>{
        const msg: Message = {
            id:`${Date.now()}`,
            content:promptText,
            role:"user"
        }
        append(msg)
    }
    return (
        
        <main>
            {/* Container for logo and text */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Image src={logo} width={50} alt="NFLGPT logo" />

                {/* Text with different colors */}
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                    <span style={{ color: "#D71920" }}>NFL</span>
                    <span style={{ color: "#1E90FF" }}>GPT</span>
                </h1>
            </div> 
            <section className = {noMessages?"": "populated"}>
                {noMessages?(
                    <>
                        <p className="starter-text">
                            The Ultimate Place for NFL super fans!
                            Ask NFLGPT anything and it will comeback with the most up-to-date answers.
                            We hope you enjoy!
                        </p>
                        <br/>
                        <PromptSuggestionRow onPromptClick={handlePrompt}/>
                    </>
                ):(
                    <>
                        {messages.map((message, index)=><Bubble key={`message-${index}`} message={message}/>)}
                        {isLoading && <LoadingBubble/>}
                        
                    </>

                )}
                
            </section>
            <form onSubmit={handleSubmit}>
                    <input className="question-box" onChange={handleInputChange} value={input} placeholder="Ask me Something.." />
                    <input type="submit" />

            </form>

        </main>
    )
}
export default Home


