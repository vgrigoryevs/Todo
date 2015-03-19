Ext.define("MyApp.store.Bugs", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    config: {
        model: "MyApp.model.Bug",
        autoLoad: true,
        storeId: 'bugsstore',
        sorters: 'status',
        proxy: {
            type: 'localstorage',
            id: 'bugs-storage'
        }
    }
});