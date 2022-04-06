//form
const signupForm = document.querySelector('#signup-table')

// Signup input
const signupID = document.querySelector('#InputID');
const signUpName = document.querySelector('#InputName');
const signUpAge = document.querySelector('#InputAge');
const signUpJob = document.querySelector('#InputJob');

//Error Messages
const errorMessage = document.querySelector('#error')
const deleteMessage = document.querySelector('#delete')


//New User
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const signUpDetails = {
        name: signUpName.value,
        age: signUpAge.value,
        job: signUpJob.value,
        id: signupID.value
    };

    fetch("/api/user/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpDetails)
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                errorMessage.innerHTML = data.error
            }
            else {
                console.log(data)
                errorMessage.innerHTML = "New user created successfully"
            }
        });
})

signupForm.addEventListener('update', e => {
    e.preventDefault();
    const signUpDetails = {
        name: signUpName.value,
        age: signUpAge.value,
        job: signUpJob.value,
        id: signupID.value
    };

    fetch(`/api/user/create/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpDetails)
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                errorMessage.innerHTML = data.error
            }
            else {
                console.log(data)
                errorMessage.innerHTML = "Update successfully"
            }
        });
})

//Find user
function findUsers() {
    const findUser = document.querySelector('#FindID').value;

    fetch(`/api/user/create/${findUser}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.innerHTML = data.error
            } else {
                output = document.getElementById('showUser');

                output.innerHTML = 'The person with the ID is ' + data.Name + ' with age of ' + data.Age + ' and their job is ' + data.Job;
            }
        })
}



//Delete the user
function deleteUser() {
    const deleteUser = document.querySelector('#DeleteID').value;

    fetch(`/api/user/create/${deleteUser}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                deleteMessage.innerHTML = data.error
            }
            if (data.status) {
                deleteMessage.innerHTML = data.status
            }
        })
}

//Show all user
function tableFromJson() {
    fetch("/api/user/all", {
        method: "GET",
    })
        .then(result => result.json())
        .then(function (data) {
            var col = []
            for (var i = 0; i < data.length; i++) {
                for (var key in data[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key)
                    }
                }
            }

            var table = document.createElement('table');
            var tr = table.insertRow(-1);
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement('th');
                th.innerHTML = col[i];
                tr.appendChild(th);
            }
            for (var i = 0; i < data.length; i++) {
                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = data[i][col[j]];
                }
            }

            var divShowData = document.getElementById('showData');
            divShowData.innerHTML = "";
            divShowData.appendChild(table);

        });
}
