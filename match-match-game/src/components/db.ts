export class DataBase {
  public openRequest: IDBOpenDBRequest;

  public db?: IDBDatabase;

  public transaction?: IDBTransaction;

  public users?: IDBObjectStore;

  public rez: DOMException | null;

  constructor() {
    this.openRequest = indexedDB.open('konstantinvl', 2);
    this.openRequest.onupgradeneeded = function (this) {
      const db = this.result;
      if (!db.objectStoreNames.contains('users')) {
        const users = db.createObjectStore('users', { keyPath: 'email' });
        users.createIndex('points_idx', 'points');
      } else {
        db.createObjectStore('users', { keyPath: 'email' }).createIndex('points_idx', 'points');
      }
    };

    this.rez = null;
    this.openRequest.onsuccess = () => this.createTransactions();
  }

  createTransactions(): void {
    this.db = this.openRequest.result;
    this.transaction = this.db.transaction('users', 'readwrite');
    this.users = this.transaction.objectStore('users');
  }

  addUser(email: string, name: string, surname: string): boolean {
    const transaction = this.openRequest.result.transaction('users', 'readwrite');
    const users = transaction.objectStore('users');

    const newUser = {
      email,
      name,
      surname,
    };

    let rez = false;
    const request = users.put(newUser);

    request.onsuccess = function () {
      rez = true;
    };
    request.onerror = function () {
      rez = false;
    };
    return rez;
  }

  getUser(email: string): IDBRequest {
    const transaction = this.openRequest.result.transaction('users', 'readwrite');
    const users = transaction.objectStore('users');
    return users.get(email);
  }
}
