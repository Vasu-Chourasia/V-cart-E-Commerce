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
            className='fixed bottom-[24px] right-[24px] z-50 cursor-pointer group'
            style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}
            onClick={handleClick}
            title="Click to activate Voice AI Assistant"
        >
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0c2025]/95 border border-[#56dbfc]/50 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.6)] group-hover:border-[#56dbfc] group-hover:shadow-[0_0_30px_rgba(86,219,252,0.5)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center ${active ? 'ring-4 ring-[#56dbfc]/50 scale-105' : ''}`}>
                <img
                    src={ai}
                    alt="Voice assistant"
                    className={`w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`}
                />
            </div>
        </div>
    )
}

export default Ai



