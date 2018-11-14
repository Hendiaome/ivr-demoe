// 菜单
function Menu() {
    AbstractModule.call();

    this.setItems = function (items) {
        this.items = items;
    }

    this.getItems = function () {
        return this.items;
    }


    this.render = function () {
        var html =
            '<div id="{{id}}"  class="pa" style="top:{{top}}px; left:{{left}}px">' +
            '   <div class="panel panel-default panel-node panel-info menu">' +
            '       <div id="{{id}}-heading" data-id="{{id}}" class="panel-heading">' +
            '           菜单' +
            '           <span class="delete-node pull-right" data-type="deleteNode" data-id="{{id}}">X</span>' +
            '       </div>' +
            '       <!--子菜单-->' +
            '       <ul class="list-group">' +
            '       {{#items}}' +
            '           <li id="{{id}}" data-pid="{{pid}}" class="list-group-item panel-node-list">' +
            '               子菜单' +
            '           </li>' +
            '       {{/items}}' +
            '       </ul>' +
            '       <!--新增按钮-->' +
            '       <center class="text-center">' +
            '           <a href="#" data-pid="{{id}}" class="addItem">+</a>' +
            '       </center>'
            '   </div>' +
            '</div>';
        return html;
    }

    // 渲染一个端点
    this.renderEndpoint = function (data) {
        this.makeDraggable(data.id)
        this.addEnterEndPoint(data.id)
        this.addMenuExitEndpoint(data.id);
    }

    // 增加入口端点
    this.addEnterEndPoint = function (id) {
        this.addEndpoint(id, {
            dir: 'Top',
            inOut: 'in'
        });
    }

    // 增加出口端点
    this.addMenuExitEndpoint = function(id) {
        $('#' + id).find('li').each(function (key, value) {
            addItemEndpoint(value.id);
        });
    }


    // 增加一个新的菜单
    this.addMenuItem= function (menu, item) {
        menu.appendChild(item);

        addItemEndpoint(item.id);
    }
}

// 菜单子项增加端点
function addItemEndpoint(id) {
    this.addEndpoint(id, {
        dir: "Right",
        inOut: 'out'
    });
}

function newMenu() {
    Menu.prototype = new AbstractModule();
    let menu = new Menu();
    return menu;
}
