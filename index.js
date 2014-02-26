var Hammer = require('hammerjs')

exports.install = function (Vue) {
    Vue.directive('touch', {
        isFn: true,
        bind: function () {
            if (!this.el.hammer) {
                this.el.hammer = Hammer(this.el)
            }
        },
        update: function (fn) {
            var vm = this.vm
            this.handler = function (e) {
                e.targetVM = vm
                fn.call(vm, e)
            }
            this.el.hammer.on(this.arg, this.handler)
        },
        unbind: function () {
            this.el.hammer.off(this.arg, this.handler)
            if (!this.el.hammer._eventHandler.length) {
                this.el.hammer = null
            }
        }
    })
}