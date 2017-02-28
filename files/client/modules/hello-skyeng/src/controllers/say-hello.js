Espo.define('hello-skyeng:controllers/say-hello', 'controller', function (Dep) {
    return Dep.extend({

        getSettingsModel: function () {
            var model = this.getConfig().clone();
            model.defs = this.getConfig().defs;

            return model;
        },

        index: function (options) {
            var model = this.getSettingsModel();
            this.main('hello-skyeng:views/say-hello/index', {
                model: model
            });
        }
    });
});
