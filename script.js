const NewsApi = '4ce744cc05a84e5d83db6875cf389449'

const blogContainer = document.getElementById('blog-container');


const searchField = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')



async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${NewsApi}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data)
        return data.articles;

    } catch (error) {
        console.error("Error fetching",error)
        return []
    }
}

searchBtn.addEventListener('click', async ()=>{
    const input = searchField.value.trim()
    if(input !== ""){
        try {
            const articles = await fetchNewsQuery(input);
            displayBlog(articles)
        } catch (error) {
            console.log("Error fetching news by query",error)
        }
    }
})


async function fetchNewsQuery(input){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${input}
        &pageSize=10&apikey=${NewsApi}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data)
        return data.articles;

    } catch (error) {
        console.error("Error fetching",error)
        return []
    }
}

function displayBlog(articles){
    blogContainer.innerHTML = " "
    articles.forEach((article) => {
        const blogCard = document.createElement('div')
        blogCard.classList.add("blog-card")
        const img = document.createElement('img')
        img.src = article.urlToImage
        img.alt  = article.title
        const title  = document.createElement('h2')
        // title.textContent = article.title
        const truncatedTitle = article.title.length > 30? article.title.slice(0,30) + "....": article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement('p')
        // description.textContent = article.description
        const truncatedDes = article.description.length > 70? article.description.slice(0,70) + "....": article.description;
        description.textContent = truncatedDes;


        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener('click',() =>{
            window.open(article.url,"_blank")
        } )

        blogContainer.appendChild(blogCard)
    });
}

// fetchRandomNews()

(async ()=>{
    try {
        const articles = await fetchRandomNews();
        // console.log(articles)
        displayBlog(articles)
    } catch (error) {
        console.error("error",error);
    }
})();


