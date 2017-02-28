Espo.define('hello-skyeng:views/say-hello/index', 'view', function (Dep) {
    console.warn('here0');
    return Dep.extend({

        template: 'hello-skyeng:say-hello/index',

        events: {
            'click button[data-action="sendEmail"]': function (e) {
                this.send();
            }
        },

        getSmtpData: function () {
            var data = {
                'server': this.model.get('smtpServer'),
                'port': this.model.get('smtpPort'),
                'auth': this.model.get('smtpAuth'),
                'security': this.model.get('smtpSecurity'),
                'username': this.model.get('smtpUsername'),
                'password': this.model.get('smtpPassword') || null,
                'fromName': this.model.get('outboundEmailFromName'),
                'fromAddress': this.model.get('outboundEmailFromAddress'),
                'type': 'outboundEmail'
            };
            return data;
        },

        send: function () {
            var data = this.getSmtpData();

            this.createView('popup', 'views/outbound-email/modals/test-send', {
                emailAddress: this.getUser().get('emailAddress')
            }, function (view) {
                view.render();

                this.listenToOnce(view, 'send', function (emailAddress) {
                    this.$el.find('button').addClass('disabled');
                    data.emailAddress = emailAddress;

                    this.notify('Sending...');

                    view.close();

                    $.ajax({
                        url: 'SayHello/action/sendEmail',
                        type: 'POST',
                        data: JSON.stringify(data),
                        error: function (xhr, status) {
                            var statusReason = xhr.getResponseHeader('X-Status-Reason') || '';
                            statusReason = statusReason.replace(/ $/, '');
                            statusReason = statusReason.replace(/,$/, '');

                            var msg = this.translate('Error') + ' ' + xhr.status;
                            if (statusReason) {
                                msg += ': ' + statusReason;
                            }
                            Espo.Ui.error(msg);
                            console.error(msg);
                            xhr.errorIsHandled = true;

                            this.$el.find('button').removeClass('disabled');
                        }.bind(this)
                    }).done(function () {
                        this.$el.find('button').removeClass('disabled');
                        Espo.Ui.success(this.translate('testEmailSent', 'messages', 'Email'));
                    }.bind(this));
                }, this);
            }.bind(this));

        }
    })
});