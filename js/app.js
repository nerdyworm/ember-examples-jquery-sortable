App = Ember.Application.create();

App.Router.map(function() {

});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return [
      Ember.Object.create({id: '1', idx: 2}),
      Ember.Object.create({id: '2', idx: 1}),
      Ember.Object.create({id: '3', idx: 0})
    ];
  }
});

App.IndexController = Ember.ArrayController.extend({
  sortProperties: ['idx'],

  updateSortOrder: function(indexes) {
    this.forEach(function(item) {
      var index = indexes[item.get('id')];
      item.set('idx', index);
    }, this);
  }
});

App.IndexView = Ember.View.extend({
  didInsertElement: function() {
    var controller = this.get('controller');
    this.$(".sortable").sortable({
      update: function(event, ui) {
        var indexes = {};

        $(this).find('.item').each(function(index) {
          indexes[$(this).data('id')] = index;
        });

        $(this).sortable('cancel');

        controller.updateSortOrder(indexes);
      }
    });
  }
});
