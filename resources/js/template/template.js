// 默认魔板
function AbstractModule() {

    // 渲染样式
    this.render = function () {
        console.log("请与子类实现方法");
        return "";
    }

    // 渲染html
    this.renderHtml = function (data) {
        return Mustache.render(this.render(), data);
    }

    // 让元素可拖动
    this.makeDraggable = function(id) {
        jsPlumb.draggable(id, {
            containment: 'parent'
        });
    }

    // 增加端点
    this.addEndpoint = function(id, data) {
        var config = getBaseNodeConfig();

        var config2 = Object.assign(config, data);
        config.isSource = config2.isSource;
        config.isTarget = config2.isTarget;
        config.maxConnections = config2.maxConnections;

        jsPlumb.addEndpoint(id, {
            anchors: data.dir,
            uuid: id + '-' + data.inOut,
        }, config2);
    }

}

// 模块的数据类
function ModuleData(id, left, top) {
    this.id = id;
    this.left = left;
    this.top = top;

    this.setItems = function (items) {
        this.items = items;
    }

    this.getItems = function () {
        return this.items;
    }
}


// 菜单子项
function MenuItem(id, pid) {
    this.id = id;
    this.pid = pid;
}
