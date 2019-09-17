(function () {
    const stylesCss = `button,
        span {
          font-size: 3rem;
          font-family: monospace;
          padding: 0 .5rem;
        }
  
        button {
          background: var(--counter-button-background , pink);
          color: black;
          border: 0;
          border-radius: 6px;
          box-shadow: 0 0 5px rgba(173, 61, 85, .5);
        }
  
        button:active {
          background: #ad3d55;
          color: white;
        }
        
        :host{
            padding: 3em;
            border: 2px solid grey;
            display: block;
        }
        
        :host-context(.other-theme){
            border: 2px solid red;
        } `;

    class MyCounter extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.increment = this.increment.bind(this);
            this.decrement = this.decrement.bind(this);

        }

        connectedCallback() {
            const documentFragment = document.createDocumentFragment();
            const style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(stylesCss));
            documentFragment.appendChild(style);
            const root = document.createElement('div');
            const decButton = document.createElement('button');
            decButton.innerText = '-';
            decButton.addEventListener('click', this.decrement);
            const incButton = document.createElement('button');
            incButton.innerText = '+';
            incButton.addEventListener('click', this.increment);
            root.appendChild(decButton);
            root.appendChild(document.createElement('span'));
            root.appendChild(incButton);
            documentFragment.appendChild(root);
            this.shadowRoot.appendChild(documentFragment);

            if (!this.hasAttribute('value')) {
                this.setAttribute('value', 0);
            }
        }

        increment() {
            const step = +this.step || 1;
            const newValue = +this.value + step;

            if (this.max) {
                this.value = newValue > +this.max ? +this.max : +newValue;
            } else {
                this.value = +newValue;
            }
        }

        decrement() {
            const step = +this.step || 1;
            const newValue = +this.value - step;

            if (this.min) {
                this.value = newValue <= +this.min ? +this.min : +newValue;
            } else {
                this.value = +newValue;
            }
        }

        static get observedAttributes() {
            return ['value'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.shadowRoot.querySelector('span').innerText = this.value;
        }

        get value() {
            return this.getAttribute('value');
        }

        get step() {
            return this.getAttribute('step');
        }

        get min() {
            return this.getAttribute('min');
        }

        get max() {
            return this.getAttribute('max');
        }

        set value(newValue) {
            this.setAttribute('value', newValue);
        }

        set step(newValue) {
            this.setAttribute('step', newValue);
        }

        set min(newValue) {
            this.setAttribute('min', newValue);
        }

        set max(newValue) {
            this.setAttribute('max', newValue);
        }

        disconnectedCallback() {
            this.incrementBtn.removeEventListener('click', this.increment);
            this.decrementBtn.removeEventListener('click', this.decrement);
        }
    }

    window.customElements.define('my-counter', MyCounter);
})();