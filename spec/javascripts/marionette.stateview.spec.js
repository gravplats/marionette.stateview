describe('state view', function() {

    'use strict';

    var InitialView, TransitionView;

    beforeEach(function() {
        loadFixtures('initial-template.html', 'transition-template.html');

        InitialView = Marionette.ItemView.extend({
            template: '#initial-template'
        });

        TransitionView = Marionette.ItemView.extend({
            template: '#transition-template'
        });
    });

    describe('when initializing a state view with no `initialView` specified', function() {
        var MissingInitialView = Marionette.ItemView.extend();

        var StateView = Marionette.StateView.extend({
            views: {
                'view:initial': MissingInitialView
            }
        });

        it('should throw an error saying there is no `initialView` option', function() {
            expect(function() { new StateView(); }).toThrow();
        });

    });

    describe('when initializing a state view with no `views` specified', function() {
        var StateView = Marionette.StateView.extend({
            initialView: 'view:initial'
        });

        it('should throw an error saying there is no `views` option', function() {
            expect(function() { new StateView(); }).toThrow();
        });
    });

    describe('when rendering first time', function() {
        var view;

        beforeEach(function() {
            var StateView = Marionette.StateView.extend({
                initialView: 'view:initial',

                views: {
                    'view:initial': InitialView
                }
            });

            view = new StateView();

            spyOn(view, 'trigger').and.callThrough();
            view.render();
        });

        it('should render the initial template', function() {
            expect(view.$el).toHaveText(/initial/);
        });

        it('should trigger a render event', function() {
            expect(view.trigger).toHaveBeenCalledWith('render', view);
        });
    });

    describe('when transitioning to another view', function() {
        var view;

        beforeEach(function() {
            var StateView = Marionette.StateView.extend({
                initialView: 'view:initial',

                views: {
                    'view:initial': InitialView,
                    'view:transition': TransitionView
                }
            });

            view = new StateView();
            view.render();
            view.currentView.trigger('view:transition');
        });

        it('should render the transition template', function() {
            expect(view.$el).toHaveText(/transition/);
        });
    });

    describe('when re-rendering', function() {
        var view;

        beforeEach(function() {
            var StateView = Marionette.StateView.extend({
                initialView: 'view:initial',

                views: {
                    'view:initial': InitialView,
                    'view:transition': TransitionView
                }
            });

            view = new StateView();
            view.render();
            view.currentView.trigger('view:transition');

            spyOn(view, 'trigger').and.callThrough();
            view.render();
        });

        it('should render the current template', function() {
            expect(view.$el).toHaveText(/transition/);
        });

        it('should trigger a render event', function() {
            expect(view.trigger).toHaveBeenCalledWith('render', view);
        });
    });

});