/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

const galleryItems = [
  {
    preview: "./img/preview-1.jpg",
    fullview: "./img/full-1.jpg",
    alt: "image-1"
  },
  {
    preview: "./img/preview-2.jpg",
    fullview: "./img/full-2.jpg",
    alt: "image-2"
  },
  {
    preview: "./img/preview-3.jpg",
    fullview: "./img/full-3.jpg",
    alt: "image-3"
  },
  {
    preview: "./img/preview-4.jpg",
    fullview: "./img/full-4.jpg",
    alt: "image-4"
  },
  {
    preview: "./img/preview-5.jpg",
    fullview: "./img/full-5.jpg",
    alt: "image-5"
  },
  {
    preview: "./img/preview-6.jpg",
    fullview: "./img/full-6.jpg",
    alt: "image-6"
  }
];

const createFullviewItem = function(item) {
  const fullview = document.createElement("div");
  fullview.classList.add("fullview");

  const img = document.createElement("img");
  img.setAttribute("src", item.fullview);
  img.setAttribute("alt", item.alt);

  fullview.appendChild(img);
  return fullview;
};

const createPreviewItem = function(item) {
  const preview = document.createElement("li");
  preview.classList.add("preview");

  const img = document.createElement("img");
  img.setAttribute("src", item.preview);
  img.setAttribute("data-fullview", item.fullview);
  img.setAttribute("alt", item.alt);

  preview.appendChild(img);
  return preview;
};

const createPreviewItems = function(items) {
  const previewItems = items.map(item => createPreviewItem(item));
  return previewItems;
};

const addItem = function() {
  const imageGallery = document.querySelector(".image-gallery");
  imageGallery.classList.add("js-image-gallery");

  const fullviewItem = createFullviewItem(galleryItems[0]);
  imageGallery.appendChild(fullviewItem);

  const previewItemsList = document.createElement("ul");
  previewItemsList.classList.add("preview-list");

  createPreviewItems(galleryItems).forEach(element => {
    previewItemsList.appendChild(element);
  });

  const firstItem = previewItemsList.firstElementChild.querySelector("img");
  firstItem.classList.add("active");

  imageGallery.appendChild(previewItemsList);
};

addItem();

const gallery = document.querySelector(".js-image-gallery");
gallery.addEventListener("click", handleNavClick);

function handleNavClick(e) {
  e.preventDefault();
  const target = e.target;
  if (!target.hasAttribute("data-fullview")) return;

  const activeItem = gallery.querySelector("img.active");
  if (activeItem) {
    activeItem.classList.remove("active");
  }
  target.classList.add("active");

  const fullviewImg = gallery.querySelector(".fullview img");
  const attr = target.getAttribute("data-fullview");
  fullviewImg.setAttribute("src", attr);
}
