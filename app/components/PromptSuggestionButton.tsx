const PromptSuggestionButton = ({text,onClickFunc }) =>{
    return(
        <button className="prompt-suggestion-button" onClick={onClickFunc}>
                {text}
        </button>
    )
}

export default PromptSuggestionButton