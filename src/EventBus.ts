export class EventBus {

  subscriptions: { [ event: string ]: { subscriber: any, handler: Function }[] } = {}

  on(eventName: string, subscriber: any, handler: Function): void
  on(eventName: string, handler: Function): void

  on(eventName: string, subscriberOrHandler: any, handler?: Function): void {
    let subscriber: any

    if (subscriberOrHandler instanceof Function) {
      subscriber = undefined
      handler = subscriberOrHandler
    }
    else {
      subscriber = subscriberOrHandler
    }

    if (this.subscriptions[eventName] == undefined) {
      this.subscriptions[eventName] = []
    }

    this.subscriptions[eventName].push({
      subscriber: subscriber,
      handler: handler!
    })
  }

  off(subscriber: any): void
  off(handler: Function): void
  off(event: string, subscriber: any): void
  off(event: string, handler: Function): void

  off(arg1: any, arg2?: any): void {
    let event: string|null = null
    let subscriberOrHandler: any = null

    if (typeof arg1 == 'string') {
      event = arg1
      subscriberOrHandler = arg2
    }
    else {
      subscriberOrHandler = arg1
    }

    if (event) {
      for (let i = this.subscriptions[event].length - 1; i >= 0; i--) {
        let subscription = this.subscriptions[event][i]

        if (subscription.subscriber === subscriberOrHandler || subscription.handler === subscriberOrHandler) {
          this.subscriptions[event].splice(i, 1)
        }
      }
    }
    else {
      for (event in this.subscriptions) {
        for (let i = this.subscriptions[event].length - 1; i >= 0; i--) {
          let subscription = this.subscriptions[event][i]
  
          if (subscription.subscriber === subscriberOrHandler || subscription.handler === subscriberOrHandler) {
            this.subscriptions[event].splice(i, 1)
          }
        }
      }  
    }
  }

  emit(eventName: string, ...args: any[]) {
    if (this.subscriptions[eventName] == undefined) {
      return
    }

    for (let subscription of this.subscriptions[eventName]) {
      subscription.handler(...args)
    }
  }
}
