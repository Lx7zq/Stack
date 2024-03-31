const stackContainer = document.getElementById('stack-container');
const box = document.querySelector('.box');
const box2 = document.querySelector('.box2');
const isEmptyElement = document.getElementById('is-empty');
const isFullElement = document.getElementById('is-full');
const countElement = document.getElementById('count');
const peekElement = document.getElementById('peek');
const changeElement = document.getElementById('change');
let stack = [];

function isEmpty() {
    return stack.length === 0;
}

function isFull() {
    const stackCapacity = 5;
    return stack.length === stackCapacity;
}

function count() {
    return stack.length;
}

function peek() {
    if (!isEmpty()) {
        const positions = stack.map((box, index) => {
            const boxType = box.classList.contains('box') ? 'box' : 'box2';
            return `Position ${index + 1}: ${boxType}`;
        });

        const message = positions.join('\n');
        alert(`${message}`);
    } else {
        alert('Stack is empty. Cannot peek.');
    }
}
peekElement.addEventListener('click', peek);

function change() {
    if (!isEmpty()) {
        // Shuffle the stack array to change positions
        stack = stack.sort(() => Math.random() - 0.5);

        // Remove all box from the stack container
        stackContainer.innerHTML = '';

        // Append the shuffled box back to the stack container
        stack.forEach((box) => {
            stackContainer.appendChild(box);
        });

        // Update status
        updateStatus();
    } else {
        alert('Stack is empty. Cannot change.');
    }
}

changeElement.addEventListener('click', change);


// ... (existing code)

box.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'box');
});

box2.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'box2');
});

stackContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

stackContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const newBox = (data === 'box') ? box.cloneNode(true) : box2.cloneNode(true);

    if ((data === 'box' || data === 'box2') && !isFull()) {
        stackContainer.appendChild(newBox);
        stack.push(newBox);

        // Update status
        updateStatus();
        
        newBox.addEventListener('dblclick', () => {
            stackContainer.removeChild(newBox);
            stack = stack.filter(item => item !== newBox);
            // Update status
            updateStatus();
        });
    }
});

stackContainer.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('box') || e.target.classList.contains('box2')) {
        stackContainer.removeChild(e.target);
        stack = stack.filter(item => item !== e.target);
        // Update status
        updateStatus();
    }
});

function updateStatus() {
    isEmptyElement.textContent = isEmpty() ? '0' : 'Not Empty';
    isFullElement.textContent = isFull() ? 'Full' : 'Not Full';
    countElement.textContent = count();
    peekElement.addEventListener('click', peek);


}