const activeComponents = new Map()
const debugComponents = []

export const manageComponents = (components) => {
    const componentElements = getComponents(document)

    componentElements.map((elem, index) => {
        const componentNameReference = elem.getAttribute('data-component')

        // if component reference if not found within our collection of exported components warn the console
        const ComponentReference = components[componentNameReference]
        if (!ComponentReference) {
            noExistingComponentMessage(componentNameReference)
            return
        } else {
            const activeComponent = new ComponentReference(elem)

            // add a elem reference to the base
            activeComponent._acceptElem(elem, componentNameReference)
            if (activeComponent.init) {
                activeComponent.init()
            }

            activeComponents.set(elem, activeComponent)
        }
    })

    window.debugComponents = debugComponents
}

// export const destroyComponents = (container) => {
//     const componentElements = getComponents(container)
//     componentElements.map((elem) => {
//         const ComponentReference = activeComponents.get(elem)
//         ComponentReference.dispatch('destroy')
//     })
// }

const getComponents = (container) => [
    ...container.querySelectorAll(`[data-component]`),
]

// any long messages to not clutter the business logic above
const noExistingComponentMessage = (name) => {
    return console.warn(
        `There is no reference to component file with class name "${name}" \n Check if this class exists and in components/index.js. remember, components are case sensitive!`
    )
}

export default manageComponents
