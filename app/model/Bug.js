Ext.define("MyApp.model.Bug", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            { name: 'ID', type: 'int' },
            { name: 'description', type: 'string' },
            { name: 'date', type: 'date', dateFormat: 'm/d/Y - H:i:s'},
            { name: 'type', type: 'int'},
            { name: 'status', type: 'int'},
            { name: 'parent', type: 'int'},
            { name: 'descriptClass', type: 'string'},
            { name: 'backgroundClass', type: 'string'}
        ],

    }
});