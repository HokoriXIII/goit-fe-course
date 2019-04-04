/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const url = "https://test-users-api.herokuapp.com/users/";

const getUsers = document.querySelector(".btn-get-users");
const getUser = document.querySelector(".btn-get-user");
const addUser = document.querySelector(".btn-add-user");
const updateUser = document.querySelector(".btn-update-user");
const removeUser = document.querySelector(".btn-remove-user");

const userData = document.querySelector(".data_body");
const userDataId = document.querySelector(".getuserid-data");
const addUserNew = document.querySelector(".adduser-data");

// Обновление таблицы пользователей
function updateData(arr) {
  userData.innerHTML = "";
  return arr.reduce(
    (table, item) =>
      table +
      `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.age}</td></tr>`,
    ""
  );
}

function updateSingleData(item) {
  userDataId.innerHTML = "";
  return `<table><thead><tr><th>ID</th><th>Name</th><th>Age</th></tr></thead><tbody class="data_body"><tr><td>${
    item.id
  }</td><td>${item.name}</td><td>${item.age}</td></tr></tbody></table>`;
}

function addUserData(item) {
  addUserNew.innerHTML = "";
  return `<table><thead><tr><th>ID</th><th>Name</th><th>Age</th></tr></thead><tbody class="data_body"><tr><td>${
    item._id
  }</td><td>${item.name}</td><td>${item.age}</td></tr></tbody></table>`;
}

// Получение списка пользователей
function handleGetUsersClick(e) {
  e.preventDefault();
  getAllUsers();
}

function getAllUsers() {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      userData.innerHTML = updateData(data.data);
    })
    .catch(error => {
      console.error("Error", error);
    });
}

getUsers.addEventListener("click", handleGetUsersClick);

// Получение пользователя по ID
function handleGetUserByIdClick(e) {
  let form = document.querySelector(".getbyid-form");
  let id = document.querySelector(".getbyid-id");
  e.preventDefault();
  getUserById(id.value);
  form.reset();
}

function getUserById(id) {
  fetch(url + id)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      userDataId.innerHTML = updateSingleData(data.data);
    })
    .catch(error => {
      console.error("Error", error);
    });
}

getUser.addEventListener("click", handleGetUserByIdClick);

// Добавление пользователя
function handleAddUser(e) {
  let form = document.querySelector(".adduser-form");
  let name = document.querySelector(".adduser-name");
  let age = document.querySelector(".adduser-age");
  e.preventDefault();
  addNewUser(name.value, age.value);
  form.reset();
  getAllUsers();
}

function addNewUser(name, age) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ name, age }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      console.log(`User "${data.data.name}" has been added! `);
      addUserNew.innerHTML = addUserData(data.data);
    })
    .catch(error => {
      console.error("Error", error);
    });
}

addUser.addEventListener("click", handleAddUser);

// Редактирование пользователя
function handleEditUser(e) {
  let form = document.querySelector(".updateuser-form");
  let id = document.querySelector(".updateuser-id");
  let name = document.querySelector(".updateuser-name");
  let age = document.querySelector(".updateuser-age");
  e.preventDefault();
  if (id.value !== "" || name.value !== "" || age.value !== "") {
    editUser(id.value, name.value, age.value);
  } else {
    console.log("Заполните все поля!!!");
  }
  form.reset();
  getAllUsers();
}

function editUser(id, name, age) {
  let editUrl = url + id;
  fetch(editUrl, {
    method: "PUT",
    body: JSON.stringify({ name, age }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => data.data)
    .then(user => {
      if (user === undefined) {
        console.log(`Пользователь ${name} не найден`);
      } else {
        console.log(`Пользователь ${name} изменен`);
      }
    })
    .catch(error => {
      console.error("Error", error);
    });
}

updateUser.addEventListener("click", handleEditUser);

// Удаление пользователя
function handleRemoveUser(e) {
  let form = document.querySelector(".removeuser-form");
  let id = document.querySelector(".removeuser-id");
  e.preventDefault();
  if (id.value !== "") {
    deleteUser(id.value);
  } else {
    console.log("Заполните ID!!!");
  }
  form.reset();
  getAllUsers();
}

function deleteUser(id) {
  let deleteUrl = url + id;
  fetch(deleteUrl, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => data.data)
    .then(user => {
      if (user === undefined) {
        console.log(`Пользователь ${id} не найден`);
      } else {
        console.log(`Пользователь ${id} удален`);
      }
    })
    .catch(error => {
      console.error("Error", error);
    });
}

removeUser.addEventListener("click", handleRemoveUser);
