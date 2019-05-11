
/*
  Возьмите домашнее задание №12 и перепишите его ипользуя паттерн MVC.
  
  Вынесите отдельно логику, отдельно представление и реакцию на действия пользователя. 
  Model, View и Controller вынести в отдельные файлы и сделать классами.
  
  Используйте ES6 модули и Webpack для сборки.
  
  Использование будет выглядеть следующим образом.
*/

import Model from './js/model';
import View from './js/veiw';
import Controller from './js/controller';



const model = new Model();
const view = new View();

new Controller(model, view);

