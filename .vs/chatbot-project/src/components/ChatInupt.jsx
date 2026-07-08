import { useState } from 'react'
import{ Chatbot } from 'supersimpledev'


export function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    function saveInputText(event) {
      setInputText(event.target.value);
    }
  
    async function  sendMessage() {
     if (isLoading || inputText ==''){
      return
     }
     setIsLoading(true)
  
      const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID()
        }
      ];
  
      setChatMessages(newChatMessages);
  
      const response =  await Chatbot.getResponseAsync(inputText);
      setChatMessages([
        ...newChatMessages,
        {
          //message: response,
          message:response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
  
      setInputText('');
      setIsLoading(false)
    }
  
    function handelKeyDown (event){
      debugger;
    if(event.key === 'Enter')
    sendMessage();
  
    if (event.key == 'Escape'){
      setInputText('')
    }
  }
    return (
  <div className="chat-input-container">
  <input
          placeholder="Send a message to Chatbot"
          size="30"
          onChange={saveInputText}
          value={inputText}
          onKeyDown = {handelKeyDown}
          className="chat-input"
        />
  
          <button
          onClick={sendMessage}
          className='send-button'
          
  >Send</button>
  </div>
    );
  }