'use client'

import { useState, useEffect } from 'react'

const SingleCard = ({ question, answer, flipped, onFlip }) => {
  return (
    <div
      onClick={onFlip}
      aria-hidden="true"
      className={`relative flex h-48 w-80 transform cursor-pointer items-center justify-center rounded-lg p-6 text-center shadow-lg transition-transform ${
        flipped ? 'rotate-y-180' : ''
      }`}
    >
      <div className={`backface-hidden absolute inset-0 rounded-lg bg-white p-6`}>
        <h3 className="text-lg font-bold text-gray-800">{question}</h3>
      </div>
      <div
        className={`rotate-y-180 backface-hidden absolute inset-0 transform rounded-lg bg-blue-500 p-6 text-white ${
          flipped ? 'visible' : 'invisible'
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  )
}

const Flashcards = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const handlePrev = () => {
    setFlipped(false)
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setFlipped(false)
    setCurrentIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1))
  }

  const handleFlip = () => {
    setFlipped((prev) => !prev)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault() // prevents spacebar from scrolling
        handleFlip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!flashcards || flashcards.length === 0) {
    return <p className="text-center text-gray-600">No flashcards available.</p>
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <SingleCard
        question={flashcards[currentIndex].question}
        answer={flashcards[currentIndex].answer}
        flipped={flipped}
        onFlip={handleFlip}
      />
      <div className="flex w-full max-w-md items-center justify-around">
        <button
          onClick={handlePrev}
          aria-label="Previous flashcard"
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
        >
          Prev
        </button>
        <span className="text-lg font-medium">
          {currentIndex + 1} / {flashcards.length}
        </span>
        <button
          onClick={handleNext}
          aria-label="Next flashcard"
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Flashcards
