Ext.define('MyApp.view.Main', {
    extend: 'Ext.TabPanel',
    xtype: 'main',

    requires: ['Ext.TitleBar'],

    config: {
            fullscreen: true,
            tabBarPosition: 'bottom',

        items: [
            {
                title: 'TODOs',
                iconCls: 'bug',
                items: [
                    {
                        xtype:'bugview',
                    }
                ]
            },
            {
                title: 'About',
                iconCls: 'info',
                id: 'aboutTab',
                cls: 'aboutView'
            }
        ]
    }
});