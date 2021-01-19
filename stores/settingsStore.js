import { observable } from "mobx"
import { create, persist } from "mobx-persist"
import AsyncStorage from "@react-native-community/async-storage"

const store = observable({
  language: "en",

  setLanguage(language) {
    this.language = language
  },

  getLanguage() {
    return this.language
  }
})

const schema = {
  language: true
}

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

const settingsStore = persist(schema)(store)

hydrate("settings", settingsStore)

export default settingsStore
