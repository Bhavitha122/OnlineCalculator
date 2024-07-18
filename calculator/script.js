document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = '';
    let lastInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.id === 'clear') {
                currentInput = '';
                display.innerText = '';
                lastInput = '';
                return;
            }

            if (value) {
                if (isOperator(value) && (currentInput === '' || isOperator(lastInput))) {
                    return;
                }
                currentInput += value;
                display.innerText = currentInput;
                lastInput = value;
            }

            if (button.id === 'equals') {
                try {
                    if (!isOperator(lastInput)) {
                        currentInput = eval(currentInput).toString();
                        display.innerText = currentInput;
                        lastInput = '';
                    } else {
                        display.innerText = 'Error';
                        currentInput = '';
                        lastInput = '';
                    }
                } catch {
                    display.innerText = 'Error';
                    currentInput = '';
                    lastInput = '';
                }
            }
        });
    });

    function isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }
});
