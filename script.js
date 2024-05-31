import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASFTlF0YxoqsmdQzdxkUlwyegpCZBpAMU",
    authDomain: "mattongo-64d3d.firebaseapp.com",
    databaseURL: "https://mattongo-64d3d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mattongo-64d3d",
    storageBucket: "mattongo-64d3d.appspot.com",
    messagingSenderId: "27967954555",
    appId: "1:27967954555:web:a366f8271dde6aca43ccde",
    measurementId: "G-S5MKG1WR7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Countdown Timer
function startCountdown(endTime) {
    const timerElement = document.getElementById('timer');
    const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeRemaining = endTime - currentTime;

        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            timerElement.innerHTML = "EXPIRED";
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

const countdownEndDate = new Date(Date.UTC(2024, 5, 14, 17, 0, 0)).getTime();
startCountdown(countdownEndDate);

// Poll Implementation with Firebase Firestore
document.getElementById('pollForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const selectedOption = document.querySelector('input[name="pollOption"]:checked');
    if (selectedOption) {
        if (localStorage.getItem('hasVoted')) {
            alert('You have already voted.');
        } else {
            const voteRef = doc(db, "votes", selectedOption.value);
            try {
                const docSnap = await getDoc(voteRef);
                if (!docSnap.exists()) {
                    await setDoc(voteRef, { count: 1 });
                } else {
                    await updateDoc(voteRef, { count: increment(1) });
                }
                localStorage.setItem('hasVoted', 'true');
            } catch (error) {
                console.error("Transaction failed: ", error);
            }
        }
    }
});

function loadResults() {
    const votesRef = collection(db, "votes");
    onSnapshot(votesRef, (querySnapshot) => {
        const results = {};
        querySnapshot.forEach(doc => {
            results[doc.id] = doc.data().count;
        });
        displayResults(results);
    });
}

function displayResults(results) {
    const ctx = document.getElementById('pollChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(results),
            datasets: [{
                label: 'Poll Results',
                data: Object.values(results),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Load initial results
loadResults();
