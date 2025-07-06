document.addEventListener('DOMContentLoaded', function() {
    const userContainer = document.getElementById('userContainer');
    const errorMessage = document.getElementById('errorMessage');
    const reloadBtn = document.getElementById('reloadBtn');
    const fetchBtn = document.getElementById('fetchBtn');
    
    fetchBtn.addEventListener('click', function() {
    fetchUserData();
   
    });
    
    reloadBtn.addEventListener('click', fetchUserData);
    
    function fetchUserData() {
        errorMessage.style.display = 'none';
        userContainer.innerHTML = '';
        
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                displayUsers(users);
            })
            .catch(error => {
                showError(error);
            })
            .finally(() => {
                reloadBtn.style.display = 'block';
            });
        
    }
    
    function displayUsers(users) {
        if (users.length === 0) {
            userContainer.innerHTML = '<p>No users found.</p>';
            return;
        }
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            
            const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
            
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;
            
            userContainer.appendChild(userCard);
        });
    }
    
    function showError(error) {
        errorMessage.textContent = `Failed to load user data: ${error.message}. Please check your internet connection and try again.`;
        errorMessage.style.display = 'block';
    }
});