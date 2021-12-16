// Check via methods and objects
import performer from '/lib/request.js';

export class Todo {
    static async all(){
        let todos = await performer({
            type: "listAll"
        });
        return todos.map( todoJSON => new Todo(todoJSON))
    }

    constructor(args) {
        this.userId = args.userId;
        this.title = args.title;
        this.completed = args.completed;
        this.id = args.id;
    }

    save = async () => {
        if(this.id)
        return this.update();

        this.create();
    }

    create = async () => {

    }

    update = async () => {
        let response = await performer({
            type: "update",
            payload: {
                id: this.id,
                title: this.title
            }
        });
        return response;
    }
}