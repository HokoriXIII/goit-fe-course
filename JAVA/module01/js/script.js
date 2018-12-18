"use strict";

/*
  Напишите скрипт имитирующий авторизацию администратора в панели управления.
  
  При загрузке страницы у посетителя запрашивается логин через prompt:
  
    - Если посетитель нажал Cancel — показывать alert с текстом 'Отменено пользователем!'
    - Если было введено что либо другое, что не совпадает со значением константы adminLogin, 
       показывать alert с текстом 'Доступ запрещен, неверный логин!'   
    - Если был введен логин совпадающий со значением константы adminLogin, 
      спрашивать пароль через prompt.
    
  При вводе пароля:
  
      - Если нажали Cancel, показывать alert с текстом 'Отменено пользователем!'
      - Если введен пароль который не совпадает со значением константы adminPassword,
        показывать alert с текстом 'Доступ запрещен, неверный пароль!'        
      - Если введён пароль который совпадает со значением константы adminPassword, 
        показывать alert с текстом 'Добро пожаловать!'
        
  🔔 PS: для удобства и чистоты кода сохраните в переменные сообщения отображаемые в alert
*/

const adminLogin = "admin";
const adminPassword = "m4ngo1zh4ackz0r";
const wrongLogin = "Доступ запрещен, неверный логин!";
const wrongPassword = "Доступ запрещен, неверный пароль!";
const cancelMessage = "Отменено пользователем!";
const welcomeMessage = "Добро пожаловать!";
let promptAdminLogin;
let promptAdminPassword;

promptAdminLogin = prompt("Введите логин:");
// console.log(promptAdminLogin);
if (promptAdminLogin === null) {
  alert(cancelMessage);
} else if (promptAdminLogin === adminLogin) {
  promptAdminPassword = prompt("Введите пароль:");
  // console.log(promptAdminPassword);
  if (promptAdminPassword === null) {
    alert(cancelMessage);
  } else if (promptAdminPassword === adminPassword) {
    alert(welcomeMessage);
  } else {
    alert(wrongPassword);
  }
} else {
  alert(wrongLogin);
}

/*
  ⚠️ ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте скрипт турагенства, продающего поездки в 3-х группах: sharm, hurgada и taba.
  Кол-во мест в группах ограничено (создайте переменные для хранения мест в группах): 
    * sharm - 15
    * hurgada - 25
    * taba - 6.
  Когда пользователь посещает страницу, ему необходимо предложить ввести число необходимых мест,
  результат сохранить в переменную.
  Необходимо проверить являются ли введенные данные целым положительным числом. 
  
    - В случае неверного ввода от пользователя, скрипт показывает alert с текстом 
      "Ошибка ввода" и больше ничего не делает.
    - Если пользователь нажал Cancel, скрипт показывает alert с текстом "Нам очень жаль, приходите еще!".
    - В случае верного ввода, последовательно проверить кол-во мест в группах, 
      и кол-во необходимых мест введенных пользователем.
  Если была найдена группа в которой количество мест больше либо равно необходимому, 
  вывести сообщение через confirm, что есть место в группе такой-то, согласен ли 
  пользоваетель быть в этой группе?
    * Если ответ да, показать alert с текстом 'Приятного путешествия в группе <имя группы>'
    * Если ответ нет, показать alert с текстом 'Нам очень жаль, приходите еще!'
  
  Если мест нигде нет, показать alert с сообщением 'Извините, столько мест нет ни в одной группе!'
*/
let sharmPlaces = 15;
let sharm = "sharm";
let hurgadaPlaces = 25;
let hurgada = "hurgada";
let tabaPlaces = 6;
let taba = "taba";
let group = null;
let message = null;
let promptPlaces = "Введите количество мест:";
let wrongPlaces = "Ошибка ввода";
let cancelPlaces = "Нам очень жаль, приходите еще";
let confirmPlaces = "Приятного путешествия в группе ";
let noPlaces = "Извините, столько мест нет ни в одной группе!";
let placesNumber;

placesNumber = prompt(promptPlaces);
if (placesNumber != Number.parseInt(placesNumber) || Number(placesNumber) < 0) {
  alert(wrongPlaces);
} else {
  let answer;
  if (placesNumber <= tabaPlaces) {
    answer = confirm(
      'Есть места в группе "taba". Вы согласны присоединиться к этой группе?'
    );
    if (answer) {
      group = taba;
    } else if (placesNumber <= sharmPlaces) {
      answer = confirm(
        'Есть места в группе "sharm". Вы согласны присоединиться к этой группе?'
      );
      if (answer) {
        group = sharm;
      } else if (placesNumber <= hurgadaPlaces) {
        answer = confirm(
          'Есть места в группе "hurgada". Вы согласны присоединиться к этой группе?'
        );
        if (answer) {
          group = hurgada;
        }
      }
    }
  } else if (placesNumber <= sharmPlaces) {
    answer = confirm(
      'Есть места в группе "sharm". Вы согласны присоединиться к этой группе?'
    );
    if (answer) {
      group = sharm;
    } else if (placesNumber <= hurgadaPlaces) {
      answer = confirm(
        'Есть места в группе "hurgada". Вы согласны присоединиться к этой группе?'
      );
      if (answer) {
        group = hurgada;
      }
    }
  } else if (placesNumber <= hurgadaPlaces) {
    answer = confirm(
      'Есть места в группе "hurgada". Вы согласны присоединиться к этой группе?'
    );
    if (answer) {
      group = hurgada;
    }
  } else {
    message = noPlaces;
  }
  if (group === null) {
    if (message === null) {
      message = cancelPlaces;
    }
  } else {
    message = confirmPlaces + group;
  }
  alert(message);
}
