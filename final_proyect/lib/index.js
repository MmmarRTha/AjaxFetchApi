// Control DOM
import { Todo } from '/lib/Todo.js';

window.addEventListener("load", (ev) => {
    let container = document.querySelector("#root ul");

    document.querySelector("#mainForm").addEventListener("submit", (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const textarea = form.querySelector("textarea");
        const button = form.querySelector("[type='submit']");
        button.disabled = true;

        let todo = new Todo({title: textarea.value});

        todo.save().then(() => {
            textarea.value = "";
            button.disabled = false;

            let li = buildDOMElement(todo);
            container.prepend(li);
        });

        return false;
    })
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
            <button class="close">X</button>
        `;

        li.querySelector(".close").addEventListener("click",(ev) => {
            todo.destroy();
            li.remove();
        })
        editInPlace(li.querySelector("h1"), todo);
        return li;
    }

    let editInPlace = (node, todo) => {
        node.addEventListener("click", (ev) => {
            // Replace node for a text field
            let inputText = document.createElement("textarea");
            inputText.value = node.innerHTML;
            inputText.autofocus = true;

            node.replaceWith(inputText);

            inputText.addEventListener("change", (ev) => {
                inputText.replaceWith(node);
                todo.title = inputText.value;

                node.innerHTML = todo.title;
                todo.save().then(r => console.log(r));
            })


            // Finish update: replace text field for a node again

        })
    }
})