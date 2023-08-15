# Seltzer Components

Design system thinking to vanilla javascript. Componentize and scope your javascript.

## Mission Statement

Not all projects right for react, vue, or [insert new framework].
Seltzer Components aims to systematize your interactive components across projects

## Getting Started

There are two steps to using Seltzer components.

-   The component(s) themselves
-   The hydration loop to initalize the components

### The Seltzer Component

Seltzer components are javascript class based that extend the `BaseComponent` class from the seltzer-components module. Heres an example file of a seltzer-component.

```js
import BaseComponent from './core/BaseComponent'

class SampleComponent extends BaseComponent {}
```

Simple as that!

To help facilitate use with javascript and html binding, there is a single special initialize function in every component that you should use to initialzie any component functionality within. This function will be called during the hydragion loop. (called once within the scope of each component)

For Example

```js
import BaseComponent from './core/BaseComponent'

class SampleComponent extends BaseComponent {
    doStuff() {
        // stuff here
    }
    moreStuff() {
        // more stuff herre
    }
    init() {
        // named function init() is called during the loop
        console.log('component initialized')
        this.doStuff()
        this.moreStuff()
    }
}
```

Export these components into an object and movve on to the hydration loop.

```js
// All your components
import SampleComponent from './components/SampleComponent'
import SampleComponent2 from './components/SampleComponent2'
import SampleComponent2 from './components/SampleComponent3'

// export them into an object of key value pairs - in this example im using the keys and values as the same
// these will be bound to html data attributes
export default {
    SampleComponent,
    SampleComponent2,
    SampleComponent3,
}
```

Within your html you can scope seltzer components by using data-html attributes for example:

```html
<div data-component="SampleComponent">
    this is scoped to an instance of SampleComponent
</div>
```

During the `Hydration Loop` These html partials will be bound to an instance of the javascript class.

### The Hydration Loop

Now that you have an object of component imports pass that to the seltzerHydrate function

```js
import seltzerHydrate from 'seltzer-components'
import SampleComponent from './components/SampleComponent'
import SampleComponent2 from './components/SampleComponent2'
import SampleComponent2 from './components/SampleComponent3'

const components = {
    SampleComponent,
    SampleComponent2,
    SampleComponent3,
}

seltzerHydrate(components) // this calls init on every class! - ALL DONE!
```

#### Seltzer COmponents

| API                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| this.getChild()    | This is a method that takes a string argument. This is a quick way to grab a named element within the scope of the component. Using this attribute formatting<br><br>In this class called Accordion, you can access that button element with the method `this.getChild('btn')`                                                                                                                                                                               |
| this.getChildren() | This is a method that takes a string argument. This is a quick way to grab an array of named elements within the scope of the component. Using this attribute formatting of data-[componentName]-[name] you can select all elements within a scope.<br>For Example, if you have a component called `accordion` you can select all children buttons using the value `data-accordion-btn` with the method `this.getChildren('btn')`                            |
| this.options       | This is a special object that can inherit data from the html node using a special data key with the name of the component. On the root of the html component adding an attribute such as `data-accordion-value="hello world"`<br><br><br><br>In a class called Accordion, now you have access to `this.options.value` this will output the string "hello world". This will provide some basic primitive type formatting, such as boolean, number, and string |
| this.el            | An instance of the html node which you called on from `data-component` on                                                                                                                                                                                                                                                                                                                                                                                    |
