document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (phone.length !== 10) {
            alert('Phone number must be 10 digits.');
            return;
        }

        fetch('/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, phone })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addUserToTable(username, email, phone);
                document.getElementById('registrationForm').reset();
            } else {
                alert('Error saving user.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Handle delete button click
    document.getElementById('deleteSelected').addEventListener('click', function() {
        const selectedRows = document.querySelectorAll('#userTable input[type="checkbox"]:checked');
        const idsToDelete = Array.from(selectedRows).map(row => row.dataset.id);

        if (idsToDelete.length === 0) {
            alert('No users selected for deletion.');
            return;
        }

        fetch('/deleteUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: idsToDelete })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                idsToDelete.forEach(id => {
                    document.querySelector(#userTable tr[data-id="${id}"]).remove();
                });
            } else {
                alert('Error deleting users.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function addUserToTable(username, email, phone) {
        const tableBody = document.querySelector('#userTable tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" data-id="${username}"></td>
            <td>${username}</td>
            <td>${email}</td>
            <td>${phone}</td>
        `;
        tableBody.appendChild(row);
    }
});
