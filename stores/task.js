import { observable, action } from "mobx";
import { persist } from "mobx-persist";

export class TaskStore {
  @persist @observable tasks = [];

  @action addTask(task) {
    this.tasks.push(task);
  }
}

// class Item {
//   @persist @observable info = "";
// }

// export class MapStore {
//   @persist("map", Item) @observable items = observable.map({});
//   @action test(key = "test") {
//     console.warn(this.items.keys().join("."));
//     this.items.set(key, new Item());
//   }
// }

// export class ListStore {
//   @persist("list") @observable list = [];
//   @action test(text = `${Date.now()}`) {
//     this.list.push({ text });
//   }
// }
