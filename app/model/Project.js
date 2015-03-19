Ext.define("MyApp.model.Project", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            { name: 'ID', type: 'int' },
            { name: 'title', type: 'string' }
        ],

    }
});