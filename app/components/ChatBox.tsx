"use client";

import { useEffect, useState } from "react";
import testPrompts from "../data/prompts.json";
import testResponses from "../data/responses.json";
import Prompt from "./Prompt";
import Response from "./Response";

type Prompt = {
  id: number,
  input: string;
}

type Response = {
  id: number,
  output: string;
}

export default function ChatBox() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [responses, setResponses] = useState<Response[]>([])
  const [input, setInput] = useState<string>("")

  useEffect(() => {
    setPrompts(testPrompts);

    /* const fetchPrompts = async () => {
      try {
        const response = await fetch("../data/prompts.json")
        const prompts = await response.json()
        setPrompts(prompts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPrompts() */
  }, [])

  useEffect(() => {
    setResponses(testResponses);
    /* const fetchResponses = async () => {
      try {
        const response = await fetch("data/responses.json")
        const responses = await response.json()
        setResponses(responses)
      } catch (error) {
        console.error(error)
      }
    }

    fetchResponses() */
  }, [])

  const handleGenerate = async (e) => {
    e.preventDefault()
    addPrompt({ id: prompts.length + 1, input: input })
  }

  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }

  function addPrompt(prompt: Prompt) {
    setPrompts([...prompts, prompt])
  }

  return (
    <div className="grid grid-rows-[1fr, auto] p-4 h-full gap-4">
      <div className="flex flex-col gap-4 overflow-y-auto">
        {prompts.map(prompt => (
          <div key={prompt.id} className="flex flex-col h-full">
            <Prompt key={`prompt-${prompt.id}`} Prompt={prompt.input} />
            <Response key={`response-${prompt.id}`} Output={responses.find(response => response.id === prompt.id)?.output || ""} />
          </div>
        ))}
      </div>

      <form className="flex items-center justify-center gap-4 w-full">
        <input className="w-full bg-gray-100 rounded-full px-4 py-2 outline-none text-black" placeholder="Type your prompt here..." value={input} onChange={handleChangeInput} />
        <button style={{ backgroundColor: '#E93D44' }} className="rounded-full px-4 py-2 text-gray-100 font-medium" onClick={handleGenerate}>Generate</button>
      </form>
    </div>
  )
}
