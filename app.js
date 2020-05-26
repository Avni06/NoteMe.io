console.log('Welcome To NoteMe.io');
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click",function(e){

  let addTxt = document.getElementById("addTxt");
  let com= document.getElementById("com");
  let title=document.getElementById("title");

  const obj= {
    txt:addTxt.value,
    com:com.value,
    tit:title.value
  }

let notes = localStorage.getItem("notes");

  if (notes == null){
    notesObj = [];
  }
  else{
    notesObj = JSON.parse(notes);
  }

  notesObj.push(obj);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  addTxt.value = "";
  com.value="";
  title.value="";
  //console.log(notesObj);
  showNotes();
})
//function to show elements from local storage
function showNotes(){
  let notes = localStorage.getItem("notes");
  if (notes == null){
    notesObj = [];
  }
  else{
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index, comment, title) {
    html +=
    `<div class="noteCard card my-2 mx-2" style="color: black; width: 18rem;" >
      <div class="card-body">
        <h6 class="card-title">Note ${index + 1}</h6>
        <h5 class="card-title" style="color:red; text-align:left"><ul>${element.tit}</ul></h5>
        <p class="card-text">${element.txt}</p>
        <h6 class="card-subtitle mb-2 text-muted">Comment:${element.com}</h6>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-dark" id="delBtn">Delete Note</button>
      </div>
    </div>`;

  })
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0){
    notesElm.innerHTML = html;
  }
  else {
    notesElm.innerHTML = `No notes yet! Use the "Add Note" section above to write your freshest thoughts :)`
  }
}

//function to delete a
function deleteNote(index) {
  //console.log('DELETING', index);

  let notes = localStorage.getItem("notes");
  if (notes == null){
    notesObj = [];
  }
  else{
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  showNotes()
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function (e) {
  let inputVal = search.value.toLowerCase();
  //console.log('Input event fired into console!',inputVal);
  let allNoteCards = document.getElementsByClassName('noteCard');
  Array.from(allNoteCards).forEach(function (element) {
    var cardTxt = element.getElementsByClassName('card-body')[0].innerText;
    // let cardTxt = element.getElementByTagName('div')[0];
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block"
    }
    else {
      element.style.display = "none"
    }
  })
})
