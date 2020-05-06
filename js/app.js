const todoForm = document.querySelector('#todo-form'),
      addInput = document.querySelector('#add-input'),
      todoList = document.querySelector('#todo-list'),
      todoItems = document.querySelectorAll('.todo-item');
      

// function createElement(tag,props, ...children){
//     const element = document.createElement(tag);

//     Object.keys(props).forEach(key=>element[key]=props[key]);
// }



const creatTodoItem = (title)=>{
    // var 1
    // const checkbox = createElement('input', {type:'checkbox', className: 'checkbox'});
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';

    const label = document.createElement('label');
    label.innerText = title;
    label.className = 'title';

    const editInput = document.createElement('input');
    editInput.type='text';
    editInput.className = 'textfield';

    const editButton = document.createElement('button');
    editButton.innerText = 'Change';
    editButton.className = 'edit';
   
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';

    // var 2
    // const textItem  = `
    // <input class="checkbox" type="checkbox">
    // <label class="title">${title}</label>
    // <input class="textfield" type="text">
    // <button class="edit">Change</button>
    // <button class="delete">Delete</button>
    // `

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    // var 2
    // listItem.innerHTML = textItem; 
    
    //var 1
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    bindEvents(listItem);

    return listItem;

}

const bindEvents = (todoItem)=>{
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('.edit');
    const deleteButton = todoItem.querySelector('.delete');

    checkbox.addEventListener('change',toggleTodoItem);
    editButton.addEventListener('click',editTodoItem);
    deleteButton.addEventListener('click',deleteTodoItem);
}

const addTodoItem = (event)=>{
    event.preventDefault(); // stop load of the page
    if (addInput.value === '')return alert('Input name of the task !!!');
    const todoItem = creatTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';
}

const toggleTodoItem = ({target})=>{
    const listItem = target.parentNode;
    listItem.classList.toggle('completed');
    
}

const editTodoItem = ({target})=>{
    const listItem = target.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing){
        title.innerHTML = editInput.value;
        target.innerText = 'Change';
    } else {
        editInput.value = title.innerText;
        target.innerText = 'Save';
    }

    listItem.classList.toggle('editing');
}

 const deleteTodoItem = ({target})=>{

    const listItem = target.parentNode;
    todoList.removeChild(listItem);

}

const main = ()=>{
    todoForm.addEventListener('submit',addTodoItem);
    todoItems.forEach(item=>bindEvents(item));
}

main();      

