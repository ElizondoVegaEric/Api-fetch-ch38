//localStorage.clear();


async function fetchData() {
    document.getElementById("visibility").classList.remove("d-none");
    let userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData && isWithinOneMinute(userData.timestamp)) {
      renderData(userData.data);
    } else {
      try {
        const response = await fetch('https://reqres.in/api/users?delay=3');
        const data = await response.json();
        
        
        userData = {
          data: data.data,
          timestamp: new Date().getTime()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        renderData(userData.data);
      } catch (error) {
        console.error(error);
      }
    }
}
  
function renderData(users) {
    document.getElementById("visibility").classList.add("d-none");
    const userDataContainer = document.getElementById('userData');
    userDataContainer.innerHTML = ''; 
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="col-2"><img src="${user.avatar}" alt="Avatar" class="avatar"></td>
        <td class="col-3">${user.first_name}</td>
        <td class="col-3">${user.last_name}</td>
        <td class="col-4">${user.email}</td>
      `;
      userDataContainer.appendChild(row);
    });
}
  
function isWithinOneMinute(timestamp) {
    const now = new Date().getTime();
    return (now - timestamp) < 60000; // 1 minute = 60000 milliseconds
}
  
