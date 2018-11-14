// 菜单
var Menu = {

    itemTemplate: '<li id="{{id}}" data-pid="{{pid}}" class="list-group-item panel-node-list">子菜单</li>',

    itemDatas: [],

    render: function () {
        var html =
            '<div id="{{id}}"  class="pa" style="top:{{top}}px; left:{{left}}px">' +
            '   <div class="panel panel-default panel-node panel-info menu">' +
            '       <div id="{{id}}-heading" data-id="{{id}}" class="panel-heading">' +
            '           菜单' +
            '           <span class="delete-node pull-right" data-type="deleteNode" data-id="{{id}}">X</span>' +
            '       </div>' +
            '       <!--子菜单-->' +
            '       <ul class="list-group">' +
            '           {{#itemDatas}}' + this.itemTemplate + '{{/itemDatas}}' +
            '       </ul>' +
            '       <!--新增按钮-->' +
            '       <center class="text-center">' +
            '           <a href="#" data-pid="{{id}}" class="addItem">+</a>' +
            '       </center>' +
            '   </div>' +
            '</div>';
        return html;
    },

    // 渲染端点
    renderEndpoint: function (data) {
        JSPlumbTool.makeDraggable(data.id)
        this.addEnterEndPoint(data.id)
        this.addMenuExitEndpoint(data.id);
    },

    // 增加入口端点
    addEnterEndPoint: function (id) {
        JSPlumbTool.addEndpoint(id, {
            dir: 'Top',
            inOut: 'in'
        });
    },

    // 增加出口端点
    addMenuExitEndpoint: function (id) {
        $('#' + id).find('li').each(function (key, value) {
            this.addItemEndpoint(value.id);
        });
    },

    // 菜单子项增加端点
    addItemEndpoint: function (id) {
        JSPlumbTool.addEndpoint(id, {
            dir: "Right",
            inOut: 'out'
        });
    },

    // 增加一个新的菜单子项
    addMenuItem: function (menu, item) {
        var id = uuid.v1();

        if (!item) {
            $(menu).append(ModuleTool.renderHtml(this.itemTemplate, {id}));
            this.addItemEndpoint(id);
        } else {
            item.id = id;
            menu.appendChild(item);
            this.addItemEndpoint(item.id);
        }
    }
}


