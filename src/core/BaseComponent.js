import fixType from './fixType'

class BaseComponent {
    constructor() {
        this.name = null
        this.elem = null
        this.node = null
        this.options = {}

        this.abortController = new AbortController()
    }

    _acceptElem(elem, name) {
        // during hydration, several values are populated
        this.name = name

        this.elem = elem
        this.node = elem // alias for elem :)

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
        // console.log(this.options)
    }

    ////////////////////////////////////////////////////////////////
    // HELPER FUNCTIONS
    ////////////////////////////////////////////////////////////////
    // these functions are to be used by the user
    // TODO: add formal documentation

    // this is a safe way to remove all events on a destory method - not exactlyt what you might want for all cases
    // but useful for a full component breakdown if you manage your events here
    addEvent(eventTarget, event, handler) {
        eventTarget.addEventListener(event, handler, {
            signal: this.abortController.signal,
        })
    }

    // this is the safe way to breakdown all events setup with this.addEvent()
    destroyEvents() {
        this.abortController.abort()
    }

    // a facade pattern to query to get a single data-COMPONENT_NAME-child element within a component scope
    getChild(child) {
        return this.elem.querySelector(`[data-${this.name}-${child}]`)
    }

    // a facade pattern to query to get a collection of data-COMPONENT_NAME-child elements within a component scope
    getChildren(children) {
        return [
            ...this.elem.querySelectorAll(`[data-${this.name}-${children}]`),
        ]
    }
}

export default BaseComponent
