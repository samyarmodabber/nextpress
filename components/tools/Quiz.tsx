'use client'

import { useEffect, useState } from 'react'

type Question = {
  question: string
  answers: string[]
  correctIndex: number
}

type QuestionWithShuffle = Question & {
  shuffledAnswers: string[]
  correctIndexShuffled: number
}

type Breakdown = {
  question: string
  selected: string
  correct: string
  isCorrect: boolean
}

type QuizCoreProps = {
  quizData: Question[]
  autoAdvance?: boolean
  timePerQuestion?: number // in seconds
}

function QuizCore({ quizData, autoAdvance = true, timePerQuestion = 10 }: QuizCoreProps) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [breakdown, setBreakdown] = useState<Breakdown[]>([])
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionWithShuffle[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(timePerQuestion)

  const shuffleQuiz = () => {
    const shuffled = quizData.map((q) => {
      const shuffledAnswers = [...q.answers]
      for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]]
      }
      const correctIndexShuffled = shuffledAnswers.indexOf(q.answers[q.correctIndex])
      return { ...q, shuffledAnswers, correctIndexShuffled }
    })
    setShuffledQuestions(shuffled)
  }

  const resetQuiz = () => {
    setCurrentIndex(0)
    setScore(0)
    setShowResult(false)
    setBreakdown([])
    setSelectedIndex(null)
    setTimeLeft(timePerQuestion)
    shuffleQuiz()
  }

  useEffect(() => {
    shuffleQuiz()
  }, [quizData])

  useEffect(() => {
    if (selectedIndex !== null || showResult || !quizStarted) return
    if (timeLeft === 0) {
      handleAnswer(-1) // treat as no answer
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, selectedIndex, showResult, quizStarted])

  useEffect(() => {
    setTimeLeft(timePerQuestion)
  }, [currentIndex])

  const handleAnswer = (idx: number) => {
    if (selectedIndex !== null) return

    const question = shuffledQuestions[currentIndex]
    const isCorrect = idx === question.correctIndexShuffled
    setSelectedIndex(idx)

    if (isCorrect) setScore((prev) => prev + 1)

    setBreakdown((prev) => [
      ...prev,
      {
        question: question.question,
        selected: idx >= 0 ? question.shuffledAnswers[idx] : 'No Answer',
        correct: question.answers[question.correctIndex],
        isCorrect,
      },
    ])

    if (autoAdvance) {
      setTimeout(() => goToNextQuestion(), 1000)
    }
  }

  const goToNextQuestion = () => {
    setSelectedIndex(null)
    setTimeLeft(timePerQuestion)
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!quizStarted || showResult) return

      if (!autoAdvance && selectedIndex === null && e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1
        if (index < shuffledQuestions[currentIndex]?.shuffledAnswers.length) {
          e.preventDefault()
          handleAnswer(index)
        }
      }

      if (!autoAdvance && selectedIndex !== null && e.code === 'Space') {
        e.preventDefault()
        goToNextQuestion()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [autoAdvance, selectedIndex, currentIndex, showResult, quizStarted, shuffledQuestions])

  // Show intro screen
  if (!quizStarted) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 rounded-lg bg-white p-6 text-center shadow dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold">Welcome to the Quiz</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          You’ll have {timePerQuestion} seconds per question.
        </p>
        <button
          onClick={() => setQuizStarted(true)}
          className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          Start Quiz
        </button>
      </div>
    )
  }

  if (!shuffledQuestions.length) return <div className="p-6 text-center">Loading...</div>

  if (showResult) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg bg-green-50 p-6 shadow dark:bg-green-900 dark:text-white">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">Quiz Completed!</h2>
        <p className="mt-2 text-lg">
          You answered {score} out of {breakdown.length} questions correctly.
        </p>
        <button
          onClick={() => {
            resetQuiz()
            setQuizStarted(false)
          }}
          className="mt-6 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          Restart Quiz
        </button>
        <ul className="mt-4 space-y-2">
          {breakdown.map((item, i) => (
            <li
              key={i}
              className={`rounded border p-4 ${
                item.isCorrect ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'
              }`}
            >
              <p className="font-semibold">
                {i + 1}. {item.question}
              </p>
              <p>
                Your answer: <strong>{item.selected}</strong>
              </p>
              {!item.isCorrect && (
                <p>
                  Correct answer: <strong>{item.correct}</strong>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const current = shuffledQuestions[currentIndex]

  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800 dark:text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Question {currentIndex + 1} of {shuffledQuestions.length}
        </h2>
        <div
          className={`rounded-full px-2 py-1 font-mono text-sm ${
            timeLeft <= 3
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
          }`}
        >
          {timeLeft}s
        </div>
      </div>

      <p className="text-lg">{current.question}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {current.shuffledAnswers.map((answer, idx) => {
          let bgColor = ''
          if (selectedIndex !== null) {
            if (idx === selectedIndex) {
              bgColor =
                idx === current.correctIndexShuffled
                  ? 'bg-green-200 dark:bg-green-700'
                  : 'bg-red-200 dark:bg-red-700'
            } else if (idx === current.correctIndexShuffled) {
              bgColor = 'bg-green-100 dark:bg-green-600'
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selectedIndex !== null}
              className={`relative w-full rounded border px-4 py-2 text-left transition ${
                selectedIndex !== null
                  ? 'cursor-not-allowed'
                  : 'hover:bg-blue-50 dark:hover:bg-blue-900'
              } ${bgColor} dark:border-gray-600`}
            >
              <span className="absolute right-2 top-2 font-mono text-xs text-gray-500 dark:text-gray-300">
                {idx + 1}
              </span>
              {answer}
            </button>
          )
        })}
      </div>

      {!autoAdvance && selectedIndex !== null && (
        <button
          onClick={goToNextQuestion}
          className="relative mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          <span className="absolute right-2 top-2 rounded bg-blue-800 px-1 font-mono text-xs text-white dark:bg-blue-900">
            ␣
          </span>
          Next Question →
        </button>
      )}
    </div>
  )
}

type QuizProps = {
  quizData: Question[]
  autoAdvance?: boolean
  timePerQuestion?: number
}

export default function Quiz({ quizData, autoAdvance = false, timePerQuestion = 10 }: QuizProps) {
  return (
    <QuizCore quizData={quizData} autoAdvance={autoAdvance} timePerQuestion={timePerQuestion} />
  )
}
