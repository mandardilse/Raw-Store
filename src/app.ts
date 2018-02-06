//import * as fromStore from './store';
import * as fromAction from './store/actions';
import * as fromStore from './store/store';
import * as fromReducer from './store/reducers';
import { renderTodos } from './utils';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

//Set initial value to store 
const reducers = { todos: fromReducer.reducer }
//Set store values
const store = new fromStore.Store(reducers);

button.addEventListener('click', () => {
    if (!input.value.trim()) return;
    const payload = { label: input.value, complete: false };
    store.dispatch(new fromAction.AddTodo(payload));
    //console.log(store.value);
    input.value = '';
}, false);

const unsubscribe = store.subscribe(state => {
    renderTodos(state.todos.data);
});

destroy.addEventListener('click', this.unsubscribe, false);

todoList.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.nodeName.toLowerCase() === 'button') {
        const payload = JSON.parse(target.getAttribute('data-todo') as any);
        store.dispatch(new fromAction.RemoveTodo(payload));
    }
});

store.subscribe(state => console.log('STATE :::', state));
