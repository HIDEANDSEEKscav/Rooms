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




function navigateToRoom() {
    var roomNumber = document.getElementById('room-input').value;
    switch(roomNumber) {
        case '1003':
            window.location.href = 'Anxiety.html';
            break;
        case '2345':
            window.location.href = 'Joy.html';
            break;
        case '1014':
            window.location.href = 'Fear.html';
            break;
        case '8866':
            window.location.href = 'Sorrow.html';
            break;
        case '0520':
            window.location.href = 'Last.html';
            break;
        default:
            alert('Invalid room number!');
    }
}





let typingInterval = null; 

document.addEventListener('DOMContentLoaded', function() {
    const helpButton = document.getElementById('helpButton');
    const dialogueBox = document.getElementById('dialogue-box');
    const messageElement = document.querySelector('.dialogue-box .message');
    const continueIcon = document.querySelector('.continue-icon');

    const dialogues = [
        "Welcome to Hide and Seek, an immersive scavenger hunt that guides you through a journey of emotions and self-discovery.",
        "Your task is to locate four distinct rooms across the city, each identified by a unique number.",
        "Collecting these numbers is not just about progressing in the game; it's about assembling the 'Key to the Heart.'",
        "This key symbolizes a deeper insight into your emotional self and unlocks the ultimate reward of the hunt.",
        "Enjoy the adventure!"
    ];
    let currentDialogueIndex = 0;
    let typingInterval = null;

    helpButton.addEventListener('click', function() {
        dialogueBox.classList.remove('hidden');
        displayMessage();
    });

    continueIcon.addEventListener('click', function() {
        if (typingInterval) {
            clearInterval(typingInterval);
            messageElement.textContent = dialogues[currentDialogueIndex - 1];
            typingInterval = null;
        }

        if (currentDialogueIndex < dialogues.length) {
            displayMessage();
        } else {
            dialogueBox.classList.add('hidden');
            currentDialogueIndex = 0; 
        }
    });

    function displayMessage() {
        let message = dialogues[currentDialogueIndex++];
        let index = 0;
        messageElement.textContent = ''; 
        typingInterval = setInterval(() => {
            if (index < message.length) {
                messageElement.textContent += message[index++];
            } else {
                clearInterval(typingInterval);
                typingInterval = null;
                if (currentDialogueIndex === dialogues.length) {
                    continueIcon.textContent = 'X'; 
                }
            }
        }, 30); 
    }
});
