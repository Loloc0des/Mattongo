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

// Poll Implementation with Local Storage
document.getElementById('pollForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedOption = document.querySelector('input[name="pollOption"]:checked');
    if (selectedOption) {
        if (localStorage.getItem('hasVoted')) {
            alert('You have already voted.');
        } else {
            const voteCounts = JSON.parse(localStorage.getItem('votes')) || {
                "Arno": 0,
                "Bossut": 0,
                "B1": 0,
                "Cete": 0,
                "Diere": 0,
                "Djoere": 0,
                "Dwight": 0,
                "Flaker": 0,
                "Lante": 0,
                "Lorre": 0,
                "Mass": 0,
                "Matn": 0,
                "Pire": 0,
                "Semain": 0,
                "Stijne": 0
            };

            voteCounts[selectedOption.value] += 1;
            localStorage.setItem('votes', JSON.stringify(voteCounts));
            localStorage.setItem('hasVoted', 'true');
            showResults(voteCounts);
        }
    }
});

function showResults(voteData) {
    const chartContext = document.getElementById('pollChart').getContext('2d');
    new Chart(chartContext, {
        type: 'bar',
        data: {
            labels: Object.keys(voteData),
            datasets: [{
                label: 'Poll Results',
                data: Object.values(voteData),
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

// Load initial results from local storage
const initialVotes = JSON.parse(localStorage.getItem('votes')) || {
    "Arno": 0,
    "Bossut": 0,
    "B1": 0,
    "Cete": 0,
    "Diere": 0,
    "Djoere": 0,
    "Dwight": 0,
    "Flaker": 0,
    "Lante": 0,
    "Lorre": 0,
    "Mass": 0,
    "Matn": 0,
    "Pire": 0,
    "Semain": 0,
    "Stijne": 0
};
showResults(initialVotes);
