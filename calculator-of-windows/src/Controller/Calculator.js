class Calculator {
    constructor() {
        this._operation = [];
        this._display = document.querySelector('.display');
        this._lastOperator;
        this._lastNumber;

        this.initialize();
    }

    initialize() {
        this.initButtons();
        this.display = 0;
    }

    //init buttons in the calc
    initButtons() {
        let buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', e => {
                let btnClick = btn.innerHTML;
                this.actionCalc(btnClick);
            }, false);
        });
    }

    //actions in the user in calc
    actionCalc(value) {
        switch (value) {
            case 'CE':
                this.clearEntry();
                break;
            case 'C':
                this.clear();
                break;
            case '←':
                this.backspace();
                break;
            case '=':
                this.calc();
                break;
            case ',':
                this.addDot();
                break;
            case '±':
                this.invertNumber();
                break;
            case ',':
                this.addDot();
                break;
            case '+':
                this.addOperation('+');
                break;
            case '-':
                this.addOperation('-');
                break;
            case '÷':
                this.addOperation('/');
                break;
            case 'x':
                this.addOperation('*');
                break;
            case '%':
                this.addOperation('%');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(value);
                break;
            default:
                this.setError();
                break;
        }
    }

    //verify actions in the user
    addOperation(value) {
        if (isNaN(this.getLastOperator())) {
            if (this.isOperator(value)) {
                if (this.operation == '') {
                    this.operation = [0, value];
                } else {
                    this.setLastOperator(value);
                }
            } else {
                if (value == 0) return;
                this.pushOperator(value);
                this.updateDisplay();
            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperator(value);
            } else {
                let numConcat = this.getLastOperator() + value.toString();
                this.setLastOperator(numConcat);
                this.updateDisplay();
            }
        }

        if (this.operation.length > 3) this.calc();

        this.updateDisplay();

        console.log("Operation", this.operation);
    }

    calc() {
        if (this.operation.length < 2) return;

        if (this.operation.length == 2) {
            let firstNumber = this.operation[0];
            if (!this.lastOperator) this.lastOperator = this.getLastPosition();
            if (!this.lastNumber) this.pushOperator(firstNumber);
            if (this.lastNumber) this.pushOperator(this.lastNumber);;
        }

        if (this.operation.length > 3) {
            this.lastOperator = this.destroyLastOperator();
        } else if (this.operation.length == 3) {
            this.lastNumber = this.getLastPosition(false);
            this.lastOperator = this.getLastPosition();
        }

        let result = this.getResult();

        if (this.lastOperator == '%') {
            result /= 100;
            this.operation = [result];
        } else {
            this._operation = [result, this.lastOperator];
        }

        this.updateDisplay();
    }



    /** HELPERS */

    //show error the of display
    setError(){
        return this.display = 'Error';
    }

    //action the of button C
    clear() {
        this.operation = [];
        this.updateDisplay();
    }
    //action the of button CE
    clearEntry() {
        this.destroyLastOperator();
        this.updateDisplay();
    }

    //action the of button Backspace
    backspace() {
        if(isNaN(this.getLastOperator())) return;
        let lastNumber = this.getLastPosition(false).toString().split("");   
        lastNumber.pop()         
        let NewNumber = lastNumber.join('');
        this.setLastOperator(NewNumber);
        this.updateDisplay();
    }

    //action the of button +/-
    invertNumber(){
        if(isNaN(this.getLastOperator())) return;
        let lastNumber = Number(this.getLastPosition(false));                
        if(lastNumber >= 0){
            lastNumber *= -1;
        }else{
            lastNumber *= -1;
        }        
        this.setLastOperator(lastNumber);
        this.updateDisplay();
    }

    //action the of button comma
    addDot() {
        let lastOperation = this.getLastOperator();

        if (typeof lastOperation == "string" && lastOperation.split('').indexOf('.') > - 1) return;

        if (!lastOperation || this.isOperator(lastOperation)) {
            this.pushOperator('0.');
        } else {
            this.setLastOperator(lastOperation.toString() + '.');
        }

        this.updateDisplay();
    }

    //update the display
    updateDisplay() {
        this.display = this.getLastPosition(false);
    }

    //get the last position the of array
    getLastPosition(isOperator = true) {
        let last;
        for (let i = this.lengthOperation(); i >= 0; i--) {
            if (this.isOperator(this.operation[i]) == isOperator) {
                last = this.operation[i];
                break;
            }
        }

        if (!last) last = 0;
        return last;
    }

    //return result in of calc
    getResult() {
        try {
            return eval(this.operation.join(""));
        } catch {
            this.setError();
        }        
    }

    //verify if it is operator valid
    isOperator(value) {
        return ["+", "-", "*", "/", "%"].indexOf(value) > -1;
    }

    //insert a position the of array
    pushOperator(value) {
        this.operation.push(value);
    }

    //get last position the of array
    getLastOperator() {
        return this.operation[this.operation.length - 1];
    }

    //set last position the of array
    setLastOperator(value) {
        this.operation[this.operation.length - 1] = value;
    }

    //destroy last operator the of array
    destroyLastOperator() {
        return this.operation.pop();
    }

    //return the size the of array
    lengthOperation() {
        return this.operation.length - 1;
    }

    /** GETTERS AND SETTERS */
    /** this._display */
    get display() {
        return this._display.innerHTML;
    }
    set display(value) {
        this._display.innerHTML = value;
    }
    /** this._operation */
    get operation() {
        return this._operation;
    }
    set operation(value) {
        this._operation = value;
    }
    /** this._lastOperator */
    get lastOperator() {
        return this._lastOperator;
    }
    set lastOperator(value) {
        this._lastOperator = value;
    }
    /** this._lastNumber */
    get lastNumber() {
        return this._lastNumber;
    }
    set lastNumber(value) {
        this._lastNumber = value;
    }
}
