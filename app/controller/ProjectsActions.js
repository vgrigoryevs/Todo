Ext.define("MyApp.controller.ProjectsActions", {
    extend: "Ext.app.Controller",
    requires: [
        'Ext.ActionSheet'
    ],
    config: {
        refs: {
            newButton: "toppanel button",
            projectsList: "bugview projectsList"
        },
        control: {
            newButton: {
                tap: "onNewNoteCommand"
            },
            projectsList: {
                disclose: "onProjectDisclose",
                itemtap: "onProjectTap"
            }
        }
    },

    onNewNoteCommand: function() {
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    ui: 'plain',
                    style: 'color: #fff;',
                    text: 'Enter new project name',
                },
                {
                    xtype: 'textfield',
                    itemId: 'projectInput'
                },
                {
                    text: 'Create',
                    cls : 'createBtn',
                    
                    handler: function () {
                        
                        var value = Ext.ComponentQuery.query("#projectInput")[0].getValue();

                        if(value ===""){
                            Ext.Msg.alert('Warning', 'Please enter new project name', Ext.emptyFn);
                        }
                        
                        else{
                            actionSheet.hide();
                            setTimeout('Ext.Viewport.remove(Ext.ComponentQuery.query("actionsheet")[0])', 1000);

                            var id = new Date().getTime().toString();

                            var newProject = Ext.create("MyApp.model.Project", {
                                ID: id,
                                title: value
                            });

                            var projectsStore = Ext.getStore('projectsstore');
                            
                            projectsStore.add(newProject);

                            projectsStore.sync();
                        }
                    }
                }, {
                    text: 'Cancel',
                    ui  : 'decline',
                    
                    handler: function () {
                    actionSheet.hide();

                    setTimeout('Ext.Viewport.remove(Ext.ComponentQuery.query("actionsheet")[0])', 1000);
                    }
                }
            ] 
        }); 
        Ext.Viewport.add(actionSheet);
        actionSheet.show();
    },
    
    onProjectDisclose: function(list, record, target, index) {

    },

    onProjectTap: function(record, index, item, e) {
        var projectsStore = Ext.getStore('projectsstore');
        this.showBugs(projectsStore.getAt(index));

        setTimeout(function(){record.deselect(index);},1000);
    },

    showBugs: function(record) {
        var bugsList = {
            xtype:'bugs',
            parentRecord: record
        };

        var bugsStore = Ext.getStore('bugsstore');

        bugsList.parentRecord = record;

        bugsStore.clearFilter();
        bugsStore.filter('parent',record.data.ID);

        Ext.ComponentQuery.query('bugview')[0].push(bugsList);
        Ext.getStore('bugsstore').each(function(rec) {
            Ext.get("my_list_item_" + rec.data.ID).up('.x-list-item').addCls(rec.data.backgroundClass);
        });
    }
});