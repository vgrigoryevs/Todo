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
                    itemId: 'projectInput',
                    enableKeyEvents: true,
                    maxLength: 100,
                    listeners: {
                        keyup: function(field) {
                            var length = field.getValue().length,
                            left = field._maxLength - length;

                            if(left === 0) {
                                field._maxValue = field.getValue();
                            }

                            if(left < 0) {
                                field.setValue(field._maxValue);
                            }
                        }
                    }
                    

                },
                {
                    text: 'Create',
                    cls : 'createBtn',
                    
                    handler: function () {
                        
                        var value = Ext.ComponentQuery.query("#projectInput")[0].getValue();

                        var id = new Date().getTime().toString();

                        var newProject = Ext.create("MyApp.model.Project", {
                            ID: id,
                            title: value
                        });

                        var errors = newProject.validate();
                        var errorMessage = '';

                        if (!errors.isValid()){
                            errors.each(function (err) {
                                errorMessage += err.getMessage();
                            });
                            Ext.Msg.alert('Form is invalid!', errorMessage);
                        }
                        
                        else {
                            actionSheet.hide();
                            setTimeout('Ext.Viewport.remove(Ext.ComponentQuery.query("actionsheet")[0])', 1000);

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
    }
});