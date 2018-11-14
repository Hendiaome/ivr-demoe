// 菜单
function Start() {
    AbstractModule.call();

    this.render = function () {
        var html =
            '<div id="start"  class="pa" style="top:{{top}}px; left:{{left}}px">' +
            '    <a class="btn btn-success" href="#" role="button">' +
            '       开始' +
            '       <span class="delete-node pull-right" data-type="deleteNode" data-id="start">X</span>\n' +
            '    </a>'
            '</div>';
        return html;
    }

    // 增加一个端点
    this.renderEndpoint = function (data) {
        data.id = 'start';
        this.makeDraggable(data.id)
        this.addExitEndpoint(data.id);
    }

    // 增加出口点
    this.addExitEndpoint = function(id) {
        addEndpoint(id, {
            dir: "Bottom",
            inOut: 'out'
        });
    }
}

function newStart() {
    Start.prototype = new AbstractModule();
    return new Start();
}
