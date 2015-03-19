Ext.define('MyApp.view.BugView', {
    extend: 'Ext.NavigationView',
    alias: "widget.bugview",
    requires: [
        'Ext.dataview.List'
    ],

    initialize: function () {
        this.callParent(arguments);
        
        var aboutPanel = Ext.create('Ext.Panel', {
            layout:'fit'
        });

        var topPanel = {
            xtype: "toppanel"
        };

        var newList = {
            xtype: "projectsList",
            store: "projectsstore",
            onItemDisclosure : true,
        };


        aboutPanel.add(topPanel);
        aboutPanel.add(newList);

        this.add(aboutPanel);
    },

    config: {
        cls:'todoNavigationView',
        navigationBar: {
            hidden: true
        }
    }
});