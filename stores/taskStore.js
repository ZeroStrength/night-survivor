import { observable } from "mobx"
import { create, persist } from "mobx-persist"
import AsyncStorage from "@react-native-community/async-storage"

const store = observable({
  tasks: [],

  addTask(task) {
    this.tasks.push(task)
  },

  removeAll() {
    this.tasks = []
  }
})

const schema = {
  tasks: {
    type: "list"
  }
}

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

const taskStore = persist(schema)(store)

hydrate("tasks", taskStore)

export default taskStore
