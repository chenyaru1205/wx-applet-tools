/** @format */
/* eslint-disable */

const outputRpn = exp => {
  const inputStack = []
  const outputStack = []
  const outputQueue = []
  exp.replace(/\s/g, '')
  if (isOperator(exp[0]) && !isBrackets(exp[0])) {
    exp = '0' + exp
  }
  for (let i = 0, max = exp.length; i < max; i++) {
    if (!isOperator(exp[i]) && !isOperator(exp[i - 1]) && i !== 0) {
      inputStack[inputStack.length - 1] = `${inputStack[inputStack.length - 1] + exp[i]}`
    } else {
      inputStack.push(exp[i])
    }
  }
  while (inputStack.length > 0) {
    const cur = inputStack.shift()
    if (isOperator(cur)) {
      if (cur === '(') {
        outputStack.push(cur)
      } else if (cur === ')') {
        let po = outputStack.pop()
        while (po !== '(' && outputStack.length > 0) {
          outputQueue.push(po)
          po = outputStack.pop()
        }
      } else {
        while (prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0) {
          outputQueue.push(outputStack.pop())
        }
        outputStack.push(cur)
      }
    } else {
      outputQueue.push(Number(cur))
    }
  }
  if (outputStack.length > 0) {
    while (outputStack.length > 0) {
      outputQueue.push(outputStack.pop())
    }
  }
  return outputQueue
}

const isBrackets = values => {
  const bracketsString = '()'
  return bracketsString.includes(values)
}

const isOperator = values => {
  const operatorString = '+-*/×÷%()'
  return operatorString.includes(values)
}

const getPrioraty = value => {
  if (value === '-' || value === '+') {
    return 1
  }
  if (value === '*' || value === '/' || value === '×' || value === '÷' || value === '%') {
    return 2
  }
  return 0
}

const prioraty = (v1, v2) => {
  return getPrioraty(v1) <= getPrioraty(v2)
}

const calRpnExp = rpnArr => {
  const stack = []
  for (let i = 0, max = rpnArr.length; i < max; i++) {
    if (!isOperator(rpnArr[i])) {
      stack.push(rpnArr[i])
    } else {
      const num1 = stack.pop()
      const num2 = stack.pop()
      let num
      if (rpnArr[i] === '-') {
        num = num2 - num1
      } else if (rpnArr[i] === '+') {
        num = num2 + num1
      } else if (rpnArr[i] === '*' || rpnArr[i] === '×') {
        num = num2 * num1
      } else if (rpnArr[i] === '/' || rpnArr[i] === '÷') {
        num = num2 / num1
      } else if (rpnArr[i] === '%') {
        num = num2 % num1
      }
      stack.push(num)
    }
  }
  return stack[0]
}

const calCommonExp = exp => {
  const rpnArr = outputRpn(exp)
  return calRpnExp(rpnArr)
}

export default calCommonExp
