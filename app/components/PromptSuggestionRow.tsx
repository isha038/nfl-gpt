import PromptSuggestionButton from "./PromptSuggestionButton"

const PromptSuggestionRow = ({onPromptClick})=>{
    const prompts= [
        "Which team won the NFL 2024?",
        "Who is the highest paid NFL player?",
        "When is the next Superbowl?",
        "Which NFL player has the most touchdowns?",

    ]
    return (
        <div className="prompt-suggestion-row">
            {prompts.map((prompt,index)=> <PromptSuggestionButton 
            key={`suggestion-${index}`}
            text={prompt}
            onClickFunc={()=> onPromptClick(prompt)}/>)}
        </div>
    )
    }
    
export default PromptSuggestionRow