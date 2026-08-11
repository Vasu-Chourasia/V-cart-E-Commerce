import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { shopDataContext } from '../context/ShopContext'
import ai from '../assets/ai.png'
import openSound from '../assets/open.mp3'

function Ai() {
    const { showSearch, setShowSearch } = useContext(shopDataContext)
    const navigate = useNavigate()
    const [active, setActive] = useState(false)

    // text-to-speech feedback
    const speak = (message) => {
        const utterance = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }

    const handleClick = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            toast.error("Speech recognition not supported in this browser")
            return
        }

        const recognition = new SpeechRecognition()

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript.trim().toLowerCase()
            console.log("Voice command:", transcript)

            if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
                speak("Opening search")
                setShowSearch(true)
                navigate("/collection")
            } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
                speak("Closing search")
                setShowSearch(false)
            } else if (transcript.includes("collection") || transcript.includes("product")) {
                speak("Opening collections")
                navigate("/collection")
            } else if (transcript.includes("about")) {
                speak("Opening about page")
                navigate("/about")
                setShowSearch(false)
            } else if (transcript.includes("home")) {
                speak("Opening home page")
                navigate("/")
                setShowSearch(false)
            } else if (transcript.includes("cart")) {
                speak("Opening your cart")
                navigate("/cart")
                setShowSearch(false)
            } else if (transcript.includes("contact")) {
                speak("Opening contact page")
                navigate("/contact")
                setShowSearch(false)
            } else if (transcript.includes("order")) {
                speak("Opening your orders")
                navigate("/order")
                setShowSearch(false)
            } else {
                toast.error("Command not recognised, try again")
            }
        }

        recognition.onend = () => setActive(false)

        // play sound and start listening
        new Audio(openSound).play()
        setActive(true)
        recognition.start()
    }

    return (
        <div
            className='fixed bottom-6 right-6 z-50 cursor-pointer group'
            onClick={handleClick}
            title="Click to activate Voice AI Assistant"
        >
            <div className={`p-2.5 rounded-full bg-[#0c2025]/90 border border-[#56dbfc]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(86,219,252,0.25)] group-hover:border-[#56dbfc] group-hover:shadow-[0_0_30px_rgba(86,219,252,0.4)] group-hover:scale-110 transition-all duration-300 flex items-center justify-center ${active ? 'ring-4 ring-[#56dbfc]/50 scale-110' : ''}`}>
                <img
                    src={ai}
                    alt="Voice assistant"
                    className={`w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`}
                />
            </div>
        </div>
    )
}

export default Ai


