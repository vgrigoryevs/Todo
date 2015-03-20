Ext.define("MyApp.view.Bugs", {
    extend: "Ext.Panel",
    alias: "widget.bugs",
    config:{
        scrollable:'vertical',
        layout: 'fit',
    },
    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype: "button",
            ui: "back",
            text: "Back",
            itemId: "bugsBackBtn",
            scope: this
        };

        var actionButton = {
            xtype: "button",
            ui: "plain",
            iconCls:"action",
            itemId: "bugsActionBtn",
    		scope: this
        };

        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "TODOs",
            items: [
                backButton,
                { xtype: "spacer" },
                actionButton
            ]
        };

        var newList = {
            xtype: "bugslist",
            store: "bugsstore",
            onItemDisclosure : true,
            itemId: "listOfBugs"
        };


        this.add([
            topToolbar, newList
        ]);
    }
});