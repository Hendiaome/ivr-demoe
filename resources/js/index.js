var domInstanceMap = {};

$(function () {
    initModule();
    bindModule();
    bindDropItem();
});

// 初始化左边模块
function initModule() {
    $('.btn-controler').draggable({
        helper: 'clone',
        scope: 'ss'
    });
}

// 绑定模块拖拽
function bindModule(){
    // 拖放到指定区域时, 触发的事件
    $('#drop-bg').droppable({
        scope: 'ss',
        drop: function (event, ui) {
            renderInstanceEndpoint(ui.draggable[0].dataset, ui.position);
        }
    });


    // 单点击了连接线上的X号
    jsPlumb.bind('dblclick', function (conn, originalEvent) {
        PlumbTool.deleteLine(conn)
    })

    // 当链接建立
    jsPlumb.bind('beforeDrop', function (info) {
        return connectionBeforeDropCheck(info)
    })
}


// 绑定右侧拖拽对象事件
function bindDropItem() {
    // 删除事件
    $('#app').on('click', function (event) {
        event.stopPropagation()
        event.preventDefault()
        eventHandler(event.target.dataset)
    })

    // 菜单增加按钮
    $('#app').on('click', '.addItem', function (e) {
        var ul = $(this).parents('.menu').find('ul');
        var li = ul.find("li").last().clone();
        li.attr('id', uuid.v1());

        domInstanceMap[e.target.dataset.pid].addMenuItem(ul.get(0), li.get(0));

    });
}

// 渲染端点
function renderInstanceEndpoint(dataset, position) {
    var domId = uuid.v1();
    var instanceStr = dataset.module;
    var instance = eval("new" + instanceStr + "()");
    var moduleData = new ModuleData(domId, position.left, position.top);

    // test
    var ar = [];
    ar.push(new MenuItem("id1", domId));
    ar.push(new MenuItem("id2", domId));
    ar.push(new MenuItem("id3", domId));
    moduleData.setItems(ar);

    domInstanceMap[domId] = instance;
    $('#drop-bg').append(instance.renderHtml(moduleData));

    instance.renderEndpoint(moduleData);
}

function eventHandler (data) {
    if (data.type === 'deleteNode') {
        emptyNode(data.id)
    }
}

// 获取基本配置
function getBaseNodeConfig () {
    return Object.assign({}, visoConfig.baseStyle);
}

// 删除一个节点以及
function emptyNode (id) {
    jsPlumb.remove(id)
}