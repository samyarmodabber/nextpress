'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

type QuestionBase = {
  question: string
  type: 'multiple' | 'blank'
}

type MultipleChoiceQuestion = QuestionBase & {
  type: 'multiple'
  answers: string[]
  correctIndex: number
}

type FillInTheBlankQuestion = QuestionBase & {
  type: 'blank'
  blankAnswer: string
}

type Question = MultipleChoiceQuestion | FillInTheBlankQuestion

type QuestionWithShuffle =
  | (MultipleChoiceQuestion & {
      shuffledAnswers: string[]
      correctIndexShuffled: number
    })
  | FillInTheBlankQuestion

type Breakdown = {
  question: string
  selected: string
  correct: string
  isCorrect: boolean
}

type QuizProps = {
  quizData: Question[]
  autoAdvance?: boolean
  timePerQuestion?: number
}

function MarkdownInline({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ children }) => <>{children}</>,
        img: ({ src, alt }) => (
          <img src={src || ''} alt={alt || ''} className="mx-auto max-h-40 rounded-md" />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

export default function Quiz({ quizData, autoAdvance = false, timePerQuestion = 10 }: QuizProps) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const [breakdown, setBreakdown] = useState<Breakdown[]>([])
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionWithShuffle[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [textInput, setTextInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(timePerQuestion)

  const current = shuffledQuestions[currentIndex]

  const shuffleArray = (arr: string[]) => {
    const result = [...arr]
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }

  const shuffleQuiz = () => {
    const shuffled = quizData.map((q) => {
      if (q.type === 'multiple') {
        const shuffledAnswers = shuffleArray(q.answers)
        return {
          ...q,
          shuffledAnswers,
          correctIndexShuffled: shuffledAnswers.indexOf(q.answers[q.correctIndex]),
        }
      }
      return q
    })
    setShuffledQuestions(shuffled as QuestionWithShuffle[])
  }

  const resetQuiz = () => {
    setCurrentIndex(0)
    setScore(0)
    setShowResult(false)
    setBreakdown([])
    setSelectedIndex(null)
    setTextInput('')
    setTimeLeft(timePerQuestion)
    shuffleQuiz()
  }

  useEffect(() => {
    shuffleQuiz()
  }, [quizData])

  useEffect(() => {
    if (!quizStarted || selectedIndex !== null || showResult) return
    if (timeLeft === 0) {
      if (current.type === 'blank') handleBlankAnswer()
      else handleAnswer(-1)
      return
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, selectedIndex, showResult, quizStarted])

  useEffect(() => {
    setTimeLeft(timePerQuestion)
    setTextInput('')
  }, [currentIndex])

  const handleAnswer = (idx: number) => {
    if (selectedIndex !== null || current.type !== 'multiple') return

    const isCorrect = idx === current.correctIndexShuffled
    setSelectedIndex(idx)

    if (isCorrect) setScore((prev) => prev + 1)

    setBreakdown((prev) => [
      ...prev,
      {
        question: current.question,
        selected: idx >= 0 ? current.shuffledAnswers[idx] : 'No Answer',
        correct: current.answers[current.correctIndex],
        isCorrect,
      },
    ])

    if (autoAdvance) {
      setTimeout(goToNextQuestion, 1000)
    }
  }

  const handleBlankAnswer = () => {
    if (selectedIndex !== null || current.type !== 'blank') return

    const userAnswer = textInput.trim().toLowerCase()
    const correctAnswer = current.blankAnswer.trim().toLowerCase()
    const isCorrect = userAnswer === correctAnswer

    setSelectedIndex(0)

    if (isCorrect) setScore((prev) => prev + 1)

    setBreakdown((prev) => [
      ...prev,
      {
        question: current.question,
        selected: textInput || 'No Answer',
        correct: current.blankAnswer,
        isCorrect,
      },
    ])

    if (autoAdvance) {
      setTimeout(() => {
        setTextInput('')
        goToNextQuestion()
      }, 1000)
    }
  }

  const goToNextQuestion = () => {
    setSelectedIndex(null)
    setTextInput('')
    setTimeLeft(timePerQuestion)
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!quizStarted || showResult || !current) return

      if (current.type === 'multiple') {
        if (!autoAdvance && selectedIndex === null && e.key >= '1' && e.key <= '4') {
          const index = parseInt(e.key) - 1
          if (index < current.shuffledAnswers.length) {
            e.preventDefault()
            handleAnswer(index)
          }
        }

        if (!autoAdvance && selectedIndex !== null && e.code === 'Space') {
          e.preventDefault()
          goToNextQuestion()
        }
      }

      if (current.type === 'blank') {
        if (e.key === 'Enter' && textInput && selectedIndex === null) {
          e.preventDefault()
          handleBlankAnswer()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    autoAdvance,
    selectedIndex,
    currentIndex,
    showResult,
    quizStarted,
    shuffledQuestions,
    textInput,
  ])

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
                {i + 1}. <MarkdownInline>{item.question}</MarkdownInline>
              </p>
              <p>
                Your answer:{' '}
                <strong>
                  <MarkdownInline>{item.selected}</MarkdownInline>
                </strong>
              </p>
              {!item.isCorrect && (
                <p>
                  Correct answer:{' '}
                  <strong>
                    <MarkdownInline>{item.correct}</MarkdownInline>
                  </strong>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }

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

      <div className="mb-4 text-lg">
        <MarkdownInline>{current.question}</MarkdownInline>
      </div>

      {current.type === 'multiple' ? (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {current.shuffledAnswers.map((answer, idx) => {
              const isSelected = selectedIndex === idx
              const isCorrect = idx === current.correctIndexShuffled
              const selected = selectedIndex !== null

              const bgColor = selected
                ? isSelected
                  ? isCorrect
                    ? 'bg-green-200 dark:bg-green-700'
                    : 'bg-red-200 dark:bg-red-700'
                  : isCorrect
                    ? 'bg-green-100 dark:bg-green-600'
                    : ''
                : ''

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected}
                  className={`relative w-full rounded border px-4 py-2 text-left transition ${
                    selected ? 'cursor-not-allowed' : 'hover:bg-blue-50 dark:hover:bg-blue-900'
                  } ${bgColor} dark:border-gray-600`}
                >
                  <span className="absolute right-2 top-2 font-mono text-xs text-gray-500 dark:text-gray-300">
                    {idx + 1}
                  </span>
                  <MarkdownInline>{answer}</MarkdownInline>
                </button>
              )
            })}
          </div>
          {selectedIndex !== null && !autoAdvance && (
            <button
              onClick={goToNextQuestion}
              className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              <span className="absolute right-2 top-2 rounded bg-blue-800 px-1 font-mono text-xs text-white dark:bg-blue-900">
                space
              </span>
              Next Question →
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && selectedIndex === null) handleBlankAnswer()
            }}
            disabled={selectedIndex !== null}
            placeholder="Type your answer..."
            className="w-full rounded border px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {selectedIndex === null ? (
            <button
              onClick={handleBlankAnswer}
              disabled={!textInput}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Submit
            </button>
          ) : (
            !autoAdvance && (
              <button
                onClick={goToNextQuestion}
                className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                Next Question →
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
