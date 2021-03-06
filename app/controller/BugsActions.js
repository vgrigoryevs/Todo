Ext.define("MyApp.controller.BugsActions", {
    extend: "Ext.app.Controller",
    requires: [
        'Ext.ActionSheet',
    ],
    config: {
        refs: {
            bugsBackBtn: 'bugs #bugsBackBtn',
            bugsActionBtn: 'bugs #bugsActionBtn',
            bugsList: 'bugs #listOfBugs',
            bugBackBtn: 'bugeditor #bugBackBtn',
            bugRemoveBtn: 'bugeditor #bugRemoveBtn',
            bugSaveBtn: 'bugeditor #bugSaveBtn',
            bugDescriptField: 'bugeditor #descriptField',
            bugTypeSelector: 'bugeditor #typeOfBug',
            blueButton: 'bugeditor #blueBtn',
            redButton: 'bugeditor #redBtn',
            yellowButton: 'bugeditor #yellowBtn',
            whiteButton: 'bugeditor #whiteBtn'
        },
        control: {
            bugsBackBtn: {
                tap: 'onBackButtonTap'
            },

            bugsActionBtn: {
                tap: 'onActionButtonTap'
            },

            bugsList: {
                itemtap: 'itemtap'

            },

            bugBackBtn: {
                tap: 'onBackEditor'
            },

            bugRemoveBtn: {
                tap: 'onRemoveEditor'
            },

            bugSaveBtn: {
                tap: 'onSaveEditor',
            },
            bugDescriptField: {
                keyup: 'onDescription'
            },
            bugTypeSelector: {
                change: 'onTypeChange'
            },
            blueButton: {
                tap: 'onBlueButton'
            },
            redButton: {
                tap: 'onRedButton'
            },
            yellowButton: {
                tap: 'onYellowButton'
            },
            whiteButton: {
                tap: 'onWhiteButton'
            }
        }
    },

    itemtap: function(record, index, item, e) {
        var projectsStore = Ext.getStore('bugsstore');
        this.showBug(projectsStore.getAt(index));

        setTimeout(function(){record.deselect(index);},1000);
    },

    onBackButtonTap: function() {
        Ext.ComponentQuery.query('bugview')[0].pop();
    },

    onActionButtonTap: function(){
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: 'Remove project',
                    ui  : 'decline', 

                    handler: function () {
                        Ext.getStore('bugsstore').each(function(rec) {
                            if(rec.data.parent === Ext.ComponentQuery.query('bugs')[0].config.parentRecord.data.ID){
                                Ext.getStore('bugsstore').remove(rec);
                            }
                        });
                        
                        Ext.getStore('bugsstore').sync();

                        Ext.getStore('projectsstore').remove(Ext.ComponentQuery.query('bugs')[0].config.parentRecord);
                        Ext.getStore('projectsstore').sync();

                        actionSheet.hide();
                        setTimeout('Ext.Viewport.remove(Ext.ComponentQuery.query("actionsheet")[0])', 1000);
                        Ext.ComponentQuery.query('bugview')[0].pop();
                    }
                },
                {
                    text: 'Add TODO',
                    ui : 'confirm',
                    
                    handler: function () {
                        var bugEditor = {
                            xtype:'bugeditor'
                        };

                        Ext.ComponentQuery.query('bugview')[0].push(bugEditor);
                        Ext.ComponentQuery.query('#descript')[0].addCls('whiteDescript');
                        Ext.ComponentQuery.query('bugeditor')[0]._backgroundClass = 'whiteList';
                        
                        actionSheet.hide();
                        setTimeout('Ext.Viewport.remove(Ext.ComponentQuery.query("actionsheet")[0])', 1000);
                           
                    }
                }, {
                    text: 'Cancel',
                    ui  : 'text',
        
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


    showBug: function(record){
        var bugEditor = {
            xtype:'bugeditor'
        };

        bugEditor._discloseRecord = record;

        Ext.ComponentQuery.query('bugview')[0].push(bugEditor);

        Ext.ComponentQuery.query('#descript')[0].setValue(record.data.description); 
        Ext.ComponentQuery.query('#bugDate')[0].setValue(Ext.util.Format.date(record.data.date, 'm/d/Y - H:i:s')); 
        Ext.ComponentQuery.query('#bugType')[0].setValue(record.data.type);
        Ext.ComponentQuery.query('#bugStatus')[0].setValue(record.data.status);

        Ext.ComponentQuery.query('#descript')[0].addCls(record.data.descriptClass);
        Ext.ComponentQuery.query('bugeditor')[0].config._backgroundClass = record.data.backgroundClass;

        if(record.data.type === 0) { 
            Ext.ComponentQuery.query('#bugStatus')[0].setOptions([
                {
                    text: 'New',
                    value: 0
                }, 
                {
                 text: 'Fixed',
                 value: 1
                }
            ]);
        }

        else {
            Ext.ComponentQuery.query('#bugStatus')[0].setOptions([
                {
                 text: 'New',
                 value: 0
                }, 
                {
                 text:'Implemented',
                 value: 2
                }
            ]);
        }  
    },

    onBackEditor: function() {
        Ext.ComponentQuery.query('bugview')[0].pop();
    },

    onRemoveEditor: function() {
        Ext.ComponentQuery.query('bugview')[0].pop();

        if(Ext.ComponentQuery.query('bugeditor')[0].config._discloseRecord) {
            Ext.getStore('bugsstore').remove(Ext.ComponentQuery.query('bugeditor')[0].config._discloseRecord);
            Ext.getStore('bugsstore').sync();  
        }

    },

    onSaveEditor: function() {


        var bugsStore = Ext.getStore('bugsstore');

        var descr = Ext.ComponentQuery.query('#descript')[0].getValue();  
        var bugType = Ext.ComponentQuery.query('#bugType')[0].getValue();
        var bugStatus = Ext.ComponentQuery.query('#bugStatus')[0].getValue();
        var descriptionCls = Ext.ComponentQuery.query('#descript')[0].getCls()[0];
        var backgroundCls = Ext.ComponentQuery.query('bugeditor')[0].config._backgroundClass;

        if(descr === ""){
            Ext.Msg.alert('Warning', 'Please enter new bug description', Ext.emptyFn);
        }

        else if(Ext.ComponentQuery.query('bugeditor')[0].config._discloseRecord){
            var bugEdit = Ext.ComponentQuery.query('bugeditor')[0].config._discloseRecord;
            var changes = {
                description: descr,
                status: bugStatus,
                type: bugType,
                descriptClass: descriptionCls,
                backgroundClass: backgroundCls
            };

            bugEdit.set(changes);

            bugsStore.sync();
            Ext.ComponentQuery.query('bugview')[0].pop();
        }

        else {
            var newBug = Ext.create("MyApp.model.Bug", {
                ID: new Date().getTime().toString(),
                description: descr,
                date: new Date(),
                type: bugType,
                status: bugStatus,
                parent: Ext.ComponentQuery.query('bugs')[0].config.parentRecord.data.ID,
                descriptClass: descriptionCls,
                backgroundClass: backgroundCls

        });

        bugsStore.add(newBug);
        bugsStore.sync();

        Ext.ComponentQuery.query('bugview')[0].pop();
        }
    },

    onDescription: function(field) {
        var length = field.getValue().length,
            left = field._maxLength - length;

        if(left === 0) {
            field._maxValue = field.getValue();
        }

        if(left < 0) {
            field.setValue(field._maxValue);
        }
    },

    onTypeChange: function(me, newValue, oldValue, eOpts ) {
        if(newValue === 0) {
            Ext.ComponentQuery.query('#bugStatus')[0].setOptions([
                {
                    text: 'New',
                    value: 0
                }, {
                    text: 'Fixed',
                    value: 1
                }
            ]);
        }

        else {
            Ext.ComponentQuery.query('#bugStatus')[0].setOptions([
                {
                    text: 'New',
                    value: 0
                }, {
                    text:'Implemented',
                    value: 2
                }
            ]);
        }
    },

    removeClasses: function() {
        while (Ext.ComponentQuery.query('#descript')[0].getCls()) {
            var classes = Ext.ComponentQuery.query('#descript')[0].getCls();

            Ext.ComponentQuery.query('#descript')[0].removeCls(classes[0]);
        }
    },

    onBlueButton: function() {
        this.removeClasses();

        Ext.ComponentQuery.query('bugeditor')[0].config._backgroundClass = 'blueList'; 

        Ext.ComponentQuery.query('#descript')[0].addCls('blueDescript');
    },

    onRedButton: function() {
        this.removeClasses();

        Ext.ComponentQuery.query('bugeditor')[0].config._backgroundClass = 'redList';

        Ext.ComponentQuery.query('#descript')[0].addCls('redDescript');
    },

    onYellowButton: function() {
        this.removeClasses();

        Ext.ComponentQuery.query('bugeditor')[0].config._backgroundClass = 'yellowList';

        Ext.ComponentQuery.query('#descript')[0].addCls('yellowDescript');
    },

    onWhiteButton: function() {
        this.removeClasses();

        Ext.ComponentQuery.query('bugeditor')[0].config._backgroundClass = 'whiteList';

        Ext.ComponentQuery.query('#descript')[0].addCls('whiteDescript');
    }
    
});