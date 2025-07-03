(() => {
    const display = document.getElementById('display');

    let currentInput = '0';
    let previousInput = null;
    let operator = null;
    let shouldResetScreen = false;

    function updateDisplay() {
      display.textContent = currentInput;
    }

    function resetCalculator() {
      currentInput = '0';
      previousInput = null;
      operator = null;
      shouldResetScreen = false;
      updateDisplay();
    }

    function appendNumber(number) {
      if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
      }
      if (number === '.' && currentInput.includes('.')) return;
      if (currentInput === '0' && number !== '.') {
        currentInput = number;
      } else {
        currentInput += number;
      }
    }

    function chooseOperator(op) {
      if (operator !== null) {
        calculate();
      }
      previousInput = currentInput;
      operator = op;
      shouldResetScreen = true;
    }

    function calculate() {
      let computation;
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      if (isNaN(prev) || isNaN(current)) return;

      switch (operator) {
        case 'add':
          computation = prev + current;
          break;
        case 'subtract':
          computation = prev - current;
          break;
        case 'multiply':
          computation = prev * current;
          break;
        case 'divide':
          if (current === 0) {
            alert("Error: Division by zero");
            resetCalculator();
            return;
          }
          computation = prev / current;
          break;
        default:
          return;
      }
      currentInput = computation.toString();
      operator = null;
      previousInput = null;
      shouldResetScreen = true;
    }

    function backspace() {
      if (shouldResetScreen) return;
      if (currentInput.length === 1) {
        currentInput = '0';
      } else {
        currentInput = currentInput.slice(0, -1);
      }
    }

    function percent() {
      const current = parseFloat(currentInput);
      if (isNaN(current)) return;
      currentInput = (current / 100).toString();
    }

    document.querySelector('.buttons').addEventListener('click', e => {
      const target = e.target;
      if (!target.matches('button')) return;

      if (target.hasAttribute('data-number')) {
        appendNumber(target.getAttribute('data-number'));
        updateDisplay();
        return;
      }

      const action = target.getAttribute('data-action');
      switch(action) {
        case 'clear':
          resetCalculator();
          break;
        case 'backspace':
          backspace();
          updateDisplay();
          break;
        case 'percent':
          percent();
          updateDisplay();
          break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
          chooseOperator(action);
          break;
        case 'equal':
          calculate();
          updateDisplay();
          break;
      }
    });

    // Initialize display
    updateDisplay();

    // Keyboard support
    window.addEventListener('keydown', e => {
      if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        e.preventDefault();
        appendNumber(e.key);
        updateDisplay();
        return;
      }
      switch(e.key) {
        case 'Enter':
        case '=':
          e.preventDefault();
          calculate();
          updateDisplay();
          break;
        case 'Backspace':
          e.preventDefault();
          backspace();
          updateDisplay();
          break;
        case 'Escape':
          e.preventDefault();
          resetCalculator();
          break;
        case '+':
          e.preventDefault();
          chooseOperator('add');
          break;
        case '-':
          e.preventDefault();
          chooseOperator('subtract');
          break;
        case '*':
          e.preventDefault();
          chooseOperator('multiply');
          break;
        case '/':
          e.preventDefault();
          chooseOperator('divide');
          break;
        case '%':
          e.preventDefault();
          percent();
          updateDisplay();
          break;
      }
    });
  })();

