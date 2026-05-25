import { useMemo, useState } from 'react'
import { evaluateExpression } from './calculatorLogic'

const buttonLabels = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', 'C', '=', '+']

function isOperator(symbol) {
  return ['+', '-', '*', '/'].includes(symbol)
}

function App() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')

  const hasResult = useMemo(() => result !== '', [result])

  const handlePress = (value) => {
    if (value === 'C') {
      setExpression('')
      setResult('')
      return
    }

    if (value === '=') {
      try {
        const nextResult = evaluateExpression(expression)
        setResult(String(nextResult))
      } catch {
        setResult('Error')
      }
      return
    }

    if (expression === '' && isOperator(value)) {
      return
    }

    if (isOperator(value) && isOperator(expression.slice(-1))) {
      setExpression(expression.slice(0, -1) + value)
      return
    }

    setExpression((current) => current + value)
    setResult('')
  }

  return (
    <main className="calculator-shell">
      <h1>Calculator</h1>
      <input
        className="expression-input"
        type="text"
        readOnly
        aria-label="Expression input"
        value={expression}
        placeholder="Enter expression"
      />
      <div className="result-display" aria-live="polite">
        {hasResult ? result : ''}
      </div>
      <div className="button-grid">
        {buttonLabels.map((label) => {
          let buttonType = 'digit'
          if (label === 'C') buttonType = 'clear'
          else if (label === '=') buttonType = 'equals'
          else if (isOperator(label)) buttonType = 'operator'

          return (
            <button
              type="button"
              key={label}
              className={`calculator-button ${buttonType}`}
              onClick={() => handlePress(label)}
            >
              {label}
            </button>
          )
        })}
      </div>
    </main>
  )
}

export default App
