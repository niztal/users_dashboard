
const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = { username, password };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
        .then((response) => {
            if (response.ok) {
                response.text().then(body => {
                    const refresh = response.headers.get("X-REFRESH");
                    const { userId, token } = JSON.parse(body);
                    history.pushState({ userId, username, token, refresh: parseInt(refresh) }, "Welcome", "/dashboard.html");
                    location.reload();
                });
            } else {
                response.text().then(body => {
                    document.getElementById('error').innerHTML = JSON.parse(body).message;
                });
            }
        })
        .catch((error) => {
            if (error) {
                document.getElementsByClassName('error').value = "Something went wrong please try again";
            }
        });
}

const register = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const registrationData = { username, password };

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
    })
        .then((response) => {
            if (response.ok) {
                response.text().then(body => {
                    const refresh = response.headers.get("X-REFRESH");
                    const { userId, token } = JSON.parse(body);
                    history.pushState({ userId, username, token, refresh: parseInt(refresh) }, "Welcome", "/dashboard.html");
                    location.reload();
                });
            } else {
                response.text().then(body => {
                    document.getElementById('error').innerHTML = JSON.parse(body).message;
                });
            }
        }).catch((error) => {
            if (error) {
                document.getElementsByClassName('error').value = "Something went wrong please try again";
            }
        });
}