Ext.define('MyApp.view.BugsList', {
    extend: 'Ext.dataview.List',
    alias: "widget.bugslist",
    config: {
    	onItemDisclosure : true,
        itemTpl: new Ext.XTemplate(
            '<div class="',
        	'<tpl if="type == 0">',
        	'iconBug',
        	'</tpl>',
            '<tpl if="type == 1">',
            'iconBulb',
            '</tpl>',
            '<tpl if="status == 0">',
            '" ',
            '</tpl>',
            '<tpl if="status == 1||2">',
            ' greenBug" ',
            '</tpl>',
            'id="my_list_item_{ID}">{description:ellipsis(22, true)}</div>'

        ),

    } //'<div class="{styleClass} {icon}" id="my_list_item_{ID}">{description:ellipsis(22, true)}</div>'
});
