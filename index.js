console.log('ss')
function showBooks(){
    let books=localStorage.getItem('books');
    if(books==null){
        bookObj=[]
    }
    else{
        bookObj=JSON.parse(books)
    }
    var html=""
    bookObj.forEach(function(element,index) {

        html+=`<tr>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type.toUpperCase()}</td>
                            <td><button id="${index}" onclick="delBook(this.id)" class="delBtn">Delete</button></td>
                            
                        </tr>`;
                    });
    let tableBody=document.getElementById('tableBody');
    if(bookObj.length!=0){
    tableBody.innerHTML+=html;
    }
    else{
        tableBody.innerHTML="Nothing To Show"
    }
}
showBooks();
//Construcor

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
//Display Constructor
function Display() {

}
function delBook(index){
    // let books=localStorage.getItem('books');
    // if(books==null){
    //     bookObj=[];
    // }
    // else{
    //     bookObj=JSON.parse(books);
    // }
    // bookObj.splice(index,1);
    // localStorage.setItem('books',JSON.stringify(bookObj));
    showBooks();
    console.log(index);
}

//Methods to display prototype
// Display.prototype.add=function(book){
//     let books=localStorage.getItem('books');
//     if(books==null){
//         bookObj=[]
//     }
//     else{
//         bookObj=JSON.parse(books)
//     }
//     // let html=""
//     bookObj.forEach(function(element) {

//         html+=`<tr>
//                             <td>${element.name}</td>
//                             <td>${element.author}</td>
//                             <td>${element.type.toUpperCase()}</td>
//                             <td><button>Delete</button></td>
//                         </tr>`;
//                     });
//     let tableBody=document.getElementById('tableBody');
//     if(bookObj.length!=0){
//     tableBody.innerHTML+=html;
//     }
//     else{
//         tableBody.innerHTML="nothing to show";
//     }
    
//   }
Display.prototype.clear=function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}
Display.prototype.validate=function(book){
if(book.name.length<2||book.author.length<2){
    return false;
}
else {
    let books=localStorage.getItem('books');
    if(books==null){
        bookObj=[]
    }
    else{
        bookObj=JSON.parse(books)
    }
    bookObj.push(book);
    localStorage.setItem('books',JSON.stringify(bookObj))
    return true;
}
}
Display.prototype.show=function(type,displayMessage){
    
    let message=document.getElementById('message');
    message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message:</strong> ${displayMessage}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
  setTimeout(()=>{
    message.innerHTML="";
  },2000);
}


//Submit event listener
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    // e.preventDefault();
    console.log("submited");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    console.log(book);
    let display= new Display();
    if(display.validate(book)){
        // display.add(book);
        display.clear();
        display.show('success','Your Book has been added')
        showBooks();
    }
    else{
        display.show("danger","Sorry! You cannot add this book.")
    }
}
