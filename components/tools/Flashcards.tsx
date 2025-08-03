'use client'

import { useState, useEffect } from 'react'

const SingleCard = ({ question, answer, flipped, onFlip }) => {
  return (
    <div
      onClick={onFlip}
      aria-hidden="true"
      className={`relative flex h-48 w-80 transform cursor-pointer items-center justify-center rounded-xl p-6 text-center shadow-xl transition-transform duration-500 ${
        flipped ? 'rotate-y-180' : ''
      } perspective`}
    >
      {/* Front Side */}
      <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-xl bg-amber-100 p-6 text-gray-900 dark:bg-amber-100 dark:text-white">
        <h3 className="text-xl font-semibold">{question}</h3>
      </div>

      {/* Back Side */}
      <div
        className={`rotate-y-180 backface-hidden absolute inset-0 flex transform items-center justify-center rounded-xl bg-indigo-600 p-6 text-white ${
          flipped ? 'visible' : 'invisible'
        }`}
      >
        <p className="text-lg font-medium">{answer}</p>
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
      if (e.key === 'ArrowRight') handleNext()
      else if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleFlip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!flashcards || flashcards.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-300">No flashcards available.</p>
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
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Prev
        </button>
        <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
          {currentIndex + 1} / {flashcards.length}
        </span>
        <button
          onClick={handleNext}
          aria-label="Next flashcard"
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Flashcards
