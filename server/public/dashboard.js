document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('welcome').innerHTML += history.state.username;

    setInterval(() => { getUsersList() }, history.state.refresh);

    getUsersList();
});

const getUsersList = () => {
    fetch('/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + history.state.token
        }
    })
        .then((response) => {
            if (response.ok) {
                response.text().then((body) => {
                    const usersList = document.getElementById('users_list');
                    usersList.innerHTML = "";
                    const users = JSON.parse(body);
                    users.forEach((user) => {
                        const newUserComponent = renderUserComponent(user);
                        usersList.appendChild(newUserComponent);
                    })
                })
            }
        })
}

const renderUserComponent = (user) => {
    const userComponent = document.createElement("div");
    userComponent.className = "user";

    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = "/user.png";

    const usernameDiv = document.createElement("div");
    usernameDiv.className = "user-data";
    const username = document.createElement("span");
    username.innerHTML = user.username;
    usernameDiv.appendChild(username);

    const loginTimeDiv = document.createElement("div");
    loginTimeDiv.className = "user-data";
    const loginTime = document.createElement("span");
    loginTime.innerHTML = new Date(user.loginTime || user.registrationTime).toLocaleString();
    loginTimeDiv.appendChild(loginTime);

    const ipDiv = document.createElement("div");
    ipDiv.className = "user-data";
    const ip = document.createElement("span");
    ip.innerHTML = user.ip;
    ipDiv.appendChild(ip);

    userComponent.appendChild(avatar);
    userComponent.appendChild(usernameDiv);
    userComponent.appendChild(loginTimeDiv);
    userComponent.appendChild(ipDiv);

    userComponent.onclick = () => {
        const userAgentSpan = document.getElementById("user_agent");
        userAgentSpan.innerHTML = "User Agent: " + user.userAgent;

        const registrationTimeSpan = document.getElementById("registration_time");
        registrationTimeSpan.innerHTML = "Registration Time: " + new Date(user.registrationTime).toLocaleString();

        const loginsCountSpan = document.getElementById("logins_count");
        loginsCountSpan.innerHTML = "Logins Count: " + user.loginsCount;

        const userPopup = document.getElementById("user_popup");
        userPopup.style.display = "block";
    }

    return userComponent;
}

const closePopup = () => {
    const userPopup = document.getElementById("user_popup");
    userPopup.style.display = "none";
}

const logout = () => {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + history.state.token
        },
        body: JSON.stringify({ userId: history.state.userId })
    })
        .then((response) => {
            if (response.ok) {
                history.state = {};
                location.replace("/");
            }
        })
}