export default class EventSource {
  constructor() {
    this.listeners = [];
  }

  on(listener) {
    this.listeners.push(listener);
    return ()=>this.off(listener);
  }

  off(listener) {
    let index;
    while((index = this.listeners.indexOf(listener)) !== -1){
      this.listeners.splice(index, 1);
    }
  }

  dispatch(...args) {
    this.listeners.forEach(listener => listener(...args));
  }
}