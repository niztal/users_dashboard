
const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = { username, password };

    document.getElementsByClassName('error').value = "ffff";

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
                    const { token } = JSON.parse(body);
                    history.pushState({ username, token }, "Welcome", "/welcome.html")
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