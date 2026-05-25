export function isValidExpression(expression) {
  if (!expression) return false

  if (!/^[0-9+\-*/]+$/.test(expression)) return false
  if (/[+\-*/]$/.test(expression)) return false
  if (/^[+\-*/]/.test(expression)) return false
  if (/([+\-*/])\1+/.test(expression)) return false

  const tokens = expression.match(/\d+|[+\-*/]/g) || []
  if (tokens.length === 0 || tokens.length % 2 === 0) return false

  for (let index = 0; index < tokens.length; index += 1) {
    if (index % 2 === 0 && !/^\d+$/.test(tokens[index])) return false
    if (index % 2 === 1 && !/[+\-*/]/.test(tokens[index])) return false
  }

  return true
}

export function evaluateExpression(expression) {
  if (!isValidExpression(expression)) {
    throw new Error('Error')
  }

  return Function(`"use strict"; return (${expression})`)()
}
