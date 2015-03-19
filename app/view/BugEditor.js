Ext.define("MyApp.view.BugEditor", {
    extend: "Ext.form.Panel",
    requires: ["Ext.form.FieldSet",'Ext.field.Select'],
    alias: "widget.bugeditor",
    config:{
        scrollable:'vertical',
    },
    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype: "button",
            ui: "back",
            text: "Back",
            itemId: "bugBackBtn"
        };

        var removeButton = {
            xtype: "button",
            ui: "decline",
            text: "Remove",
            itemId: "bugRemoveBtn"
        };

        var saveButton = {
            xtype: "button",
            ui: "action",
            text: "Save",
            itemId: "bugSaveBtn"
        };

        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            items: [
                backButton,
                { xtype: "spacer" },
                removeButton,saveButton
            ]
        };

        var description = {
                xtype: 'fieldset',
                cls: 'bugData',
                items: [
                {
                xtype: 'textareafield',
                labelWrap: true,
                placeHolder: 'Description',
                value: "",
                id: 'descript',
                itemId: 'descriptField',
                enableKeyEvents: true,
                maxLength: 255,
                maxValue: "",
            }]
        };

        var todoData = {
                xtype: 'fieldset',
                cls: 'bugData',
                items: [
                {
                    xtype: 'textfield',
                    label: 'Date',
                    fieldClass: 'x-item-disabled',
                    readOnly:true,
                    labelWrap: true,
                    value : Ext.util.Format.date(new Date(), 'm/d/Y - H:i:s'),
                    id: 'bugDate',
                    cls: 'greyDate'
                },
                {
                    xtype: 'selectfield',
                    label: 'Type:',
                    id:'sel',
                    value: 0,
                    id: 'bugType',
                    itemId: 'typeOfBug',
                    options: [{
                        text: 'Bug',
                        value: 0
                    }, {
                        text: 'Feature',
                        value: 1
                    }],
                },
                {
                    xtype: 'selectfield',
                    label: 'Status:',
                    value: 0,
                    id: 'bugStatus',
                    options: [{
                        text: 'New',
                        value: 0
                    }, {
                        text: 'Fixed',
                        value: 1
                    }]
                }]
        };

        var blueButton = {
            xtype: "button",
            ui: "plain",
            cls: 'colorBtn',
            height: '5em',
            itemId: 'blueBtn',
            style: {
                color:'#4ab1ff'
            }
        };

        var redButton = {
            xtype: "button",
            ui: "plain",
            cls: 'colorBtn',
            height: '5em',
            itemId: 'redBtn',
            style: {
                color:'#ff6a6a'
            }
        };

        var yellowButton = {
            xtype: "button",
            ui: "plain",
            cls: 'colorBtn',
            height: '5em',
            itemId: 'yellowBtn',
            style: {
                color:'#ffdd0e'
            }
        };

        var whiteButton = {
            xtype: "button",
            ui: "plain",
            cls: 'colorBtn',
            height: '5em',
            itemId: 'whiteBtn',
            style: {
                color:'#fbf9ed'
            }
        };

        this.add([
            topToolbar, description, todoData, blueButton, redButton, yellowButton, whiteButton
        ]);
    },
});