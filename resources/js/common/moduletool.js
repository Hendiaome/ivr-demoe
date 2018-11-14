// 默认魔板
var ModuleTool = {
    // 渲染html
    renderHtml: function (template, data) {
        return Mustache.render(template, data);
    }

};

// 模块的数据类
function ModuleData(id, left, top) {
    this.id = id;
    this.left = left;
    this.top = top;

    this.setItems= function (items) {
        this.items= items;
    }

    this.getItems =function () {
        return items;
    }
}

// 菜单子项
function MenuItem(id, pid) {
    this.id= id;
    this.pid= pid;
}
