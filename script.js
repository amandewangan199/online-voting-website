// Function to get users from local storage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to get votes from local storage
function getVotes() {
    return JSON.parse(localStorage.getItem('votes')) || {};
}

// Register Form Submission
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = getUsers();
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    window.location.href = 'login.html';
});

// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'vote.html';
    } else {
        alert('Invalid credentials');
    }
});

// Vote Form Submission
document.getElementById('voteForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const candidate = document.querySelector('input[name="candidate"]:checked').value;

    const votes = getVotes();
    votes[candidate] = (votes[candidate] || 0) + 1;
    localStorage.setItem('votes', JSON.stringify(votes));

    alert('Vote submitted successfully!');
    window.location.href = 'results.html';
});

// Display Results
if (window.location.pathname.endsWith('results.html')) {
    const resultsDiv = document.getElementById('results');
    const votes = getVotes();
    
    resultsDiv.innerHTML = `
        <p><img src="images/bjp.png" alt="BJP" class="party-symbol"> BJP: ${votes.bjp || 0}</p>
        <p><img src="images/congress.png" alt="Congress" class="party-symbol"> Congress: ${votes.congress || 0}</p>
        <p><img src="images/aap.png" alt="AAP" class="party-symbol"> AAP: ${votes.aap || 0}</p>
        <p><img src="images/sp.png" alt="SP" class="party-symbol"> SP: ${votes.sp || 0}</p>
        <p><img src="images/bsp.png" alt="BSP" class="party-symbol"> BSP: ${votes.bsp || 0}</p>
    `;
}
