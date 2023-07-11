import EventLayer from './EventLayer'
import fixType from './fixType'

class BaseComponent extends EventLayer {
    constructor() {
        super()
        this.node = null
        this.elem = null
        this.name = null
        this.options = {}
    }

    _acceptElem(el, name) {
        this.node = el
        this.elem = el
        this.name = name

        // add options to the object
        // based off the pattern data-${name}-ANYTHING="value"
        this._setOptions()
    }

    _setOptions() {
        // Get options from data attributes on node
        const regex = new RegExp('^data-' + this.name + '-(.*)', 'i')

        // for ease of use change the attributes length into an empty array
        const attrCount = new Array(this.elem.attributes.length).fill(0)

        // using regex add each of the values of the data attr to the options object
        attrCount.forEach((_, index) => {
            const attr = this.elem.attributes[index]
            const matches = regex.exec(attr.nodeName)

            // if there is second value with the same key, remove it
            if (matches != null && matches.length >= 2) {
                if (this.options[matches[1]]) {
                    console.warn(
                        `Duplicate value matched: ${matches[1]} please do not duplicate options in component`
                    )
                }
                this.options[matches[1]] = fixType(attr.value)
            }
        })

        // options should now be filled - but we can massage the data to be more dev friendly
        console.log(this.options)
    }

    dispatchDestroy() {
        this.dispatch('destroy')
    }
}

export default BaseComponent
