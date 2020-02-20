import { Act } from '../src/act.js';

const vm = {
    name: 'Ayman Moukhtar',
    age: 12
};

Act({
    selector: 'index',
    vm
});