
//VARIABLES
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');
const todoSelect = document.querySelector('.select');

let localStorageTodos;

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('change', filterTodo);

//FUNCTIONS

function addTodo(event)
{
    //Prevent form from submitting
    event.preventDefault();

    createListItem(todoInput.value);

    //Clear todoInput
    todoInput.value = "";
}

function createListItem(input){
        //Create Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo', 'd-inline-flex', 'justify-content-between', 'my-2', 'w-90');
    
        //Create List Item
        const newTodo = document.createElement('li');
        newTodo.innerText = input;
        newTodo.classList.add('todo-item', 'list-group-item', 'py-2', 'flex-grow-1');
        todoDiv.appendChild(newTodo);
    
        //Add to local storage
        saveToLocalStorage(todoInput.value);
    
        //Completed Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn', 'btn', 'btn-success', 'mx-2');
        completedButton.tabIndex = '-1'
        todoDiv.appendChild(completedButton);
    
        //Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn', 'btn', 'btn-danger');
        deleteButton.tabIndex = '-1';
        todoDiv.appendChild(deleteButton);

        //Append to list
        todoList.appendChild(todoDiv);
}


function deleteCheck(event)
{
    event.preventDefault();
    const item = event.target
    const listItem = item.parentElement;

    if(item.classList.contains('delete-btn'))
    {
        listItem.classList.add('fall');
        removeFromeLocalStorage(listItem);
        setTimeout(function(){listItem.remove();}, 300);
    }

    if(item.classList.contains('complete-btn'))
    {
        listItem.children[0].classList.toggle('list-group-item-secondary');
        listItem.children[0].classList.toggle('completed');
    }
}


function filterTodo(event){
    const todos = todoList.childNodes;

    todos.forEach(function(todo){
        switch(event.target.value){
            case 'all':
                todo.classList.remove('d-none');
                todo.classList.add('d-inline-flex');
                break;

            case 'completed':
                if(todo.children[0].classList.contains('completed')){
                    todo.classList.remove('d-none');
                    todo.classList.add('d-inline-flex');
                }
                else{
                    todo.classList.remove('d-inline-flex');
                    todo.classList.add('d-none');
                }
                break;

            case 'uncompleted':
                if(!todo.children[0].classList.contains('completed')){
                    todo.classList.remove('d-none');
                    todo.classList.add('d-inline-flex');
                }
                else{
                    todo.classList.remove('d-inline-flex');
                    todo.classList.add('d-none');
                }
                break;
        }
    });
}

function accessLocalStorage()
{        

        //If it doesn't exist create new array else parse todos back to an array
        if(localStorage.getItem('localStorageTodos') === null){
            localStorageTodos = [];
        }
        else{
            localStorageTodos = JSON.parse(localStorage.getItem('localStorageTodos'));
        }
}


function getTodos()
{
        accessLocalStorage()
 
        //Very Similar to addTodo() but adds already existing todos from local storage
        localStorageTodos.forEach(function(todo){
            createListItem(todo);
        })
}


function saveToLocalStorage(todo)
{
    accessLocalStorage()

    //add todo to todos array
    localStorageTodos.push(todo);

    //Returning todos to local storage
    localStorage.setItem('localStorageTodos', JSON.stringify(localStorageTodos));
}

function removeFromeLocalStorage(todo)
{
    accessLocalStorage()

    const todoIndex = todo.children[0].innerText;

    localStorageTodos.splice(localStorageTodos.indexOf(todoIndex), 1);

    localStorage.setItem('localStorageTodos', JSON.stringify(localStorageTodos));
}
