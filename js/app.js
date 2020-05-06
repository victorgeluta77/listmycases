const todoForm = document.querySelector('#todo-form'),
      addInput = document.querySelector('#add-input'),
      todoList = document.querySelector('#todo-list'),
      todoItems = document.querySelectorAll('.todo-item');
      

function createElement(tag,props, ...children){
    const element = document.createElement(tag);

    Object.keys(props).forEach(key=>element[key]=props[key]);

    if(children.length>0){
        children.forEach(child=>{
            if (typeof child === 'string'){
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
    }
    
    return element;
}



const creatTodoItem = (title)=>{
    // var 1
    const checkbox = createElement('input', {type:'checkbox', className: 'checkbox'});
    const label = createElement('label',{ className: 'title'}, title);
    const editInput = createElement('input',{type:'text',className:'textfield'});
    const editButton = createElement('button',{className:'edit'},'Change');
    const deleteButton = createElement('button',{className:'delete'},'Delete');
    const listItem = createElement('li',{className:'todo-item'},checkbox,label,editInput,editButton,
    deleteButton);

    // var 2
    // const textItem  = `
    // <input class="checkbox" type="checkbox">
    // <label class="title">${title}</label>
    // <input class="textfield" type="text">
    // <button class="edit">Change</button>
    // <button class="delete">Delete</button>
    // `
    // var 2
    // listItem.innerHTML = textItem; 
    
    //var 1
    
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

