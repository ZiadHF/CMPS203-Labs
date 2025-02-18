function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);
        deleteButton.addEventListener('click', () => { deleteEmployee(item.id) });
        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const form = document.getElementById("employeeForm");
let submitButton = form.querySelector('button[type="submit"]');
submitButton.addEventListener('click', (e) => { 
  e.preventDefault();
  createEmployee() 
});
// TODO

// add event listener to delete button

// TODO
function createEmployee() {
  // get data from input field
  // send data to BE
  // call fetchEmployees
  if (!document.getElementById('id').value || !document.getElementById('name').value) {
    alert('Please fill in all fields');
    return;
  }
  const employee = {
    "id": document.getElementById('id').value,
    "name": document.getElementById('name').value
  }
   fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => fetchEmployees())
    .catch(error => console.error("Error:", error));
}

// TODO
function deleteEmployee(id) {
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => fetchEmployees())
    .catch(error => console.error("Error:", error));
}

fetchEmployees()
