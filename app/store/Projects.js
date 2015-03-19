Ext.define("MyApp.store.Projects", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    config: {
        model: "MyApp.model.Project",
        autoLoad: true,
        storeId: 'projectsstore',
        sorters: 'title',
        proxy: {
            type: 'localstorage',
            id: 'projects'
        }
    }
});