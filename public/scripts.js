const input = document.querySelector('#searchInput');
const userList = document.querySelector('#users');

let users = [];

window.addEventListener('DOMContentLoaded', async () => {
  userList.innerHTML = '<h1>Loading...</h1>';

  const data = await loadUsers();
  users = data.data;
  renderUsers(data.data);
});

const API = 'https://fakerapi.it/api/v1/users?_quantity=1000';

async function loadUsers() {
  const response = await fetch(API);
  return await response.json();
}

input.addEventListener('keyup', (e) => {
  const newUsers = users.filter((user) =>
    `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
      input.value.toLowerCase()
    )
  );
  renderUsers(newUsers);
});

const createUserItems = (users) =>
  users
    .map(
      (user) =>
        `<li class=" py-2 mx-20 bg-green-400 hover:bg-green-500 hover:cursor-pointer ">${user.firstname} ${user.lastname}</li>`
    )
    .join(' ');

function renderUsers(users) {
  const itemsString = createUserItems(users);
  userList.innerHTML = itemsString;
}
