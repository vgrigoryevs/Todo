Ext.define('MyApp.view.ProjectsList', {
    extend: 'Ext.dataview.List',
    alias: "widget.projectsList",
    config: {
    	onItemDisclosure : true,
        itemTpl: '{title:ellipsis(100, true)}'// items
    }
});
