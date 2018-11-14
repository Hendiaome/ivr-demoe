// 菜单
var Start = {
    render: function () {
        var html =
            '<div id="start"  class="pa" style="top:{{top}}px; left:{{left}}px">' +
            '    <a class="btn btn-success" href="#" role="button">' +
            '       开始' +
            '       <span class="delete-node pull-right" data-type="deleteNode" data-id="start">X</span>\n' +
            '    </a>' +
            '</div>';
        return html;
    },

    // 渲染端点
    renderEndpoint: function (data) {
        data.id = 'start';
        JSPlumbTool.makeDraggable(data.id)
        this.addExitEndpoint(data.id);
    },

    // 增加出口点
    addExitEndpoint: function (id) {
        JSPlumbTool.addEndpoint(id, {
            dir: "Bottom",
            inOut: 'out'
        });
    }

}

