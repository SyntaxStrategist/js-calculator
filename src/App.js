import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleClear = () => {
    setDisplay("0");
    setFormula("");
    setEvaluated(false);
  };

  const handleNumber = (value) => {
    if (evaluated) {
      setDisplay(value);
      setFormula(value);
      setEvaluated(false);
    } else {
      if (display === "0" && value === "0") return;
      const newDisplay = display === "0" ? value : display + value;
      setDisplay(newDisplay);
      setFormula(formula + value);
    }
  };

  const handleOperator = (value) => {
    if (evaluated) {
      setFormula(display + value);
      setEvaluated(false);
    } else {
      const lastChar = formula.slice(-1);
      if (["+", "-", "*", "/"].includes(lastChar)) {
        setFormula(formula.slice(0, -1) + value);
      } else {
        setFormula(formula + value);
      }
    }
    setDisplay(value);
  };

  const handleDecimal = () => {
    if (evaluated) {
      setDisplay("0.");
      setFormula("0.");
      setEvaluated(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
      setFormula(formula + ".");
    }
  };

  const handleEquals = () => {
    try {
      const result = eval(formula).toString();
      setDisplay(result);
      setFormula(result);
      setEvaluated(true);
    } catch (error) {
      setDisplay("Error");
      setFormula("");
      setEvaluated(true);
    }
  };

  return (
    <div id="calculator">
      <Display value={display} />
      <div id="buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        
        <button id="zero" onClick={() => handleNumber("0")}>0</button>
        <button id="one" onClick={() => handleNumber("1")}>1</button>
        <button id="two" onClick={() => handleNumber("2")}>2</button>
        <button id="three" onClick={() => handleNumber("3")}>3</button>
        <button id="four" onClick={() => handleNumber("4")}>4</button>
        <button id="five" onClick={() => handleNumber("5")}>5</button>
        <button id="six" onClick={() => handleNumber("6")}>6</button>
        <button id="seven" onClick={() => handleNumber("7")}>7</button>
        <button id="eight" onClick={() => handleNumber("8")}>8</button>
        <button id="nine" onClick={() => handleNumber("9")}>9</button>

        <button id="add" onClick={() => handleOperator("+")}>+</button>
        <button id="subtract" onClick={() => handleOperator("-")}>-</button>
        <button id="multiply" onClick={() => handleOperator("*")}>*</button>
        <button id="divide" onClick={() => handleOperator("/")}>/</button>

        <button id="decimal" onClick={handleDecimal}>.</button>
        <button id="equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}

function Display({ value }) {
  return <div id="display">{value}</div>;
}

export default Calculator;
