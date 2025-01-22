import { EventEmitter } from "events";

class EventEmitterStore {
  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(100); // Increase max listeners
  }

  static getInstance() {
    if (!EventEmitterStore.instance) {
      EventEmitterStore.instance = new EventEmitterStore();
    }
    return EventEmitterStore.instance;
  }

  getEmitter() {
    return this.emitter;
  }
}

export const eventEmitterStore = EventEmitterStore.getInstance();
