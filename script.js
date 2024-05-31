// Countdown Timer
function countdownTimer(endDate) {
    const timer = document.getElementById('timer');
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(interval);
            timer.innerHTML = "EXPIRED";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

const endDate = new Date(Date.UTC(2024, 5, 14, 17, 0, 0)).getTime();
countdownTimer(endDate);

// Poll Implementation with Local Storage
document.getElementById('pollForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedOption = document.querySelector('input[name="pollOption"]:checked');
    if (selectedOption) {
        if (localStorage.getItem('hasVoted')) {
            alert('You have already voted.');
        } else {
            const votes = JSON.parse(localStorage.getItem('votes')) || {
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

            votes[selectedOption.value] += 1;
            localStorage.setItem('votes', JSON.stringify(votes));
            localStorage.setItem('hasVoted', 'true');
            displayResults(votes);
        }
    }
});

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
const storedVotes = JSON.parse(localStorage.getItem('votes')) || {
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
displayResults(storedVotes);
