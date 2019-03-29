/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-1.com"
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-2.com"
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-3.com"
  }
];

const createPostCard = function(post) {
  const item = document.createElement("div");
  item.classList.add("post");

  const item_img = document.createElement("img");
  item_img.classList.add("post__image");
  item_img.setAttribute("src", post.img);
  item_img.setAttribute("alt", "post image");

  const item_body = document.createElement("div");
  item_body.classList.add("post__body");

  const item_title = document.createElement("h2");
  item_title.classList.add("post__title");
  item_title.textContent = post.title;

  const item_text = document.createElement("p");
  item_text.classList.add("post__description");
  item_text.textContent = post.text;

  const item_link = document.createElement("a");
  item_link.classList.add("button");
  item_link.textContent = post.link;

  item_body.append(item_title, item_text, item_link);

  item.append(item_img, item_body);
  // console.log(item);

  return item;
};

const createPostCards = function(posts) {
  const postCards = posts.map(post => createPostCard(post));
  // console.log(postCards);
  return postCards;
};

createPostCards(posts);

const addCards = function() {
  const mainPost = document.querySelector(".main_post");
  const postList = document.createElement("div");
  postList.classList.add("post_list");

  createPostCards(posts).forEach(element => {
    postList.appendChild(element);
  });

  mainPost.prepend(postList);
};

addCards();
