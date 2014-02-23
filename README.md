# Marionette.StateView

A `View` that acts as a region and can transition between different states. The `StateView` is a container for other
views and does not have a template of its own.

## Usage

Specifiy an `initialView` and a `views` map. The `StateView` listens for view events (as defined by the `views` map)
from the current view in order to transition to another view.

```js

    var View1 = Marionette.ItemView.extend({
        // definition...

        // should trigger 'view:2' to transition to View2.
        triggers: {
            'click .selector': 'view:2'
        }
    });

    var View2 = Marionette.ItemView.extend({
        // definition...

        // should trigger 'view:1' to transition to View1.
        triggers: {
            'click .selector': 'view:1'
        }
    });

    var StateView = Marionette.StateView.extend({
        initialView: 'view:1',

        views: {
            'view:1': View1,
            'view:2': View2
        }
    });
```

## License

Licensed under [MIT](http://opensource.org/licenses/mit-license.php). Please refer to LICENSE for more information.