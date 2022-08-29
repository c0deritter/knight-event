import { expect } from 'chai'
import 'mocha'
import { EventBus } from '../src'

describe('EventBus', function () {
  describe('on', function() {
    it('should call a handler', function() {
      let bus = new EventBus

      let handler1Called = false
      let handler2Called = false
      let handler3Called = false
      
      let handler1 = () => {
        handler1Called = true
      }

      let handler2 = () => {
        handler2Called = true
      }

      let handler3 = () => {
        handler3Called = true
      }

      bus.on('event1', handler1)
      bus.on('event1', handler2)
      bus.on('event2', handler3)
      
      bus.emit('event1')

      expect(handler1Called).to.be.true
      expect(handler2Called).to.be.true
      expect(handler3Called).to.be.false
    })

    it('should call a handler which was additionally given a subscriber', function() {
      let bus = new EventBus

      let handler1Called = false
      let handler2Called = false
      let handler3Called = false
      
      let handler1 = () => {
        handler1Called = true
      }

      let handler2 = () => {
        handler2Called = true
      }

      let handler3 = () => {
        handler3Called = true
      }

      let subscriber1 = {}
      let subscriber2 = {}
      let subscriber3 = {}

      bus.on('event1', subscriber1, handler1)
      bus.on('event1', subscriber2, handler2)
      bus.on('event2', subscriber3, handler3)
      
      bus.emit('event1')

      expect(handler1Called).to.be.true
      expect(handler2Called).to.be.true
      expect(handler3Called).to.be.false
    })

    it('should forward parameter to the handler', function() {
      let bus = new EventBus

      let handlerCalled = false
      
      let handler = (arg1: number, arg2: string) => {
        expect(arg1).to.equal(1)
        expect(arg2).to.equal('a')
        handlerCalled = true
      }

      bus.on('event', handler)
      bus.emit('event', 1, 'a')

      expect(handlerCalled).to.be.true
    })

    it('should unregister a handler', function() {
      let bus = new EventBus

      let handler1Called = false
      let handler2Called = false
      
      let handler1 = () => {
        handler1Called = true
      }

      let handler2 = () => {
        handler2Called = true
      }

      bus.on('event1', handler1)
      bus.on('event1', handler2)
      bus.on('event2', handler1)

      bus.off(handler1)
      bus.emit('event1')

      expect(handler1Called).to.be.false
      expect(handler2Called).to.be.true

      handler1Called = false
      handler2Called = false

      bus.emit('event2')

      expect(handler1Called).to.be.false
      expect(handler2Called).to.be.false
    })

    it('should unregister a subscriber', function() {
      let bus = new EventBus

      let handler1Called = false
      let handler2Called = false
      let handler3Called = false
      
      let handler1 = () => {
        handler1Called = true
      }

      let handler2 = () => {
        handler2Called = true
      }

      let handler3 = () => {
        handler3Called = true
      }

      let subscriber1 = {}
      let subscriber2 = {}

      bus.on('event1', subscriber1, handler1)
      bus.on('event1', subscriber2, handler2)
      bus.on('event2', subscriber1, handler3)

      bus.off(subscriber1)
      bus.emit('event1')

      expect(handler1Called).to.be.false
      expect(handler2Called).to.be.true
      expect(handler3Called).to.be.false

      handler1Called = false
      handler2Called = false
      handler3Called = false

      bus.emit('event2')

      expect(handler1Called).to.be.false
      expect(handler2Called).to.be.false
      expect(handler3Called).to.be.false
    })

    it('should unregister an handler regarding an event', function() {
      let bus = new EventBus

      let handler1Called = false
      let handler2Called = false
      
      let handler1 = () => {
        handler1Called = true
      }

      let handler2 = () => {
        handler2Called = true
      }

      bus.on('event1', handler1)
      bus.on('event1', handler2)
      bus.on('event2', handler1)

      bus.off('event1', handler1)
      bus.emit('event1')

      expect(handler1Called).to.be.false
      expect(handler2Called).to.be.true

      handler1Called = false
      handler2Called = false

      bus.emit('event2')

      expect(handler1Called).to.be.true
      expect(handler2Called).to.be.false
    })

    it('should unregister a subscriber regarding an event', function() {
      let bus = new EventBus

      let handler1Called = false
      let handler2Called = false
      let handler3Called = false
      
      let handler1 = () => {
        handler1Called = true
      }

      let handler2 = () => {
        handler2Called = true
      }

      let handler3 = () => {
        handler3Called = true
      }

      let subscriber1 = {}

      bus.on('event1', subscriber1, handler1)
      bus.on('event1', subscriber1, handler2)
      bus.on('event2', subscriber1, handler3)

      bus.off('event1', subscriber1)
      bus.emit('event1')

      expect(handler1Called).to.be.false
      expect(handler2Called).to.be.false
      expect(handler3Called).to.be.false

      handler1Called = false
      handler2Called = false
      handler3Called = false

      bus.emit('event2')

      expect(handler1Called).to.be.false
      expect(handler2Called).to.be.false
      expect(handler3Called).to.be.true
    })
  })
})
