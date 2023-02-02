let news=[];
let menus=document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener(
    "click", (event)=>getNewsByTopic(event) ));


let searchButton=document.getElementById("search-btn");


const proxyUrl = "http://cors-anywhere.herokuapp.com/"

const getLatestNews=async()=>{
    let url=new URL(
        `${proxyUrl}`+
        'newsapi.org/v2/everything?'+
        'q=apple&'+
        'from=2023-01-31&'+
        'to=2023-01-31&'+
        'sortBy=popularity'   
    );
    console.log(url)
    let header= new Headers({
        "X-Api-Key":"ba967e437be941219219f25e6aef23fb",
    });
    let response = await fetch(url, {headers:header});//DATA SEND : ajax,http,fetch
    let data = await response.json();//response응답객체로 부터 json data 추출
    news=data.articles;
    console.log(news);
    render()
};

const getNewsByTopic=async(event)=>{
    console.log("click-success",event.target.textContent);
    let category=event.target.textContent.toLowerCase();
    let url= new URL(
        `${proxyUrl}`+
        `newsapi.org/v2/top-headlines?country=us&category=${category}`
        )
    console.log(url);    
    let header= new Headers({
        "X-Api-Key":"ba967e437be941219219f25e6aef23fb",
    });
    let response = await fetch(url, {headers:header});//DATA SEND : ajax,http,fetch
    let data = await response.json();//response응답객체로 부터 json data 추출
    news=data.articles;
    console.log(news);
    render();
}

const getNewsByKeyWord=async(event)=>{
    let keyWord=document.getElementById("search-input").value;
    console.log("findword- ",keyWord);
    //let word=event.target.textContent.toLowerCase();

    let url=new URL(
        `${proxyUrl}`+
        `newsapi.org/v2/everything?q=${keyWord}`
    )
    console.log(url);
    let header=new Headers({
        "X-Api-Key":"ba967e437be941219219f25e6aef23fb",
    });
    let response=await fetch(url, {headers:header});
    let data=await response.json();
    news=data.articles;
    console.log(news);
    render();
}
const render=()=>{
    let newsHTML="";
    newsHTML=  news.map((item)=>{
      return `<div class="row news">
      <div class="col-lg-4">
        <img class="news-img-size" 
          src="${item.urlToImage ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}"/>  
      </div>
      <div class="col-lg-8">
          <h2>${item.title}</h2>
          <p>
          ${
              item.content == null || item.content == "" 
              ? "내용없음": item.content.length > 200 
              ? item.content.substring(0, 200) + "..."
              : item.content
          }</p>  
          <div>${item.author==null || item.author==""? "no source": item.author} &nbsp; ${item.publishedAt}</div>
      </div>
    </div>`;
    }).join(" ");
    console.log(newsHTML);
    document.getElementById("news-board").innerHTML=newsHTML;
};

searchButton.addEventListener("click", getNewsByKeyWord);
getLatestNews();