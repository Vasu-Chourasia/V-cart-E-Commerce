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
            className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] cursor-pointer'
            onClick={handleClick}
        >
            <img
                src={ai}
                alt="Voice assistant"
                className={`w-[80px] transition-transform duration-300 ${active ? 'scale-125' : 'scale-100'}`}
                style={{
                    filter: active
                        ? 'drop-shadow(0px 0px 30px #00d2fc)'
                        : 'drop-shadow(0px 0px 20px black)'
                }}
            />
        </div>
    )
}

export default Ai
