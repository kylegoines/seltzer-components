import BaseComponent from './core/BaseComponent'

class test extends BaseComponent {
    triggerThing() {
        this.toggle = false
    }

    anotherThing() {
        console.log(this.toggle)
    }
    init() {
        this.toggle = true
        this.triggerThing()
        this.anotherThing()
    }
}
export default test
