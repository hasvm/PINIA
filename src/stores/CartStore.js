import { groupBy } from "lodash";
import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {

    state: () => {
        return {
            items: [],
        };
    },

    getters: {
        count() {
            return this.items.length;
        },
        isEmpty() {
            return this.count === 0;
        },

        grouped: state => {
            const grouped = groupBy(state.items, item => item.name);

            const sorted = Object.keys(grouped).sort();

            let inOrder = {}

            sorted.forEach(key => inOrder[key] = grouped[key]);

            return inOrder;
        },
        
        groupCount: state => (name) => state.grouped[name].length,

        total: state => state.items.reduce((p,c) => p + c.price, 0),
    },

    actions: {
        addItems(count, product) {
            count = parseInt(count);
          
            for(let index = 0; index < count; index++) {
              this.items.push({ ...product });
            }
          },

          clearItem(itemName) {
                this.items = this.items.filter(item => item.name !== itemName);
          },

          setItemCount(item, count) {

              this.clearItem(item.name);

              this.addItems(count, item);
          }
    },
});