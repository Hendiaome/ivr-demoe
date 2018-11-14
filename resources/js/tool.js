var PlumbTool = {
    deleteLine: function (conn) {
        if (confirm('确定删除所点击的链接吗？')) {
            jsPlumb.detach(conn)
        }
    },
    draw: function (nodes) {
        // 将Exit节点排到最后
        nodes.sort(function (a, b) {
            if (a.type === 'Exit') return 1
            if (b.type === 'Exit') return -1
            return 0
        })

        this.computeXY(nodes)

        // var template = $('#tpl-demo').html()
        var $container = $(areaId)
        var me = this

        nodes.forEach(function (item, key) {
            console.log(item)
            console.log(typeof key)

            var data = {
                id: item.id,
                name: item.id,
                top: item.top,
                left: item.left,
                choices: item.data.choices || []
            }

            console.log(data)
            var template = me.getTemplate(item)

            $container.append(Mustache.render(template, data))

            if (me['addEndpointOf' + item.type]) {
                me['addEndpointOf' + item.type](item)
            }
        })

        this.mainConnect(nodes)
    },
    connectEndpoint: function (from, to) {
        jsPlumb.connect({ uuids: [from, to] })
    },
    mainConnect: function (nodes) {
        var me = this
        nodes.forEach(function (item) {
            if (me['connectEndpointOf' + item.type]) {
                me['connectEndpointOf' + item.type](item)
            }
        })
    },
    getTemplate: function (node) {
        return $('#tpl-' + node.type).html() || $('#tpl-demo').html()
    },
    computeXY: function (nodes) {
        var matrix = DataProcess.inputData(nodes)

        var base = {
            topBase: 50,
            topStep: 150,
            leftBase: 150,
            leftStep: 200
        }

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                var key = matrix[i][j]

                var dest = nodes.find(function (item) {
                    return item.id === key
                })

                dest.top = dest.top || base.topBase + i * base.topStep
                dest.left = dest.left || base.leftBase + j * base.leftStep
            }
        }
    },
    addEndpointOfRoot: function (node) {
        addDraggable(node.id)
        initBeginNode(node.id)
    },
    connectEndpointOfRoot: function (node) {
        this.connectEndpoint(node.id + '-out', node.data.nextNode + '-in')
    },
    addEndpointOfExit: function (node) {
        addDraggable(node.id)
        initEndNode(node.id)
    },
    addEndpointOfAnnounce: function (node) {
        addDraggable(node.id)
        setEnterPoint(node.id)
        setExitPoint(node.id)
    },
    connectEndpointOfAnnounce: function (node) {
        this.connectEndpoint(node.id + '-out', node.data.nextNode + '-in')
    },
    addEndpointOfWorkTime: function (node) {
        addDraggable(node.id)
        setEnterPoint(node.id)

        var ids = ['onWorkTime', 'offWorkTime']

        ids.forEach(function (key) {
            setExitPoint(node.id + '-' + key, 'Right')
        })
    },
    connectEndpointOfWorkTime: function (node) {
        this.connectEndpoint(node.id + '-onWorkTime-out', node.data.onWorkNode + '-in')
        this.connectEndpoint(node.id + '-offWorkTime-out', node.data.offWorkNode + '-in')
    },
    addEndpointOfMenu: function (node) {
        addDraggable(node.id)
        setEnterPoint(node.id)

        var ids = ['noinput', 'nomatch']

        node.data.choices.forEach(function (item) {
            ids.push('key-' + item.key)
        })

        ids.forEach(function (key) {
            setExitPoint(node.id + '-' + key, 'Right')
        })
    },
    connectEndpointOfMenu: function (node) {
        this.connectEndpoint(node.id + '-noinput-out', node.data.noinput.nextNode + '-in')
        this.connectEndpoint(node.id + '-nomatch-out', node.data.nomatch.nextNode + '-in')

        var me = this

        node.data.choices.forEach(function (item) {
            me.connectEndpoint(node.id + '-key-' + item.key + '-out', item.nextNode + '-in')
        })
    }
}