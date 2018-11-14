// 菜单
function End() {
    AbstractModule.call();

    this.render = function () {
        var html =
            '<div id="end" class="pa" style="top:{{top}}px; left:{{left}}px">' +
            '    <a class="btn btn-danger" href="#" role="button">' +
            '       结束' +
            '       <span class="delete-node pull-right" data-type="deleteNode" data-id="end">X</span>\n' +
            '    </a>'
            '</div>';
        return html;
    }

    // 增加一个端点
    this.renderEndpoint = function (data) {
        data.id = 'end';
        this.makeDraggable(data.id)
        this.addExitEndpoint(data.id);
    }

    // 增加出口点
    this.addExitEndpoint = function(id) {
        addEndpoint(id, {
            dir: "Top",
            inOut: 'in'
        });
    }
}

function newEnd() {
    End.prototype = new AbstractModule();
    return new End();
}
