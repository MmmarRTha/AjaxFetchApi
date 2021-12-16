// Control DOM
import { Todo } from '/lib/Todo.js';

window.addEventListener("load", (ev) => {
    let container = document.querySelector("#root ul");
    // Todo.all => return all web service's todos
    Todo.all().then(todos => {
        //  Iterate all todos
        todos.forEach(todo => {
            // Make a node in DOM with buildDOMElement
            let node = buildDOMElement(todo);
            // Insert node in container
            container.prepend(node); 
        });

    });
    
    let buildDOMElement = (todo) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <h1>${todo.title}</h1>
        `;
        return li;
    }
})