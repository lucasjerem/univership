

// récupération des articles
fetch(`https://univership.herokuapp.com/public/all`, {
  method: "GET"
})
  .then(r => r.json())
  .then(data => {
    data.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
    let array = [];
    for (let i = 0; i < data.length; i++) {
      if (i < 4) {
        array.push(data[i]);
        createContent(data[i]);
      } 
    }
    frontContent(array);
  })


//Création de la liste d'articles
function createContent(data) {
  let link = document.createElement('a');
  let article = document.createElement('article');
    let div1 = document.createElement('div');
        let img = document.createElement('img');
    let div2 = document.createElement('div');
        let content = document.createElement('p');
        let div3 = document.createElement('div');
            let title = document.createElement('h2');
            let date = document.createElement('b');



  //lien vers l'article selon l'id
  link.href = `article.html?id=${data.id}`;
  if (data.img != ''){
    img.src = data.img;
  }
  else {
    img.src = '../image/news/news1.png';
  }
  title.innerHTML = data.title;
  let categ = getCategory(data.category);
  date.innerHTML = data.date + " - " + categ;
  if (data.content.includes('<img')){
    let contentful = data.content.replace(/<img([^>]*)>/gi, "")
    content.innerHTML = contentful
  } else {
    content.innerHTML = data.content;
  }
  

  div1.appendChild(img);
  article.appendChild(div1);
  div3.appendChild(title);
  div3.appendChild(date);
  div2.appendChild(div3);
  div2.appendChild(content);
  article.appendChild(div2);
  link.appendChild(article);

  document.querySelector('#list').appendChild(link);
}



function frontContent(array) {
    let link =  document.querySelectorAll('.front-link');
    let img =  document.querySelectorAll('.front-img');
    let title = document.querySelectorAll('.front-title');
    let content = document.querySelectorAll('.front-content');
    for (let i = 0; i < array.length; i++){
        link[i].href = `article.html?id=${array[i].id}`;
        img[i].src = array[i].img;
        if (!img[i].src) {
          img[i].src = 'https://univership.netlify.app/image/news/news1.png';
        }
        title[i].innerHTML = array[i].title;
        content[i].innerHTML = array[i].content;
    }    
}


function getCategory(data) {
  switch (data) {
    case 'maj':
      return 'Mise à Jour';
    case 'encours':
      return 'En cours de développement';
    case 'news':
      return 'News';
    case 'maintenance':
      return 'Maintenance';
    default:
      return 'Mise à Jour';
  }
}

function displayCategory(cat){
    // récupération des articles
    fetch(`https://univership.herokuapp.com/public/${cat}`, {
      method: "GET"
    })
    .then(r => r.json())
    .then(data => {
      data.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
      document.querySelector('#list').innerHTML = "";
      if (data.length === 0) document.querySelector('#list').innerHTML = "Aucun article dans cette catégorie";
      for (let i = 0; i < data.length; i++) {
          createContent(data[i]);
      }
    })
    document.querySelector('#more').style.display = "none";
}


document.querySelector('#more').addEventListener('click', ()=>{
  displayCategory('all');
});


// Sorting buttons
document.querySelector('#full').addEventListener('click', ()=>{
  displayCategory('all');
});



document.querySelector('#news').addEventListener('click', async ()=>{
  displayCategory('news');
});

document.querySelector('#maj').addEventListener('click', ()=>{
  displayCategory('maj');
});

document.querySelector('#support').addEventListener('click', ()=>{
  displayCategory('maintenance');
});

document.querySelector('#dev').addEventListener('click', ()=>{
  displayCategory('encours');
});
