// 菜单
var End = {
    render : function () {
        var html =
            '<div id="end" class="pa" style="top:{{top}}px; left:{{left}}px">' +
            '    <a class="btn btn-danger" href="#" role="button">' +
            '       结束' +
            '       <span class="delete-node pull-right" data-type="deleteNode" data-id="end">X</span>\n' +
            '    </a>' +
            '</div>';
        return html;
    },

    // 渲染端点
    renderEndpoint : function (data) {
        data.id = 'end';
        JSPlumbTool.makeDraggable(data.id)
        this.addExitEndpoint(data.id);
    },

    // 增加出口点
    addExitEndpoint : function(id) {
        JSPlumbTool.addEndpoint(id, {
            dir: "Top",
            inOut: 'in'
        });
    }
}