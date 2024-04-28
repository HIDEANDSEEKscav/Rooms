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
        "Congratulations on unlocking your 'Key to the Heart.'",
        "This key is not just a physical symbol; it represents a deep understanding and growth of the self. Through this scavenger hunt, you explored not only the corners of New York but also the various emotions within your heart.",
        "Each room, each emotion, was part of your journey of self-discovery. This Key to the Heart is your ultimate reward in this game, symbolizing that you are ready to face and accept your various emotions.",
        "We hope this experience not only brought you fun but also prompted deep reflection on your emotional world. ",
        "Thank you for participating in Hide and Seek.",
        "We sincerely hope that you gained not just fun from this game but also a deeper understanding and appreciation of life and self. Please continue to carrying this insight and understanding into the next chapter of your life."
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