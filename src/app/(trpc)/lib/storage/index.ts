export default class Storage {
  private __driver: BaseStorageAdapter

  constructor(adapter: BaseStorageAdapter) {
    this.__driver = adapter
  }

  getFolders() {
    return this.__driver.folders()
  }

  getSubfolders(folder: string) {
    return this.__driver.subfolders(folder)
  }

  storePublicly() {}
}
