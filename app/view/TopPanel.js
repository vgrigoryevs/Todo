Ext.define('MyApp.view.TopPanel', {
    extend: 'Ext.TitleBar',
    alias: "widget.toppanel",
    requires: [
        'Ext.TitleBar',
    ],

    initialize: function () {
    	this.callParent(arguments);

    	var newButton = {
            xtype: "button",
            iconCls: 'add',
            ui: 'plain',
            align: 'right',
        };


        this.add(newButton);
    },
    config: {
    	docked: 'top',
    	title: 'Projects'
    },
});