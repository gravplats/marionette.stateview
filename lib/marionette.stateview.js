// Marionette.StateView
// --------------------
// v0.1.0
// 
// Copyright (c) 2014 Mattias Rydengren <mattias.rydengren@coderesque.com>
// Distributed under MIT license

Marionette.StateView = (function (Marionette, Backbone, _) {
    'use strict';

    function ensure(obj, message) {
        if (!obj) {
            throw new Error(message);
        }

        return obj;
    }

    return Marionette.View.extend({
        initialize: function () {
            this.currentViewKey = ensure(this.initialView, 'Missing `initialView`');
            ensure(this.views, 'Missing `views`');

            this.listenTo(this, 'show', this._onShowCalled);
        },

        render: function() {
            this._transition(this.currentViewKey);
            this.triggerMethod('render', this);

            return this;
        },

        createView: function(ViewType) {
            return new ViewType({ model: this.model, collection: this.collection });
        },

        close: function() {
            this._closeView();
            Marionette.View.prototype.close.call(this);
        },

        _closeView: function() {
            var view = this.currentView;
            if (!view || view.isClosed) {
                return;
            }

            if (view.close) { view.close(); }
            else if (view.remove) { view.remove(); }

            delete this.currentView;
        },

        _listen: function(view) {
            var self = this;
            _.each(this.views, function(ViewType, key) {
                view.on(key, function() {
                    self._transition(key);
                });
            });
        },

        _openView: function(view){
            this.$el.empty().append(view.el);
        },

        _onShowCalled: function() {
            if (this._isShown) {
                return;
            }

            Marionette.triggerMethod.call(this.currentView, 'show');
        },

        _showView: function(view) {
            var isViewClosed = view.isClosed || _.isUndefined(view.$el);
            var isDifferentView = view !== this.currentView;

            if (isDifferentView) {
                this._closeView();
            }

            view.render();

            if (isDifferentView || isViewClosed) {
                this._openView(view);
            }

            if (this._isShown) {
                Marionette.triggerMethod.call(view, 'show');
            }

            this.currentView = view;
        },

        _transition: function(key) {
            var ViewType = ensure(this.views[key], 'Missing `ViewType` for "' + key + '"');

            this.currentViewKey = key;

            var view = this.createView(ViewType);
            this._listen(view);

            this._showView(view);
        }
    });

})(Marionette, Backbone, _);