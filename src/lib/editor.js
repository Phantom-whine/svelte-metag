import { writable } from "svelte/store";

function customStore() {
    const store = writable({
        tempText: '',
    });

    return {
        subscribe: store.subscribe,
        setTemp: (text) => {
            store.update(state => ({
                ...state,
                tempText: text,
            }));
            console.log(text)
        },
        delTemp: () => {
            store.update(state => ({
                ...state,
                tempText: '',
            }));
        }
    };
}

export const tempStore = customStore();
