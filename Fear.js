document.addEventListener('DOMContentLoaded', function() {
    var bgm = document.getElementById('bgm');
    var playButton = document.getElementById('playButton');

    playButton.addEventListener('click', function() {
        if (bgm.paused) {
            bgm.play().then(() => {
                playButton.textContent = '||'; 
            }).catch(error => {
                console.log("Failed to play music. User interaction might be required.");
                playButton.textContent = '▶'; 
            });
        } else {
            bgm.pause();
            playButton.textContent = '▶'; 
        }
    });
});





document.addEventListener('DOMContentLoaded', function () {
    const floor = document.querySelector('.floor');
    const numSquaresPerRow = 7;
    const totalSquares = numSquaresPerRow * numSquaresPerRow;
    const squareWidth = floor.offsetWidth / numSquaresPerRow;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareWidth}px`;
        square.style.height = `${squareWidth}px`;
        floor.appendChild(square);
    }

    const dialogues = [
        "Welcome to the Fear Room. You are now at Wall Street, the heart of global finance. ",
        "Surrounded by towering skyscrapers, busy businessmen, and the constant fluctuations of stock market numbers on electronic screens. Fear and unease pervade this fast-paced and high-pressure environment. ",
        " Feel the tense atmosphere, fully experience this fear, and find yourself amidst the pressure.",
        "Once ready, your next stop is Green-Wood Cemetery"
    ];
    let currentDialogueIndex = 0;
    let dialogueFinished = false;
    let typingInterval;

    const dialogueBox = document.getElementById('dialogue-box');
    const messageElement = document.querySelector('.dialogue-box .message');
    const continueIcon = document.querySelector('.continue-icon');

    function advanceDialogue() {
        if (typingInterval) {
            clearInterval(typingInterval); 
            messageElement.innerHTML = dialogues[currentDialogueIndex];  
        }
        if (currentDialogueIndex < dialogues.length - 1) {
            currentDialogueIndex++;
            startDialogue();
        } else {
            continueIcon.style.display = 'none';  
            dialogueFinished = true; 
            dialogueBox.classList.add('hidden');  
            showButtons(); 
        }
    }

    continueIcon.addEventListener('click', function (event) {
        event.stopPropagation();  
        advanceDialogue();
    });

    document.body.addEventListener('click', function startDialogueEvent() {
        if (!dialogueFinished) {
            startDialogue();
        }
        document.body.removeEventListener('click', startDialogueEvent); 
    });

    function startDialogue() {
        dialogueBox.classList.remove('hidden');
        typeMessage(dialogues[currentDialogueIndex]);
    }

    function typeMessage(message) {
        let index = 0;
        messageElement.innerHTML = '';
        typingInterval = setInterval(() => {
            if (index < message.length) {
                messageElement.innerHTML += message[index++];
            } else {
                clearInterval(typingInterval);
                typingInterval = null;
                if (currentDialogueIndex < dialogues.length - 1) {
                    continueIcon.style.display = 'block';
                }
            }
        }, 30); 
    }

    function showButtons() {
        document.querySelector('.button-container').style.display = 'flex'; 
    }

    document.getElementById('back-button').addEventListener('click', function() {
        window.location.href = 'index.html'; 
    });

    document.getElementById('again-button').addEventListener('click', function() {
        currentDialogueIndex = 0; 
        dialogueFinished = false;  
        startDialogue(); 
    });
});