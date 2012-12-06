
	var DataStatus = Backbone.Model.extend({
		
	});

	var DataStatuses = Backbone.Collection.extend({
		model: DataStatus
	});

	var MainView = Backbone.View.extend({
		events: {
			"click form": "addEvent"
		},

		initialize: function(options) {
			this.collection.on("add", this.clearInput, this);
		},

		addEvent: function(e) {
			e.preventDefault();

			this.collection.create({ text: this.$('div').val() });
		},

		clearInput: function() {
			
		}
	});

	var SecondaryView = Backbone.View.extend({
		initialize: function(options) {
			this.collection.on("add", this.appendStatus, this);
		},

		appendStatus: function(status) {
			
		}
	});

	$(document).ready(function() {
		var statuses = new Statuses();
		new NewStatusView({ el: $('div'), collection: statuses });
		new StatusesView({ el: $('div'), collection: statuses });
	});
	