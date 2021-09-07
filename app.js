const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    if (searchText == '') {
        alert('Please write a book name');
        return;
    }

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const getData = data.docs;
            const firstData = getData.slice(0, 1);
            console.log(firstData);
            displaySearchBook(firstData)
        })
        .catch(err => console.log(err))
}

const displaySearchBook = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (books.length == 0) {
        const msgShower = document.getElementById('error-msg');
        msgShower.innerHTML = 'No result found.';
        return;
    }

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
            <div  class="card h-100">
            <img src="${loadBookDetail(book.cover_i)}" class="card-img-top " alt="book img" style="height: 300px; width:80%; margin: 2em auto">
                <div class="card-body">
                    <h5 class="card-title"><b>Book Name:</b> ${book.title}</h5>
                    <h5 class="card-title"><b>Author Name:</b> ${book.author_name[0]}</h5>
                    <h5 class="card-title"><b>First Publisher Name:</b> ${book.publisher[0]}</h5>
                    <h5 class="card-title"><b>First Published Date:</b> ${book.first_publish_year}</h5>                  
                </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });

}

const loadBookDetail = bookId => {
    const url = `https://covers.openlibrary.org/b/id/${bookId}-M.jpg`;
    return url;
}