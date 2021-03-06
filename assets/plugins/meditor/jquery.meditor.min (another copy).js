if ("undefined" == typeof jQuery) throw new Error("BootstrapValidator's JavaScript requires jQuery");
! function(a) {
    var b = function(b, c) {
        this.$form = a(b), this.options = a.extend({}, a.fn.bootstrapValidator.DEFAULT_OPTIONS, c), this.$invalidFields = a([]), this.$submitButton = null, this.$hiddenButton = null, this.STATUS_NOT_VALIDATED = "NOT_VALIDATED", this.STATUS_VALIDATING = "VALIDATING", this.STATUS_INVALID = "INVALID", this.STATUS_VALID = "VALID";
        var d = function() {
                for (var a = 3, b = document.createElement("div"), c = b.all || []; b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->", c[0];);
                return a > 4 ? a : !a
            }(),
            e = document.createElement("div");
        this._changeEvent = 9 !== d && "oninput" in e ? "input" : "keyup", this._submitIfValid = null, this._cacheFields = {}, this._init()
    };
    b.prototype = {
        constructor: b,
        _init: function() {
            var b = this,
                c = {
                    container: this.$form.attr("data-bv-container"),
                    events: {
                        formInit: this.$form.attr("data-bv-events-form-init"),
                        formError: this.$form.attr("data-bv-events-form-error"),
                        formSuccess: this.$form.attr("data-bv-events-form-success"),
                        fieldAdded: this.$form.attr("data-bv-events-field-added"),
                        fieldRemoved: this.$form.attr("data-bv-events-field-removed"),
                        fieldInit: this.$form.attr("data-bv-events-field-init"),
                        fieldError: this.$form.attr("data-bv-events-field-error"),
                        fieldSuccess: this.$form.attr("data-bv-events-field-success"),
                        fieldStatus: this.$form.attr("data-bv-events-field-status"),
                        validatorError: this.$form.attr("data-bv-events-validator-error"),
                        validatorSuccess: this.$form.attr("data-bv-events-validator-success")
                    },
                    excluded: this.$form.attr("data-bv-excluded"),
                    feedbackIcons: {
                        valid: this.$form.attr("data-bv-feedbackicons-valid"),
                        invalid: this.$form.attr("data-bv-feedbackicons-invalid"),
                        validating: this.$form.attr("data-bv-feedbackicons-validating")
                    },
                    group: this.$form.attr("data-bv-group"),
                    live: this.$form.attr("data-bv-live"),
                    message: this.$form.attr("data-bv-message"),
                    onError: this.$form.attr("data-bv-onerror"),
                    onSuccess: this.$form.attr("data-bv-onsuccess"),
                    submitButtons: this.$form.attr("data-bv-submitbuttons"),
                    threshold: this.$form.attr("data-bv-threshold"),
                    trigger: this.$form.attr("data-bv-trigger"),
                    verbose: this.$form.attr("data-bv-verbose"),
                    fields: {}
                };
            this.$form.attr("novalidate", "novalidate").addClass(this.options.elementClass).on("submit.bv", function(a) {
                a.preventDefault(), b.validate()
            }).on("click.bv", this.options.submitButtons, function() {
                b.$submitButton = a(this), b._submitIfValid = !0
            }).find("[name], [data-bv-field]").each(function() {
                var d = a(this),
                    e = d.attr("name") || d.attr("data-bv-field"),
                    f = b._parseOptions(d);
                f && (d.attr("data-bv-field", e), c.fields[e] = a.extend({}, f, c.fields[e]))
            }), this.options = a.extend(!0, this.options, c), this.$hiddenButton = a("<button/>").attr("type", "submit").prependTo(this.$form).addClass("bv-hidden-submit").css({
                display: "none",
                width: 0,
                height: 0
            }), this.$form.on("click.bv", '[type="submit"]', function(c) {
                if (!c.isDefaultPrevented()) {
                    var d = a(c.target),
                        e = d.is('[type="submit"]') ? d.eq(0) : d.parent('[type="submit"]').eq(0);
                    !b.options.submitButtons || e.is(b.options.submitButtons) || e.is(b.$hiddenButton) || b.$form.off("submit.bv").submit()
                }
            });
            for (var d in this.options.fields) this._initField(d);
            this.$form.trigger(a.Event(this.options.events.formInit), {
                bv: this,
                options: this.options
            }), this.options.onSuccess && this.$form.on(this.options.events.formSuccess, function(c) {
                a.fn.bootstrapValidator.helpers.call(b.options.onSuccess, [c])
            }), this.options.onError && this.$form.on(this.options.events.formError, function(c) {
                a.fn.bootstrapValidator.helpers.call(b.options.onError, [c])
            })
        },
        _parseOptions: function(b) {
            var c, d, e, f, g, h, i, j = b.attr("name") || b.attr("data-bv-field"),
                k = {};
            for (d in a.fn.bootstrapValidator.validators)
                if (c = a.fn.bootstrapValidator.validators[d], e = b.attr("data-bv-" + d.toLowerCase()) + "", i = "function" == typeof c.enableByHtml5 ? c.enableByHtml5(b) : null, i && "false" !== e || i !== !0 && ("" === e || "true" === e)) {
                    c.html5Attributes = a.extend({}, {
                        message: "message",
                        onerror: "onError",
                        onsuccess: "onSuccess"
                    }, c.html5Attributes), k[d] = a.extend({}, i === !0 ? {} : i, k[d]);
                    for (h in c.html5Attributes) f = c.html5Attributes[h], g = b.attr("data-bv-" + d.toLowerCase() + "-" + h), g && ("true" === g ? g = !0 : "false" === g && (g = !1), k[d][f] = g)
                }
            var l = {
                    container: b.attr("data-bv-container"),
                    excluded: b.attr("data-bv-excluded"),
                    feedbackIcons: b.attr("data-bv-feedbackicons"),
                    group: b.attr("data-bv-group"),
                    message: b.attr("data-bv-message"),
                    onError: b.attr("data-bv-onerror"),
                    onStatus: b.attr("data-bv-onstatus"),
                    onSuccess: b.attr("data-bv-onsuccess"),
                    selector: b.attr("data-bv-selector"),
                    threshold: b.attr("data-bv-threshold"),
                    trigger: b.attr("data-bv-trigger"),
                    verbose: b.attr("data-bv-verbose"),
                    validators: k
                },
                m = a.isEmptyObject(l),
                n = a.isEmptyObject(k);
            return !n || !m && this.options.fields && this.options.fields[j] ? (l.validators = k, l) : null
        },
        _initField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    c = this.getFieldElements(b), c.attr("data-bv-field", b)
            }
            if (0 !== c.length && null !== this.options.fields[b] && null !== this.options.fields[b].validators) {
                var d;
                for (d in this.options.fields[b].validators) a.fn.bootstrapValidator.validators[d] || delete this.options.fields[b].validators[d];
                null === this.options.fields[b].enabled && (this.options.fields[b].enabled = !0);
                for (var e = this, f = c.length, g = c.attr("type"), h = 1 === f || "radio" === g || "checkbox" === g, i = "radio" === g || "checkbox" === g || "file" === g || "SELECT" === c.eq(0).get(0).tagName ? "change" : this._changeEvent, j = (this.options.fields[b].trigger || this.options.trigger || i).split(" "), k = a.map(j, function(a) {
                        return a + ".update.bv"
                    }).join(" "), l = 0; f > l; l++) {
                    var m = c.eq(l),
                        n = this.options.fields[b].group || this.options.group,
                        o = m.parents(n),
                        p = "function" == typeof(this.options.fields[b].container || this.options.container) ? (this.options.fields[b].container || this.options.container).call(this, m, this) : this.options.fields[b].container || this.options.container,
                        q = p && "tooltip" !== p && "popover" !== p ? a(p) : this._getMessageContainer(m, n);
                    p && "tooltip" !== p && "popover" !== p && q.addClass("has-error"), q.find('.help-block[data-bv-validator][data-bv-for="' + b + '"]').remove(), o.find('i[data-bv-icon-for="' + b + '"]').remove(), m.off(k).on(k, function() {
                        e.updateStatus(a(this), e.STATUS_NOT_VALIDATED)
                    }), m.data("bv.messages", q);
                    for (d in this.options.fields[b].validators) m.data("bv.result." + d, this.STATUS_NOT_VALIDATED), h && l !== f - 1 || a("<small/>").css("display", "none").addClass("help-block").attr("data-bv-validator", d).attr("data-bv-for", b).attr("data-bv-result", this.STATUS_NOT_VALIDATED).html(this._getMessage(b, d)).appendTo(q), "function" == typeof a.fn.bootstrapValidator.validators[d].init && a.fn.bootstrapValidator.validators[d].init(this, m, this.options.fields[b].validators[d]);
                    if (this.options.fields[b].feedbackIcons !== !1 && "false" !== this.options.fields[b].feedbackIcons && this.options.feedbackIcons && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid && (!h || l === f - 1)) {
                        o.addClass("has-feedback");
                        var r = a("<i/>").css("display", "none").addClass("form-control-feedback").attr("data-bv-icon-for", b).insertAfter(m);
                        if ("checkbox" === g || "radio" === g) {
                            var s = m.parent();
                            s.hasClass(g) ? r.insertAfter(s) : s.parent().hasClass(g) && r.insertAfter(s.parent())
                        }
                        0 === o.find("label").length && r.addClass("bv-no-label"), 0 !== o.find(".input-group").length && r.addClass("bv-icon-input-group").insertAfter(o.find(".input-group").eq(0)), p && m.off("focus.bv").on("focus.bv", function() {
                            switch (p) {
                                case "tooltip":
                                    r.tooltip("show");
                                    break;
                                case "popover":
                                    r.popover("show")
                            }
                        }).off("blur.bv").on("blur.bv", function() {
                            switch (p) {
                                case "tooltip":
                                    r.tooltip("hide");
                                    break;
                                case "popover":
                                    r.popover("hide")
                            }
                        })
                    }
                }
                switch (c.on(this.options.events.fieldSuccess, function(b, c) {
                    var d = e.getOptions(c.field, null, "onSuccess");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }).on(this.options.events.fieldError, function(b, c) {
                    var d = e.getOptions(c.field, null, "onError");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }).on(this.options.events.fieldStatus, function(b, c) {
                    var d = e.getOptions(c.field, null, "onStatus");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }).on(this.options.events.validatorError, function(b, c) {
                    var d = e.getOptions(c.field, c.validator, "onError");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }).on(this.options.events.validatorSuccess, function(b, c) {
                    var d = e.getOptions(c.field, c.validator, "onSuccess");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }), k = a.map(j, function(a) {
                    return a + ".live.bv"
                }).join(" "), this.options.live) {
                    case "submitted":
                        break;
                    case "disabled":
                        c.off(k);
                        break;
                    case "enabled":
                    default:
                        c.off(k).on(k, function() {
                            e._exceedThreshold(a(this)) && e.validateField(a(this))
                        })
                }
                c.trigger(a.Event(this.options.events.fieldInit), {
                    bv: this,
                    field: b,
                    element: c
                })
            }
        },
        _getMessage: function(b, c) {
            if (!(this.options.fields[b] && a.fn.bootstrapValidator.validators[c] && this.options.fields[b].validators && this.options.fields[b].validators[c])) return "";
            var d = this.options.fields[b].validators[c];
            switch (!0) {
                case !!d.message:
                    return d.message;
                case !!this.options.fields[b].message:
                    return this.options.fields[b].message;
                case !!a.fn.bootstrapValidator.i18n[c]:
                    return a.fn.bootstrapValidator.i18n[c]["default"];
                default:
                    return this.options.message
            }
        },
        _getMessageContainer: function(a, b) {
            var c = a.parent();
            if (c.is(b)) return c;
            var d = c.attr("class");
            if (!d) return this._getMessageContainer(c, b);
            d = d.split(" ");
            for (var e = d.length, f = 0; e > f; f++)
                if (/^col-(xs|sm|md|lg)-\d+$/.test(d[f]) || /^col-(xs|sm|md|lg)-offset-\d+$/.test(d[f])) return c;
            return this._getMessageContainer(c, b)
        },
        _submit: function() {
            var b = this.isValid(),
                c = b ? this.options.events.formSuccess : this.options.events.formError,
                d = a.Event(c);
            this.$form.trigger(d), this.$submitButton && (b ? this._onSuccess(d) : this._onError(d))
        },
        _isExcluded: function(b) {
            var c = b.attr("data-bv-excluded"),
                d = b.attr("data-bv-field") || b.attr("name");
            switch (!0) {
                case !!d && this.options.fields && this.options.fields[d] && ("true" === this.options.fields[d].excluded || this.options.fields[d].excluded === !0):
                case "true" === c:
                case "" === c:
                    return !0;
                case !!d && this.options.fields && this.options.fields[d] && ("false" === this.options.fields[d].excluded || this.options.fields[d].excluded === !1):
                case "false" === c:
                    return !1;
                default:
                    if (this.options.excluded) {
                        "string" == typeof this.options.excluded && (this.options.excluded = a.map(this.options.excluded.split(","), function(b) {
                            return a.trim(b)
                        }));
                        for (var e = this.options.excluded.length, f = 0; e > f; f++)
                            if ("string" == typeof this.options.excluded[f] && b.is(this.options.excluded[f]) || "function" == typeof this.options.excluded[f] && this.options.excluded[f].call(this, b, this) === !0) return !0
                    }
                    return !1
            }
        },
        _exceedThreshold: function(b) {
            var c = b.attr("data-bv-field"),
                d = this.options.fields[c].threshold || this.options.threshold;
            if (!d) return !0;
            var e = -1 !== a.inArray(b.attr("type"), ["button", "checkbox", "file", "hidden", "image", "radio", "reset", "submit"]);
            return e || b.val().length >= d
        },
        _onError: function(b) {
            if (!b.isDefaultPrevented()) {
                if ("submitted" === this.options.live) {
                    this.options.live = "enabled";
                    var c = this;
                    for (var d in this.options.fields) ! function(b) {
                        var e = c.getFieldElements(b);
                        if (e.length) {
                            var f = a(e[0]).attr("type"),
                                g = "radio" === f || "checkbox" === f || "file" === f || "SELECT" === a(e[0]).get(0).tagName ? "change" : c._changeEvent,
                                h = c.options.fields[d].trigger || c.options.trigger || g,
                                i = a.map(h.split(" "), function(a) {
                                    return a + ".live.bv"
                                }).join(" ");
                            e.off(i).on(i, function() {
                                c._exceedThreshold(a(this)) && c.validateField(a(this))
                            })
                        }
                    }(d)
                }
                var e = this.$invalidFields.eq(0);
                if (e) {
                    var f, g = e.parents(".tab-pane");
                    g && (f = g.attr("id")) && a('a[href="#' + f + '"][data-toggle="tab"]').tab("show"), e.focus()
                }
            }
        },
        _onSuccess: function(a) {
            a.isDefaultPrevented() || this.disableSubmitButtons(!0).defaultSubmit()
        },
        _onFieldValidated: function(b, c) {
            var d = b.attr("data-bv-field"),
                e = this.options.fields[d].validators,
                f = {},
                g = 0,
                h = {
                    bv: this,
                    field: d,
                    element: b,
                    validator: c,
                    result: b.data("bv.response." + c)
                };
            if (c) switch (b.data("bv.result." + c)) {
                case this.STATUS_INVALID:
                    b.trigger(a.Event(this.options.events.validatorError), h);
                    break;
                case this.STATUS_VALID:
                    b.trigger(a.Event(this.options.events.validatorSuccess), h)
            }
            f[this.STATUS_NOT_VALIDATED] = 0, f[this.STATUS_VALIDATING] = 0, f[this.STATUS_INVALID] = 0, f[this.STATUS_VALID] = 0;
            for (var i in e)
                if (e[i].enabled !== !1) {
                    g++;
                    var j = b.data("bv.result." + i);
                    j && f[j] ++
                }
            f[this.STATUS_VALID] === g ? (this.$invalidFields = this.$invalidFields.not(b), b.trigger(a.Event(this.options.events.fieldSuccess), h)) : 0 === f[this.STATUS_NOT_VALIDATED] && 0 === f[this.STATUS_VALIDATING] && f[this.STATUS_INVALID] > 0 && (this.$invalidFields = this.$invalidFields.add(b), b.trigger(a.Event(this.options.events.fieldError), h))
        },
        getFieldElements: function(b) {
            return this._cacheFields[b] || (this._cacheFields[b] = this.options.fields[b] && this.options.fields[b].selector ? a(this.options.fields[b].selector) : this.$form.find('[name="' + b + '"]')), this._cacheFields[b]
        },
        getOptions: function(a, b, c) {
            if (!a) return this.options;
            if ("object" == typeof a && (a = a.attr("data-bv-field")), !this.options.fields[a]) return null;
            var d = this.options.fields[a];
            return b ? d.validators && d.validators[b] ? c ? d.validators[b][c] : d.validators[b] : null : c ? d[c] : d
        },
        disableSubmitButtons: function(a) {
            return a ? "disabled" !== this.options.live && this.$form.find(this.options.submitButtons).attr("disabled", "disabled") : this.$form.find(this.options.submitButtons).removeAttr("disabled"), this
        },
        validate: function() {
            if (!this.options.fields) return this;
            this.disableSubmitButtons(!0);
            for (var a in this.options.fields) this.validateField(a);
            return this._submit(), this
        },
        validateField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    c = this.getFieldElements(b)
            }
            if (0 === c.length || this.options.fields[b] && this.options.fields[b].enabled === !1) return this;
            for (var d, e, f = this, g = c.attr("type"), h = "radio" === g || "checkbox" === g ? 1 : c.length, i = "radio" === g || "checkbox" === g, j = this.options.fields[b].validators, k = "true" === this.options.fields[b].verbose || this.options.fields[b].verbose === !0 || "true" === this.options.verbose || this.options.verbose === !0, l = 0; h > l; l++) {
                var m = c.eq(l);
                if (!this._isExcluded(m)) {
                    var n = !1;
                    for (d in j) {
                        if (m.data("bv.dfs." + d) && m.data("bv.dfs." + d).reject(), n) break;
                        var o = m.data("bv.result." + d);
                        if (o !== this.STATUS_VALID && o !== this.STATUS_INVALID)
                            if (j[d].enabled !== !1) {
                                if (m.data("bv.result." + d, this.STATUS_VALIDATING), e = a.fn.bootstrapValidator.validators[d].validate(this, m, j[d]), "object" == typeof e && e.resolve) this.updateStatus(i ? b : m, this.STATUS_VALIDATING, d), m.data("bv.dfs." + d, e), e.done(function(a, b, c) {
                                    a.removeData("bv.dfs." + b).data("bv.response." + b, c), c.message && f.updateMessage(a, b, c.message), f.updateStatus(i ? a.attr("data-bv-field") : a, c.valid ? f.STATUS_VALID : f.STATUS_INVALID, b), c.valid && f._submitIfValid === !0 ? f._submit() : c.valid || k || (n = !0)
                                });
                                else if ("object" == typeof e && void 0 !== e.valid && void 0 !== e.message) {
                                    if (m.data("bv.response." + d, e), this.updateMessage(i ? b : m, d, e.message), this.updateStatus(i ? b : m, e.valid ? this.STATUS_VALID : this.STATUS_INVALID, d), !e.valid && !k) break
                                } else if ("boolean" == typeof e && (m.data("bv.response." + d, e), this.updateStatus(i ? b : m, e ? this.STATUS_VALID : this.STATUS_INVALID, d), !e && !k)) break
                            } else this.updateStatus(i ? b : m, this.STATUS_VALID, d);
                        else this._onFieldValidated(m, d)
                    }
                }
            }
            return this
        },
        updateMessage: function(b, c, d) {
            var e = a([]);
            switch (typeof b) {
                case "object":
                    e = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    e = this.getFieldElements(b)
            }
            e.each(function() {
                a(this).data("bv.messages").find('.help-block[data-bv-validator="' + c + '"][data-bv-for="' + b + '"]').html(d)
            })
        },
        updateStatus: function(b, c, d) {
            var e = a([]);
            switch (typeof b) {
                case "object":
                    e = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    e = this.getFieldElements(b)
            }
            c === this.STATUS_NOT_VALIDATED && (this._submitIfValid = !1);
            for (var f = this, g = e.attr("type"), h = this.options.fields[b].group || this.options.group, i = "radio" === g || "checkbox" === g ? 1 : e.length, j = 0; i > j; j++) {
                var k = e.eq(j);
                if (!this._isExcluded(k)) {
                    var l = k.parents(h),
                        m = k.data("bv.messages"),
                        n = m.find('.help-block[data-bv-validator][data-bv-for="' + b + '"]'),
                        o = d ? n.filter('[data-bv-validator="' + d + '"]') : n,
                        p = l.find('.form-control-feedback[data-bv-icon-for="' + b + '"]'),
                        q = "function" == typeof(this.options.fields[b].container || this.options.container) ? (this.options.fields[b].container || this.options.container).call(this, k, this) : this.options.fields[b].container || this.options.container,
                        r = null;
                    if (d) k.data("bv.result." + d, c);
                    else
                        for (var s in this.options.fields[b].validators) k.data("bv.result." + s, c);
                    o.attr("data-bv-result", c);
                    var t, u, v = k.parents(".tab-pane");
                    switch (v && (t = v.attr("id")) && (u = a('a[href="#' + t + '"][data-toggle="tab"]').parent()), c) {
                        case this.STATUS_VALIDATING:
                            r = null, this.disableSubmitButtons(!0), l.removeClass("has-success").removeClass("has-error"), p && p.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show(), u && u.removeClass("bv-tab-success").removeClass("bv-tab-error");
                            break;
                        case this.STATUS_INVALID:
                            r = !1, this.disableSubmitButtons(!0), l.removeClass("has-success").addClass("has-error"), p && p.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show(), u && u.removeClass("bv-tab-success").addClass("bv-tab-error");
                            break;
                        case this.STATUS_VALID:
                            r = 0 === n.filter('[data-bv-result="' + this.STATUS_NOT_VALIDATED + '"]').length ? n.filter('[data-bv-result="' + this.STATUS_VALID + '"]').length === n.length : null, null !== r && (this.disableSubmitButtons(this.$submitButton ? !this.isValid() : !r), p && p.removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).removeClass(this.options.feedbackIcons.valid).addClass(r ? this.options.feedbackIcons.valid : this.options.feedbackIcons.invalid).show()), l.removeClass("has-error has-success").addClass(this.isValidContainer(l) ? "has-success" : "has-error"), u && u.removeClass("bv-tab-success").removeClass("bv-tab-error").addClass(this.isValidContainer(v) ? "bv-tab-success" : "bv-tab-error");
                            break;
                        case this.STATUS_NOT_VALIDATED:
                        default:
                            r = null, this.disableSubmitButtons(!1), l.removeClass("has-success").removeClass("has-error"), p && p.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide(), u && u.removeClass("bv-tab-success").removeClass("bv-tab-error")
                    }
                    switch (!0) {
                        case p && "tooltip" === q:
                            r === !1 ? p.css("cursor", "pointer").tooltip("destroy").tooltip({
                                container: "body",
                                html: !0,
                                placement: "top",
                                title: n.filter('[data-bv-result="' + f.STATUS_INVALID + '"]').eq(0).html()
                            }) : p.tooltip("hide");
                            break;
                        case p && "popover" === q:
                            r === !1 ? p.css("cursor", "pointer").popover("destroy").popover({
                                container: "body",
                                content: n.filter('[data-bv-result="' + f.STATUS_INVALID + '"]').eq(0).html(),
                                html: !0,
                                placement: "top",
                                trigger: "hover click"
                            }) : p.popover("hide");
                            break;
                        default:
                            c === this.STATUS_INVALID ? o.show() : o.hide()
                    }
                    k.trigger(a.Event(this.options.events.fieldStatus), {
                        bv: this,
                        field: b,
                        element: k,
                        status: c
                    }), this._onFieldValidated(k, d)
                }
            }
            return this
        },
        isValid: function() {
            for (var a in this.options.fields)
                if (!this.isValidField(a)) return !1;
            return !0
        },
        isValidField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    c = this.getFieldElements(b)
            }
            if (0 === c.length || null === this.options.fields[b] || this.options.fields[b].enabled === !1) return !0;
            for (var d, e, f, g = c.attr("type"), h = "radio" === g || "checkbox" === g ? 1 : c.length, i = 0; h > i; i++)
                if (d = c.eq(i), !this._isExcluded(d))
                    for (e in this.options.fields[b].validators)
                        if (this.options.fields[b].validators[e].enabled !== !1 && (f = d.data("bv.result." + e), f !== this.STATUS_VALID)) return !1;
            return !0
        },
        isValidContainer: function(b) {
            var c = this,
                d = {},
                e = "string" == typeof b ? a(b) : b;
            if (0 === e.length) return !0;
            e.find("[data-bv-field]").each(function() {
                var b = a(this),
                    e = b.attr("data-bv-field");
                c._isExcluded(b) || d[e] || (d[e] = b)
            });
            for (var f in d) {
                var g = d[f];
                if (g.data("bv.messages").find('.help-block[data-bv-validator][data-bv-for="' + f + '"]').filter('[data-bv-result="' + this.STATUS_INVALID + '"]').length > 0) return !1
            }
            return !0
        },
        defaultSubmit: function() {
            this.$submitButton && a("<input/>").attr("type", "hidden").attr("data-bv-submit-hidden", "").attr("name", this.$submitButton.attr("name")).val(this.$submitButton.val()).appendTo(this.$form), this.$form.off("submit.bv").submit()
        },
        getInvalidFields: function() {
            return this.$invalidFields
        },
        getSubmitButton: function() {
            return this.$submitButton
        },
        getMessages: function(b, c) {
            var d = this,
                e = [],
                f = a([]);
            switch (!0) {
                case b && "object" == typeof b:
                    f = b;
                    break;
                case b && "string" == typeof b:
                    var g = this.getFieldElements(b);
                    if (g.length > 0) {
                        var h = g.attr("type");
                        f = "radio" === h || "checkbox" === h ? g.eq(0) : g
                    }
                    break;
                default:
                    f = this.$invalidFields
            }
            var i = c ? '[data-bv-validator="' + c + '"]' : "";
            return f.each(function() {
                e = e.concat(a(this).data("bv.messages").find('.help-block[data-bv-for="' + a(this).attr("data-bv-field") + '"][data-bv-result="' + d.STATUS_INVALID + '"]' + i).map(function() {
                    var b = a(this).attr("data-bv-validator"),
                        c = a(this).attr("data-bv-for");
                    return d.options.fields[c].validators[b].enabled === !1 ? "" : a(this).html()
                }).get())
            }), e
        },
        updateOption: function(a, b, c, d) {
            return "object" == typeof a && (a = a.attr("data-bv-field")), this.options.fields[a] && this.options.fields[a].validators[b] && (this.options.fields[a].validators[b][c] = d, this.updateStatus(a, this.STATUS_NOT_VALIDATED, b)), this
        },
        addField: function(b, c) {
            var d = a([]);
            switch (typeof b) {
                case "object":
                    d = b, b = b.attr("data-bv-field") || b.attr("name");
                    break;
                case "string":
                    delete this._cacheFields[b], d = this.getFieldElements(b)
            }
            d.attr("data-bv-field", b);
            for (var e = d.attr("type"), f = "radio" === e || "checkbox" === e ? 1 : d.length, g = 0; f > g; g++) {
                var h = d.eq(g),
                    i = this._parseOptions(h);
                i = null === i ? c : a.extend(!0, c, i), this.options.fields[b] = a.extend(!0, this.options.fields[b], i), this._cacheFields[b] = this._cacheFields[b] ? this._cacheFields[b].add(h) : h, this._initField("checkbox" === e || "radio" === e ? b : h)
            }
            return this.disableSubmitButtons(!1), this.$form.trigger(a.Event(this.options.events.fieldAdded), {
                field: b,
                element: d,
                options: this.options.fields[b]
            }), this
        },
        removeField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field") || b.attr("name"), c.attr("data-bv-field", b);
                    break;
                case "string":
                    c = this.getFieldElements(b)
            }
            if (0 === c.length) return this;
            for (var d = c.attr("type"), e = "radio" === d || "checkbox" === d ? 1 : c.length, f = 0; e > f; f++) {
                var g = c.eq(f);
                this.$invalidFields = this.$invalidFields.not(g), this._cacheFields[b] = this._cacheFields[b].not(g)
            }
            return this._cacheFields[b] && 0 !== this._cacheFields[b].length || delete this.options.fields[b], ("checkbox" === d || "radio" === d) && this._initField(b), this.disableSubmitButtons(!1), this.$form.trigger(a.Event(this.options.events.fieldRemoved), {
                field: b,
                element: c
            }), this
        },
        resetField: function(b, c) {
            var d = a([]);
            switch (typeof b) {
                case "object":
                    d = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    d = this.getFieldElements(b)
            }
            var e = d.length;
            if (this.options.fields[b])
                for (var f = 0; e > f; f++)
                    for (var g in this.options.fields[b].validators) d.eq(f).removeData("bv.dfs." + g);
            if (this.updateStatus(b, this.STATUS_NOT_VALIDATED), c) {
                var h = d.attr("type");
                "radio" === h || "checkbox" === h ? d.removeAttr("checked").removeAttr("selected") : d.val("")
            }
            return this
        },
        resetForm: function(b) {
            for (var c in this.options.fields) this.resetField(c, b);
            return this.$invalidFields = a([]), this.$submitButton = null, this.disableSubmitButtons(!1), this
        },
        revalidateField: function(a) {
            return this.updateStatus(a, this.STATUS_NOT_VALIDATED).validateField(a), this
        },
        enableFieldValidators: function(a, b, c) {
            var d = this.options.fields[a].validators;
            if (c && d && d[c] && d[c].enabled !== b) this.options.fields[a].validators[c].enabled = b, this.updateStatus(a, this.STATUS_NOT_VALIDATED, c);
            else if (!c && this.options.fields[a].enabled !== b) {
                this.options.fields[a].enabled = b;
                for (var e in d) this.enableFieldValidators(a, b, e)
            }
            return this
        },
        getDynamicOption: function(b, c) {
            var d = "string" == typeof b ? this.getFieldElements(b) : b,
                e = d.val();
            if ("function" == typeof c) return a.fn.bootstrapValidator.helpers.call(c, [e, this, d]);
            if ("string" == typeof c) {
                var f = this.getFieldElements(c);
                return f.length ? f.val() : a.fn.bootstrapValidator.helpers.call(c, [e, this, d]) || c
            }
            return null
        },
        destroy: function() {
            var b, c, d, e, f, g;
            for (b in this.options.fields) {
                c = this.getFieldElements(b), g = this.options.fields[b].group || this.options.group;
                for (var h = 0; h < c.length; h++) {
                    if (d = c.eq(h), d.data("bv.messages").find('.help-block[data-bv-validator][data-bv-for="' + b + '"]').remove().end().end().removeData("bv.messages").parents(g).removeClass("has-feedback has-error has-success").end().off(".bv").removeAttr("data-bv-field"), f = d.parents(g).find('i[data-bv-icon-for="' + b + '"]')) {
                        var i = "function" == typeof(this.options.fields[b].container || this.options.container) ? (this.options.fields[b].container || this.options.container).call(this, d, this) : this.options.fields[b].container || this.options.container;
                        switch (i) {
                            case "tooltip":
                                f.tooltip("destroy").remove();
                                break;
                            case "popover":
                                f.popover("destroy").remove();
                                break;
                            default:
                                f.remove()
                        }
                    }
                    for (e in this.options.fields[b].validators) d.data("bv.dfs." + e) && d.data("bv.dfs." + e).reject(), d.removeData("bv.result." + e).removeData("bv.response." + e).removeData("bv.dfs." + e), "function" == typeof a.fn.bootstrapValidator.validators[e].destroy && a.fn.bootstrapValidator.validators[e].destroy(this, d, this.options.fields[b].validators[e])
                }
            }
            this.disableSubmitButtons(!1), this.$hiddenButton.remove(), this.$form.removeClass(this.options.elementClass).off(".bv").removeData("bootstrapValidator").find("[data-bv-submit-hidden]").remove().end().find('[type="submit"]').off("click.bv")
        }
    }, a.fn.bootstrapValidator = function(c) {
        var d = arguments;
        return this.each(function() {
            var e = a(this),
                f = e.data("bootstrapValidator"),
                g = "object" == typeof c && c;
            f || (f = new b(this, g), e.data("bootstrapValidator", f)), "string" == typeof c && f[c].apply(f, Array.prototype.slice.call(d, 1))
        })
    }, a.fn.bootstrapValidator.DEFAULT_OPTIONS = {
        elementClass: "bv-form",
        message: "This value is not valid",
        group: ".form-group",
        container: null,
        threshold: null,
        excluded: [":disabled", ":hidden", ":not(:visible)"],
        feedbackIcons: {
            valid: null,
            invalid: null,
            validating: null
        },
        submitButtons: '[type="submit"]',
        live: "enabled",
        fields: null,
        events: {
            formInit: "init.form.bv",
            formError: "error.form.bv",
            formSuccess: "success.form.bv",
            fieldAdded: "added.field.bv",
            fieldRemoved: "removed.field.bv",
            fieldInit: "init.field.bv",
            fieldError: "error.field.bv",
            fieldSuccess: "success.field.bv",
            fieldStatus: "status.field.bv",
            validatorError: "error.validator.bv",
            validatorSuccess: "success.validator.bv"
        },
        verbose: !0
    }, a.fn.bootstrapValidator.validators = {}, a.fn.bootstrapValidator.i18n = {}, a.fn.bootstrapValidator.Constructor = b, a.fn.bootstrapValidator.helpers = {
        call: function(a, b) {
            if ("function" == typeof a) return a.apply(this, b);
            if ("string" == typeof a) {
                "()" === a.substring(a.length - 2) && (a = a.substring(0, a.length - 2));
                for (var c = a.split("."), d = c.pop(), e = window, f = 0; f < c.length; f++) e = e[c[f]];
                return "undefined" == typeof e[d] ? null : e[d].apply(this, b)
            }
        },
        format: function(b, c) {
            a.isArray(c) || (c = [c]);
            for (var d in c) b = b.replace("%s", c[d]);
            return b
        },
        date: function(a, b, c, d) {
            if (isNaN(a) || isNaN(b) || isNaN(c)) return !1;
            if (c.length > 2 || b.length > 2 || a.length > 4) return !1;
            if (c = parseInt(c, 10), b = parseInt(b, 10), a = parseInt(a, 10), 1e3 > a || a > 9999 || 0 >= b || b > 12) return !1;
            var e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if ((a % 400 === 0 || a % 100 !== 0 && a % 4 === 0) && (e[1] = 29), 0 >= c || c > e[b - 1]) return !1;
            if (d === !0) {
                var f = new Date,
                    g = f.getFullYear(),
                    h = f.getMonth(),
                    i = f.getDate();
                return g > a || a === g && h > b - 1 || a === g && b - 1 === h && i > c
            }
            return !0
        },
        luhn: function(a) {
            for (var b = a.length, c = 0, d = [
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
                ], e = 0; b--;) e += d[c][parseInt(a.charAt(b), 10)], c ^= 1;
            return e % 10 === 0 && e > 0
        },
        mod11And10: function(a) {
            for (var b = 5, c = a.length, d = 0; c > d; d++) b = (2 * (b || 10) % 11 + parseInt(a.charAt(d), 10)) % 10;
            return 1 === b
        },
        mod37And36: function(a, b) {
            b = b || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (var c = b.length, d = a.length, e = Math.floor(c / 2), f = 0; d > f; f++) e = (2 * (e || c) % (c + 1) + b.indexOf(a.charAt(f))) % c;
            return 1 === e
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.base64 = a.extend(a.fn.bootstrapValidator.i18n.base64 || {}, {
        "default": "Please enter a valid base 64 encoded"
    }), a.fn.bootstrapValidator.validators.base64 = {
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.between = a.extend(a.fn.bootstrapValidator.i18n.between || {}, {
        "default": "Please enter a value between %s and %s",
        notInclusive: "Please enter a value between %s and %s strictly"
    }), a.fn.bootstrapValidator.validators.between = {
        html5Attributes: {
            message: "message",
            min: "min",
            max: "max",
            inclusive: "inclusive"
        },
        enableByHtml5: function(a) {
            return "range" === a.attr("type") ? {
                min: a.attr("min"),
                max: a.attr("max")
            } : !1
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (!a.isNumeric(e)) return !1;
            var f = a.isNumeric(d.min) ? d.min : b.getDynamicOption(c, d.min),
                g = a.isNumeric(d.max) ? d.max : b.getDynamicOption(c, d.max);
            return e = parseFloat(e), d.inclusive === !0 || void 0 === d.inclusive ? {
                valid: e >= f && g >= e,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.between["default"], [f, g])
            } : {
                valid: e > f && g > e,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.between.notInclusive, [f, g])
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.blank = {
        validate: function() {
            return !0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.callback = a.extend(a.fn.bootstrapValidator.i18n.callback || {}, {
        "default": "Please enter a valid value"
    }), a.fn.bootstrapValidator.validators.callback = {
        html5Attributes: {
            message: "message",
            callback: "callback"
        },
        validate: function(b, c, d) {
            var e = c.val(),
                f = new a.Deferred,
                g = {
                    valid: !0
                };
            if (d.callback) {
                var h = a.fn.bootstrapValidator.helpers.call(d.callback, [e, b, c]);
                g = "boolean" == typeof h ? {
                    valid: h
                } : h
            }
            return f.resolve(c, "callback", g), f
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.choice = a.extend(a.fn.bootstrapValidator.i18n.choice || {}, {
        "default": "Please enter a valid value",
        less: "Please choose %s options at minimum",
        more: "Please choose %s options at maximum",
        between: "Please choose %s - %s options"
    }), a.fn.bootstrapValidator.validators.choice = {
        html5Attributes: {
            message: "message",
            min: "min",
            max: "max"
        },
        validate: function(b, c, d) {
            var e = c.is("select") ? b.getFieldElements(c.attr("data-bv-field")).find("option").filter(":selected").length : b.getFieldElements(c.attr("data-bv-field")).filter(":checked").length,
                f = d.min ? a.isNumeric(d.min) ? d.min : b.getDynamicOption(c, d.min) : null,
                g = d.max ? a.isNumeric(d.max) ? d.max : b.getDynamicOption(c, d.max) : null,
                h = !0,
                i = d.message || a.fn.bootstrapValidator.i18n.choice["default"];
            switch ((f && e < parseInt(f, 10) || g && e > parseInt(g, 10)) && (h = !1), !0) {
                case !!f && !!g:
                    i = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.choice.between, [parseInt(f, 10), parseInt(g, 10)]);
                    break;
                case !!f:
                    i = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.choice.less, parseInt(f, 10));
                    break;
                case !!g:
                    i = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.choice.more, parseInt(g, 10))
            }
            return {
                valid: h,
                message: i
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.creditCard = a.extend(a.fn.bootstrapValidator.i18n.creditCard || {}, {
        "default": "Please enter a valid credit card number"
    }), a.fn.bootstrapValidator.validators.creditCard = {
        validate: function(b, c) {
            var d = c.val();
            if ("" === d) return !0;
            if (/[^0-9-\s]+/.test(d)) return !1;
            if (d = d.replace(/\D/g, ""), !a.fn.bootstrapValidator.helpers.luhn(d)) return !1;
            var e, f, g = {
                AMERICAN_EXPRESS: {
                    length: [15],
                    prefix: ["34", "37"]
                },
                DINERS_CLUB: {
                    length: [14],
                    prefix: ["300", "301", "302", "303", "304", "305", "36"]
                },
                DINERS_CLUB_US: {
                    length: [16],
                    prefix: ["54", "55"]
                },
                DISCOVER: {
                    length: [16],
                    prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"]
                },
                JCB: {
                    length: [16],
                    prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"]
                },
                LASER: {
                    length: [16, 17, 18, 19],
                    prefix: ["6304", "6706", "6771", "6709"]
                },
                MAESTRO: {
                    length: [12, 13, 14, 15, 16, 17, 18, 19],
                    prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"]
                },
                MASTERCARD: {
                    length: [16],
                    prefix: ["51", "52", "53", "54", "55"]
                },
                SOLO: {
                    length: [16, 18, 19],
                    prefix: ["6334", "6767"]
                },
                UNIONPAY: {
                    length: [16, 17, 18, 19],
                    prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"]
                },
                VISA: {
                    length: [16],
                    prefix: ["4"]
                }
            };
            for (e in g)
                for (f in g[e].prefix)
                    if (d.substr(0, g[e].prefix[f].length) === g[e].prefix[f] && -1 !== a.inArray(d.length, g[e].length)) return !0;
            return !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.cusip = a.extend(a.fn.bootstrapValidator.i18n.cusip || {}, {
        "default": "Please enter a valid CUSIP number"
    }), a.fn.bootstrapValidator.validators.cusip = {
        validate: function(b, c) {
            var d = c.val();
            if ("" === d) return !0;
            if (d = d.toUpperCase(), !/^[0-9A-Z]{9}$/.test(d)) return !1;
            for (var e = a.map(d.split(""), function(a) {
                    var b = a.charCodeAt(0);
                    return b >= "A".charCodeAt(0) && b <= "Z".charCodeAt(0) ? b - "A".charCodeAt(0) + 10 : a
                }), f = e.length, g = 0, h = 0; f - 1 > h; h++) {
                var i = parseInt(e[h], 10);
                h % 2 !== 0 && (i *= 2), i > 9 && (i -= 9), g += i
            }
            return g = (10 - g % 10) % 10, g === e[f - 1]
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.cvv = a.extend(a.fn.bootstrapValidator.i18n.cvv || {}, {
        "default": "Please enter a valid CVV number"
    }), a.fn.bootstrapValidator.validators.cvv = {
        html5Attributes: {
            message: "message",
            ccfield: "creditCardField"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (!/^[0-9]{3,4}$/.test(e)) return !1;
            if (!d.creditCardField) return !0;
            var f = b.getFieldElements(d.creditCardField).val();
            if ("" === f) return !0;
            f = f.replace(/\D/g, "");
            var g, h, i = {
                    AMERICAN_EXPRESS: {
                        length: [15],
                        prefix: ["34", "37"]
                    },
                    DINERS_CLUB: {
                        length: [14],
                        prefix: ["300", "301", "302", "303", "304", "305", "36"]
                    },
                    DINERS_CLUB_US: {
                        length: [16],
                        prefix: ["54", "55"]
                    },
                    DISCOVER: {
                        length: [16],
                        prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"]
                    },
                    JCB: {
                        length: [16],
                        prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"]
                    },
                    LASER: {
                        length: [16, 17, 18, 19],
                        prefix: ["6304", "6706", "6771", "6709"]
                    },
                    MAESTRO: {
                        length: [12, 13, 14, 15, 16, 17, 18, 19],
                        prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"]
                    },
                    MASTERCARD: {
                        length: [16],
                        prefix: ["51", "52", "53", "54", "55"]
                    },
                    SOLO: {
                        length: [16, 18, 19],
                        prefix: ["6334", "6767"]
                    },
                    UNIONPAY: {
                        length: [16, 17, 18, 19],
                        prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"]
                    },
                    VISA: {
                        length: [16],
                        prefix: ["4"]
                    }
                },
                j = null;
            for (g in i)
                for (h in i[g].prefix)
                    if (f.substr(0, i[g].prefix[h].length) === i[g].prefix[h] && -1 !== a.inArray(f.length, i[g].length)) {
                        j = g;
                        break
                    }
            return null === j ? !1 : "AMERICAN_EXPRESS" === j ? 4 === e.length : 3 === e.length
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.date = a.extend(a.fn.bootstrapValidator.i18n.date || {}, {
        "default": "Please enter a valid date"
    }), a.fn.bootstrapValidator.validators.date = {
        html5Attributes: {
            message: "message",
            format: "format",
            separator: "separator"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            d.format = d.format || "MM/DD/YYYY", "date" === c.attr("type") && (d.format = "YYYY-MM-DD");
            var f = d.format.split(" "),
                g = f[0],
                h = f.length > 1 ? f[1] : null,
                i = f.length > 2 ? f[2] : null,
                j = e.split(" "),
                k = j[0],
                l = j.length > 1 ? j[1] : null;
            if (f.length !== j.length) return !1;
            var m = d.separator;
            if (m || (m = -1 !== k.indexOf("/") ? "/" : -1 !== k.indexOf("-") ? "-" : null), null === m || -1 === k.indexOf(m)) return !1;
            if (k = k.split(m), g = g.split(m), k.length !== g.length) return !1;
            var n = k[a.inArray("YYYY", g)],
                o = k[a.inArray("MM", g)],
                p = k[a.inArray("DD", g)];
            if (!n || !o || !p || 4 !== n.length) return !1;
            var q = null,
                r = null,
                s = null;
            if (h) {
                if (h = h.split(":"), l = l.split(":"), h.length !== l.length) return !1;
                if (r = l.length > 0 ? l[0] : null, q = l.length > 1 ? l[1] : null, s = l.length > 2 ? l[2] : null) {
                    if (isNaN(s) || s.length > 2) return !1;
                    if (s = parseInt(s, 10), 0 > s || s > 60) return !1
                }
                if (r) {
                    if (isNaN(r) || r.length > 2) return !1;
                    if (r = parseInt(r, 10), 0 > r || r >= 24 || i && r > 12) return !1
                }
                if (q) {
                    if (isNaN(q) || q.length > 2) return !1;
                    if (q = parseInt(q, 10), 0 > q || q > 59) return !1
                }
            }
            return a.fn.bootstrapValidator.helpers.date(n, o, p)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.different = a.extend(a.fn.bootstrapValidator.i18n.different || {}, {
        "default": "Please enter a different value"
    }), a.fn.bootstrapValidator.validators.different = {
        html5Attributes: {
            message: "message",
            field: "field"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            for (var e = c.field.split(","), f = !0, g = 0; g < e.length; g++) {
                var h = a.getFieldElements(e[g]);
                if (null != h && 0 !== h.length) {
                    var i = h.val();
                    d === i ? f = !1 : "" !== i && a.updateStatus(h, a.STATUS_VALID, "different")
                }
            }
            return f
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.digits = a.extend(a.fn.bootstrapValidator.i18n.digits || {}, {
        "default": "Please enter only digits"
    }), a.fn.bootstrapValidator.validators.digits = {
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : /^\d+$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.ean = a.extend(a.fn.bootstrapValidator.i18n.ean || {}, {
        "default": "Please enter a valid EAN number"
    }), a.fn.bootstrapValidator.validators.ean = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^(\d{8}|\d{12}|\d{13})$/.test(c)) return !1;
            for (var d = c.length, e = 0, f = 8 === d ? [3, 1] : [1, 3], g = 0; d - 1 > g; g++) e += parseInt(c.charAt(g), 10) * f[g % 2];
            return e = (10 - e % 10) % 10, e + "" === c.charAt(d - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.emailAddress = a.extend(a.fn.bootstrapValidator.i18n.emailAddress || {}, {
        "default": "Please enter a valid email address"
    }), a.fn.bootstrapValidator.validators.emailAddress = {
        html5Attributes: {
            message: "message",
            multiple: "multiple",
            separator: "separator"
        },
        enableByHtml5: function(a) {
            return "email" === a.attr("type")
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            var e = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                f = c.multiple === !0 || "true" === c.multiple;
            if (f) {
                for (var g = c.separator || /[,;]/, h = this._splitEmailAddresses(d, g), i = 0; i < h.length; i++)
                    if (!e.test(h[i])) return !1;
                return !0
            }
            return e.test(d)
        },
        _splitEmailAddresses: function(a, b) {
            for (var c = a.split(/"/), d = c.length, e = [], f = "", g = 0; d > g; g++)
                if (g % 2 === 0) {
                    var h = c[g].split(b),
                        i = h.length;
                    if (1 === i) f += h[0];
                    else {
                        e.push(f + h[0]);
                        for (var j = 1; i - 1 > j; j++) e.push(h[j]);
                        f = h[i - 1]
                    }
                } else f += '"' + c[g], d - 1 > g && (f += '"');
            return e.push(f), e
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.file = a.extend(a.fn.bootstrapValidator.i18n.file || {}, {
        "default": "Please choose a valid file"
    }), a.fn.bootstrapValidator.validators.file = {
        html5Attributes: {
            extension: "extension",
            maxsize: "maxSize",
            minsize: "minSize",
            message: "message",
            type: "type"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f, g = d.extension ? d.extension.toLowerCase().split(",") : null,
                h = d.type ? d.type.toLowerCase().split(",") : null,
                i = window.File && window.FileList && window.FileReader;
            if (i)
                for (var j = c.get(0).files, k = j.length, l = 0; k > l; l++) {
                    if (d.minSize && j[l].size < parseInt(d.minSize, 10)) return !1;
                    if (d.maxSize && j[l].size > parseInt(d.maxSize, 10)) return !1;
                    if (f = j[l].name.substr(j[l].name.lastIndexOf(".") + 1), g && -1 === a.inArray(f.toLowerCase(), g)) return !1;
                    if (j[l].type && h && -1 === a.inArray(j[l].type.toLowerCase(), h)) return !1
                } else if (f = e.substr(e.lastIndexOf(".") + 1), g && -1 === a.inArray(f.toLowerCase(), g)) return !1;
            return !0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.greaterThan = a.extend(a.fn.bootstrapValidator.i18n.greaterThan || {}, {
        "default": "Please enter a value greater than or equal to %s",
        notInclusive: "Please enter a value greater than %s"
    }), a.fn.bootstrapValidator.validators.greaterThan = {
        html5Attributes: {
            message: "message",
            value: "value",
            inclusive: "inclusive"
        },
        enableByHtml5: function(a) {
            var b = a.attr("type"),
                c = a.attr("min");
            return c && "date" !== b ? {
                value: c
            } : !1
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (!a.isNumeric(e)) return !1;
            var f = a.isNumeric(d.value) ? d.value : b.getDynamicOption(c, d.value);
            return e = parseFloat(e), d.inclusive === !0 || void 0 === d.inclusive ? {
                valid: e >= f,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.greaterThan["default"], f)
            } : {
                valid: e > f,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.greaterThan.notInclusive, f)
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.grid = a.extend(a.fn.bootstrapValidator.i18n.grid || {}, {
        "default": "Please enter a valid GRId number"
    }), a.fn.bootstrapValidator.validators.grid = {
        validate: function(b, c) {
            var d = c.val();
            return "" === d ? !0 : (d = d.toUpperCase(), /^[GRID:]*([0-9A-Z]{2})[-\s]*([0-9A-Z]{5})[-\s]*([0-9A-Z]{10})[-\s]*([0-9A-Z]{1})$/g.test(d) ? (d = d.replace(/\s/g, "").replace(/-/g, ""), "GRID:" === d.substr(0, 5) && (d = d.substr(5)), a.fn.bootstrapValidator.helpers.mod37And36(d)) : !1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.hex = a.extend(a.fn.bootstrapValidator.i18n.hex || {}, {
        "default": "Please enter a valid hexadecimal number"
    }), a.fn.bootstrapValidator.validators.hex = {
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : /^[0-9a-fA-F]+$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.hexColor = a.extend(a.fn.bootstrapValidator.i18n.hexColor || {}, {
        "default": "Please enter a valid hex color"
    }), a.fn.bootstrapValidator.validators.hexColor = {
        enableByHtml5: function(a) {
            return "color" === a.attr("type")
        },
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.iban = a.extend(a.fn.bootstrapValidator.i18n.iban || {}, {
        "default": "Please enter a valid IBAN number",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid IBAN number in %s",
        countries: {
            AD: "Andorra",
            AE: "United Arab Emirates",
            AL: "Albania",
            AO: "Angola",
            AT: "Austria",
            AZ: "Azerbaijan",
            BA: "Bosnia and Herzegovina",
            BE: "Belgium",
            BF: "Burkina Faso",
            BG: "Bulgaria",
            BH: "Bahrain",
            BI: "Burundi",
            BJ: "Benin",
            BR: "Brazil",
            CH: "Switzerland",
            CI: "Ivory Coast",
            CM: "Cameroon",
            CR: "Costa Rica",
            CV: "Cape Verde",
            CY: "Cyprus",
            CZ: "Czech Republic",
            DE: "Germany",
            DK: "Denmark",
            DO: "Dominica",
            DZ: "Algeria",
            EE: "Estonia",
            ES: "Spain",
            FI: "Finland",
            FO: "Faroe Islands",
            FR: "France",
            GB: "United Kingdom",
            GE: "Georgia",
            GI: "Gibraltar",
            GL: "Greenland",
            GR: "Greece",
            GT: "Guatemala",
            HR: "Croatia",
            HU: "Hungary",
            IE: "Ireland",
            IL: "Israel",
            IR: "Iran",
            IS: "Iceland",
            IT: "Italy",
            JO: "Jordan",
            KW: "Kuwait",
            KZ: "Kazakhstan",
            LB: "Lebanon",
            LI: "Liechtenstein",
            LT: "Lithuania",
            LU: "Luxembourg",
            LV: "Latvia",
            MC: "Monaco",
            MD: "Moldova",
            ME: "Montenegro",
            MG: "Madagascar",
            MK: "Macedonia",
            ML: "Mali",
            MR: "Mauritania",
            MT: "Malta",
            MU: "Mauritius",
            MZ: "Mozambique",
            NL: "Netherlands",
            NO: "Norway",
            PK: "Pakistan",
            PL: "Poland",
            PS: "Palestine",
            PT: "Portugal",
            QA: "Qatar",
            RO: "Romania",
            RS: "Serbia",
            SA: "Saudi Arabia",
            SE: "Sweden",
            SI: "Slovenia",
            SK: "Slovakia",
            SM: "San Marino",
            SN: "Senegal",
            TN: "Tunisia",
            TR: "Turkey",
            VG: "Virgin Islands, British"
        }
    }), a.fn.bootstrapValidator.validators.iban = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        REGEX: {
            AD: "AD[0-9]{2}[0-9]{4}[0-9]{4}[A-Z0-9]{12}",
            AE: "AE[0-9]{2}[0-9]{3}[0-9]{16}",
            AL: "AL[0-9]{2}[0-9]{8}[A-Z0-9]{16}",
            AO: "AO[0-9]{2}[0-9]{21}",
            AT: "AT[0-9]{2}[0-9]{5}[0-9]{11}",
            AZ: "AZ[0-9]{2}[A-Z]{4}[A-Z0-9]{20}",
            BA: "BA[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}",
            BE: "BE[0-9]{2}[0-9]{3}[0-9]{7}[0-9]{2}",
            BF: "BF[0-9]{2}[0-9]{23}",
            BG: "BG[0-9]{2}[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}",
            BH: "BH[0-9]{2}[A-Z]{4}[A-Z0-9]{14}",
            BI: "BI[0-9]{2}[0-9]{12}",
            BJ: "BJ[0-9]{2}[A-Z]{1}[0-9]{23}",
            BR: "BR[0-9]{2}[0-9]{8}[0-9]{5}[0-9]{10}[A-Z][A-Z0-9]",
            CH: "CH[0-9]{2}[0-9]{5}[A-Z0-9]{12}",
            CI: "CI[0-9]{2}[A-Z]{1}[0-9]{23}",
            CM: "CM[0-9]{2}[0-9]{23}",
            CR: "CR[0-9]{2}[0-9]{3}[0-9]{14}",
            CV: "CV[0-9]{2}[0-9]{21}",
            CY: "CY[0-9]{2}[0-9]{3}[0-9]{5}[A-Z0-9]{16}",
            CZ: "CZ[0-9]{2}[0-9]{20}",
            DE: "DE[0-9]{2}[0-9]{8}[0-9]{10}",
            DK: "DK[0-9]{2}[0-9]{14}",
            DO: "DO[0-9]{2}[A-Z0-9]{4}[0-9]{20}",
            DZ: "DZ[0-9]{2}[0-9]{20}",
            EE: "EE[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{11}[0-9]{1}",
            ES: "ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}",
            FI: "FI[0-9]{2}[0-9]{6}[0-9]{7}[0-9]{1}",
            FO: "FO[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",
            FR: "FR[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",
            GB: "GB[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",
            GE: "GE[0-9]{2}[A-Z]{2}[0-9]{16}",
            GI: "GI[0-9]{2}[A-Z]{4}[A-Z0-9]{15}",
            GL: "GL[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",
            GR: "GR[0-9]{2}[0-9]{3}[0-9]{4}[A-Z0-9]{16}",
            GT: "GT[0-9]{2}[A-Z0-9]{4}[A-Z0-9]{20}",
            HR: "HR[0-9]{2}[0-9]{7}[0-9]{10}",
            HU: "HU[0-9]{2}[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}",
            IE: "IE[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",
            IL: "IL[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{13}",
            IR: "IR[0-9]{2}[0-9]{22}",
            IS: "IS[0-9]{2}[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}",
            IT: "IT[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",
            JO: "JO[0-9]{2}[A-Z]{4}[0-9]{4}[0]{8}[A-Z0-9]{10}",
            KW: "KW[0-9]{2}[A-Z]{4}[0-9]{22}",
            KZ: "KZ[0-9]{2}[0-9]{3}[A-Z0-9]{13}",
            LB: "LB[0-9]{2}[0-9]{4}[A-Z0-9]{20}",
            LI: "LI[0-9]{2}[0-9]{5}[A-Z0-9]{12}",
            LT: "LT[0-9]{2}[0-9]{5}[0-9]{11}",
            LU: "LU[0-9]{2}[0-9]{3}[A-Z0-9]{13}",
            LV: "LV[0-9]{2}[A-Z]{4}[A-Z0-9]{13}",
            MC: "MC[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",
            MD: "MD[0-9]{2}[A-Z0-9]{20}",
            ME: "ME[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
            MG: "MG[0-9]{2}[0-9]{23}",
            MK: "MK[0-9]{2}[0-9]{3}[A-Z0-9]{10}[0-9]{2}",
            ML: "ML[0-9]{2}[A-Z]{1}[0-9]{23}",
            MR: "MR13[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}",
            MT: "MT[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z0-9]{18}",
            MU: "MU[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}",
            MZ: "MZ[0-9]{2}[0-9]{21}",
            NL: "NL[0-9]{2}[A-Z]{4}[0-9]{10}",
            NO: "NO[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{1}",
            PK: "PK[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",
            PL: "PL[0-9]{2}[0-9]{8}[0-9]{16}",
            PS: "PS[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",
            PT: "PT[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}",
            QA: "QA[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",
            RO: "RO[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",
            RS: "RS[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
            SA: "SA[0-9]{2}[0-9]{2}[A-Z0-9]{18}",
            SE: "SE[0-9]{2}[0-9]{3}[0-9]{16}[0-9]{1}",
            SI: "SI[0-9]{2}[0-9]{5}[0-9]{8}[0-9]{2}",
            SK: "SK[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{10}",
            SM: "SM[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",
            SN: "SN[0-9]{2}[A-Z]{1}[0-9]{23}",
            TN: "TN59[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
            TR: "TR[0-9]{2}[0-9]{5}[A-Z0-9]{1}[A-Z0-9]{16}",
            VG: "VG[0-9]{2}[A-Z]{4}[0-9]{16}"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            e = e.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
            var f = d.country;
            if (f ? "string" == typeof f && this.REGEX[f] || (f = b.getDynamicOption(c, f)) : f = e.substr(0, 2), !this.REGEX[f]) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.iban.countryNotSupported, f)
            };
            if (!new RegExp("^" + this.REGEX[f] + "$").test(e)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.iban.country, a.fn.bootstrapValidator.i18n.iban.countries[f])
            };
            e = e.substr(4) + e.substr(0, 4), e = a.map(e.split(""), function(a) {
                var b = a.charCodeAt(0);
                return b >= "A".charCodeAt(0) && b <= "Z".charCodeAt(0) ? b - "A".charCodeAt(0) + 10 : a
            }), e = e.join("");
            for (var g = parseInt(e.substr(0, 1), 10), h = e.length, i = 1; h > i; ++i) g = (10 * g + parseInt(e.substr(i, 1), 10)) % 97;
            return {
                valid: 1 === g,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.iban.country, a.fn.bootstrapValidator.i18n.iban.countries[f])
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.id = a.extend(a.fn.bootstrapValidator.i18n.id || {}, {
        "default": "Please enter a valid identification number",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid identification number in %s",
        countries: {
            BA: "Bosnia and Herzegovina",
            BG: "Bulgaria",
            BR: "Brazil",
            CH: "Switzerland",
            CL: "Chile",
            CN: "China",
            CZ: "Czech Republic",
            DK: "Denmark",
            EE: "Estonia",
            ES: "Spain",
            FI: "Finland",
            HR: "Croatia",
            IE: "Ireland",
            IS: "Iceland",
            LT: "Lithuania",
            LV: "Latvia",
            ME: "Montenegro",
            MK: "Macedonia",
            NL: "Netherlands",
            RO: "Romania",
            RS: "Serbia",
            SE: "Sweden",
            SI: "Slovenia",
            SK: "Slovakia",
            SM: "San Marino",
            TH: "Thailand",
            ZA: "South Africa"
        }
    }), a.fn.bootstrapValidator.validators.id = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        COUNTRY_CODES: ["BA", "BG", "BR", "CH", "CL", "CN", "CZ", "DK", "EE", "ES", "FI", "HR", "IE", "IS", "LT", "LV", "ME", "MK", "NL", "RO", "RS", "SE", "SI", "SK", "SM", "TH", "ZA"],
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = d.country;
            if (f ? ("string" != typeof f || -1 === a.inArray(f.toUpperCase(), this.COUNTRY_CODES)) && (f = b.getDynamicOption(c, f)) : f = e.substr(0, 2), -1 === a.inArray(f, this.COUNTRY_CODES)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.id.countryNotSupported, f)
            };
            var g = ["_", f.toLowerCase()].join("");
            return this[g](e) ? !0 : {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.id.country, a.fn.bootstrapValidator.i18n.id.countries[f.toUpperCase()])
            }
        },
        _validateJMBG: function(a, b) {
            if (!/^\d{13}$/.test(a)) return !1;
            var c = parseInt(a.substr(0, 2), 10),
                d = parseInt(a.substr(2, 2), 10),
                e = (parseInt(a.substr(4, 3), 10), parseInt(a.substr(7, 2), 10)),
                f = parseInt(a.substr(12, 1), 10);
            if (c > 31 || d > 12) return !1;
            for (var g = 0, h = 0; 6 > h; h++) g += (7 - h) * (parseInt(a.charAt(h), 10) + parseInt(a.charAt(h + 6), 10));
            if (g = 11 - g % 11, (10 === g || 11 === g) && (g = 0), g !== f) return !1;
            switch (b.toUpperCase()) {
                case "BA":
                    return e >= 10 && 19 >= e;
                case "MK":
                    return e >= 41 && 49 >= e;
                case "ME":
                    return e >= 20 && 29 >= e;
                case "RS":
                    return e >= 70 && 99 >= e;
                case "SI":
                    return e >= 50 && 59 >= e;
                default:
                    return !0
            }
        },
        _ba: function(a) {
            return this._validateJMBG(a, "BA")
        },
        _mk: function(a) {
            return this._validateJMBG(a, "MK")
        },
        _me: function(a) {
            return this._validateJMBG(a, "ME")
        },
        _rs: function(a) {
            return this._validateJMBG(a, "RS")
        },
        _si: function(a) {
            return this._validateJMBG(a, "SI")
        },
        _bg: function(b) {
            if (!/^\d{10}$/.test(b) && !/^\d{6}\s\d{3}\s\d{1}$/.test(b)) return !1;
            b = b.replace(/\s/g, "");
            var c = parseInt(b.substr(0, 2), 10) + 1900,
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            if (d > 40 ? (c += 100, d -= 40) : d > 20 && (c -= 100, d -= 20), !a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
            for (var f = 0, g = [2, 4, 8, 5, 10, 9, 7, 3, 6], h = 0; 9 > h; h++) f += parseInt(b.charAt(h), 10) * g[h];
            return f = f % 11 % 10, f + "" === b.substr(9, 1)
        },
        _br: function(a) {
            if (/^1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}$/.test(a)) return !1;
            if (!/^\d{11}$/.test(a) && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(a)) return !1;
            a = a.replace(/\./g, "").replace(/-/g, "");
            for (var b = 0, c = 0; 9 > c; c++) b += (10 - c) * parseInt(a.charAt(c), 10);
            if (b = 11 - b % 11, (10 === b || 11 === b) && (b = 0), b + "" !== a.charAt(9)) return !1;
            var d = 0;
            for (c = 0; 10 > c; c++) d += (11 - c) * parseInt(a.charAt(c), 10);
            return d = 11 - d % 11, (10 === d || 11 === d) && (d = 0), d + "" === a.charAt(10)
        },
        _ch: function(a) {
            if (!/^756[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{2}$/.test(a)) return !1;
            a = a.replace(/\D/g, "").substr(3);
            for (var b = a.length, c = 0, d = 8 === b ? [3, 1] : [1, 3], e = 0; b - 1 > e; e++) c += parseInt(a.charAt(e), 10) * d[e % 2];
            return c = 10 - c % 10, c + "" === a.charAt(b - 1)
        },
        _cl: function(a) {
            if (!/^\d{7,8}[-]{0,1}[0-9K]$/i.test(a)) return !1;
            for (a = a.replace(/\-/g, ""); a.length < 9;) a = "0" + a;
            for (var b = 0, c = [3, 2, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 11 === b ? b = 0 : 10 === b && (b = "K"), b + "" === a.charAt(8).toUpperCase()
        },
        _cn: function(b) {
            if (b = b.trim(), !/^\d{15}$/.test(b) && !/^\d{17}[\dXx]{1}$/.test(b)) return !1;
            var c = {
                    11: {
                        0: [0],
                        1: [
                            [0, 9],
                            [11, 17]
                        ],
                        2: [0, 28, 29]
                    },
                    12: {
                        0: [0],
                        1: [
                            [0, 16]
                        ],
                        2: [0, 21, 23, 25]
                    },
                    13: {
                        0: [0],
                        1: [
                            [0, 5], 7, 8, 21, [23, 33],
                            [81, 85]
                        ],
                        2: [
                            [0, 5],
                            [7, 9],
                            [23, 25], 27, 29, 30, 81, 83
                        ],
                        3: [
                            [0, 4],
                            [21, 24]
                        ],
                        4: [
                            [0, 4], 6, 21, [23, 35], 81
                        ],
                        5: [
                            [0, 3],
                            [21, 35], 81, 82
                        ],
                        6: [
                            [0, 4],
                            [21, 38],
                            [81, 84]
                        ],
                        7: [
                            [0, 3], 5, 6, [21, 33]
                        ],
                        8: [
                            [0, 4],
                            [21, 28]
                        ],
                        9: [
                            [0, 3],
                            [21, 30],
                            [81, 84]
                        ],
                        10: [
                            [0, 3],
                            [22, 26], 28, 81, 82
                        ],
                        11: [
                            [0, 2],
                            [21, 28], 81, 82
                        ]
                    },
                    14: {
                        0: [0],
                        1: [0, 1, [5, 10],
                            [21, 23], 81
                        ],
                        2: [
                            [0, 3], 11, 12, [21, 27]
                        ],
                        3: [
                            [0, 3], 11, 21, 22
                        ],
                        4: [
                            [0, 2], 11, 21, [23, 31], 81
                        ],
                        5: [
                            [0, 2], 21, 22, 24, 25, 81
                        ],
                        6: [
                            [0, 3],
                            [21, 24]
                        ],
                        7: [
                            [0, 2],
                            [21, 29], 81
                        ],
                        8: [
                            [0, 2],
                            [21, 30], 81, 82
                        ],
                        9: [
                            [0, 2],
                            [21, 32], 81
                        ],
                        10: [
                            [0, 2],
                            [21, 34], 81, 82
                        ],
                        11: [
                            [0, 2],
                            [21, 30], 81, 82
                        ],
                        23: [
                            [0, 3], 22, 23, [25, 30], 32, 33
                        ]
                    },
                    15: {
                        0: [0],
                        1: [
                            [0, 5],
                            [21, 25]
                        ],
                        2: [
                            [0, 7],
                            [21, 23]
                        ],
                        3: [
                            [0, 4]
                        ],
                        4: [
                            [0, 4],
                            [21, 26],
                            [28, 30]
                        ],
                        5: [
                            [0, 2],
                            [21, 26], 81
                        ],
                        6: [
                            [0, 2],
                            [21, 27]
                        ],
                        7: [
                            [0, 3],
                            [21, 27],
                            [81, 85]
                        ],
                        8: [
                            [0, 2],
                            [21, 26]
                        ],
                        9: [
                            [0, 2],
                            [21, 29], 81
                        ],
                        22: [
                            [0, 2],
                            [21, 24]
                        ],
                        25: [
                            [0, 2],
                            [22, 31]
                        ],
                        26: [
                            [0, 2],
                            [24, 27],
                            [29, 32], 34
                        ],
                        28: [0, 1, [22, 27]],
                        29: [0, [21, 23]]
                    },
                    21: {
                        0: [0],
                        1: [
                            [0, 6],
                            [11, 14],
                            [22, 24], 81
                        ],
                        2: [
                            [0, 4],
                            [11, 13], 24, [81, 83]
                        ],
                        3: [
                            [0, 4], 11, 21, 23, 81
                        ],
                        4: [
                            [0, 4], 11, [21, 23]
                        ],
                        5: [
                            [0, 5], 21, 22
                        ],
                        6: [
                            [0, 4], 24, 81, 82
                        ],
                        7: [
                            [0, 3], 11, 26, 27, 81, 82
                        ],
                        8: [
                            [0, 4], 11, 81, 82
                        ],
                        9: [
                            [0, 5], 11, 21, 22
                        ],
                        10: [
                            [0, 5], 11, 21, 81
                        ],
                        11: [
                            [0, 3], 21, 22
                        ],
                        12: [
                            [0, 2], 4, 21, 23, 24, 81, 82
                        ],
                        13: [
                            [0, 3], 21, 22, 24, 81, 82
                        ],
                        14: [
                            [0, 4], 21, 22, 81
                        ]
                    },
                    22: {
                        0: [0],
                        1: [
                            [0, 6], 12, 22, [81, 83]
                        ],
                        2: [
                            [0, 4], 11, 21, [81, 84]
                        ],
                        3: [
                            [0, 3], 22, 23, 81, 82
                        ],
                        4: [
                            [0, 3], 21, 22
                        ],
                        5: [
                            [0, 3], 21, 23, 24, 81, 82
                        ],
                        6: [
                            [0, 2], 4, 5, [21, 23], 25, 81
                        ],
                        7: [
                            [0, 2],
                            [21, 24], 81
                        ],
                        8: [
                            [0, 2], 21, 22, 81, 82
                        ],
                        24: [
                            [0, 6], 24, 26
                        ]
                    },
                    23: {
                        0: [0],
                        1: [
                            [0, 12], 21, [23, 29],
                            [81, 84]
                        ],
                        2: [
                            [0, 8], 21, [23, 25], 27, [29, 31], 81
                        ],
                        3: [
                            [0, 7], 21, 81, 82
                        ],
                        4: [
                            [0, 7], 21, 22
                        ],
                        5: [
                            [0, 3], 5, 6, [21, 24]
                        ],
                        6: [
                            [0, 6],
                            [21, 24]
                        ],
                        7: [
                            [0, 16], 22, 81
                        ],
                        8: [
                            [0, 5], 11, 22, 26, 28, 33, 81, 82
                        ],
                        9: [
                            [0, 4], 21
                        ],
                        10: [
                            [0, 5], 24, 25, 81, [83, 85]
                        ],
                        11: [
                            [0, 2], 21, 23, 24, 81, 82
                        ],
                        12: [
                            [0, 2],
                            [21, 26],
                            [81, 83]
                        ],
                        27: [
                            [0, 4],
                            [21, 23]
                        ]
                    },
                    31: {
                        0: [0],
                        1: [0, 1, [3, 10],
                            [12, 20]
                        ],
                        2: [0, 30]
                    },
                    32: {
                        0: [0],
                        1: [
                            [0, 7], 11, [13, 18], 24, 25
                        ],
                        2: [
                            [0, 6], 11, 81, 82
                        ],
                        3: [
                            [0, 5], 11, 12, [21, 24], 81, 82
                        ],
                        4: [
                            [0, 2], 4, 5, 11, 12, 81, 82
                        ],
                        5: [
                            [0, 9],
                            [81, 85]
                        ],
                        6: [
                            [0, 2], 11, 12, 21, 23, [81, 84]
                        ],
                        7: [0, 1, 3, 5, 6, [21, 24]],
                        8: [
                            [0, 4], 11, 26, [29, 31]
                        ],
                        9: [
                            [0, 3],
                            [21, 25], 28, 81, 82
                        ],
                        10: [
                            [0, 3], 11, 12, 23, 81, 84, 88
                        ],
                        11: [
                            [0, 2], 11, 12, [81, 83]
                        ],
                        12: [
                            [0, 4],
                            [81, 84]
                        ],
                        13: [
                            [0, 2], 11, [21, 24]
                        ]
                    },
                    33: {
                        0: [0],
                        1: [
                            [0, 6],
                            [8, 10], 22, 27, 82, 83, 85
                        ],
                        2: [0, 1, [3, 6], 11, 12, 25, 26, [81, 83]],
                        3: [
                            [0, 4], 22, 24, [26, 29], 81, 82
                        ],
                        4: [
                            [0, 2], 11, 21, 24, [81, 83]
                        ],
                        5: [
                            [0, 3],
                            [21, 23]
                        ],
                        6: [
                            [0, 2], 21, 24, [81, 83]
                        ],
                        7: [
                            [0, 3], 23, 26, 27, [81, 84]
                        ],
                        8: [
                            [0, 3], 22, 24, 25, 81
                        ],
                        9: [
                            [0, 3], 21, 22
                        ],
                        10: [
                            [0, 4],
                            [21, 24], 81, 82
                        ],
                        11: [
                            [0, 2],
                            [21, 27], 81
                        ]
                    },
                    34: {
                        0: [0],
                        1: [
                            [0, 4], 11, [21, 24], 81
                        ],
                        2: [
                            [0, 4], 7, 8, [21, 23], 25
                        ],
                        3: [
                            [0, 4], 11, [21, 23]
                        ],
                        4: [
                            [0, 6], 21
                        ],
                        5: [
                            [0, 4], 6, [21, 23]
                        ],
                        6: [
                            [0, 4], 21
                        ],
                        7: [
                            [0, 3], 11, 21
                        ],
                        8: [
                            [0, 3], 11, [22, 28], 81
                        ],
                        10: [
                            [0, 4],
                            [21, 24]
                        ],
                        11: [
                            [0, 3], 22, [24, 26], 81, 82
                        ],
                        12: [
                            [0, 4], 21, 22, 25, 26, 82
                        ],
                        13: [
                            [0, 2],
                            [21, 24]
                        ],
                        14: [
                            [0, 2],
                            [21, 24]
                        ],
                        15: [
                            [0, 3],
                            [21, 25]
                        ],
                        16: [
                            [0, 2],
                            [21, 23]
                        ],
                        17: [
                            [0, 2],
                            [21, 23]
                        ],
                        18: [
                            [0, 2],
                            [21, 25], 81
                        ]
                    },
                    35: {
                        0: [0],
                        1: [
                            [0, 5], 11, [21, 25], 28, 81, 82
                        ],
                        2: [
                            [0, 6],
                            [11, 13]
                        ],
                        3: [
                            [0, 5], 22
                        ],
                        4: [
                            [0, 3], 21, [23, 30], 81
                        ],
                        5: [
                            [0, 5], 21, [24, 27],
                            [81, 83]
                        ],
                        6: [
                            [0, 3],
                            [22, 29], 81
                        ],
                        7: [
                            [0, 2],
                            [21, 25],
                            [81, 84]
                        ],
                        8: [
                            [0, 2],
                            [21, 25], 81
                        ],
                        9: [
                            [0, 2],
                            [21, 26], 81, 82
                        ]
                    },
                    36: {
                        0: [0],
                        1: [
                            [0, 5], 11, [21, 24]
                        ],
                        2: [
                            [0, 3], 22, 81
                        ],
                        3: [
                            [0, 2], 13, [21, 23]
                        ],
                        4: [
                            [0, 3], 21, [23, 30], 81, 82
                        ],
                        5: [
                            [0, 2], 21
                        ],
                        6: [
                            [0, 2], 22, 81
                        ],
                        7: [
                            [0, 2],
                            [21, 35], 81, 82
                        ],
                        8: [
                            [0, 3],
                            [21, 30], 81
                        ],
                        9: [
                            [0, 2],
                            [21, 26],
                            [81, 83]
                        ],
                        10: [
                            [0, 2],
                            [21, 30]
                        ],
                        11: [
                            [0, 2],
                            [21, 30], 81
                        ]
                    },
                    37: {
                        0: [0],
                        1: [
                            [0, 5], 12, 13, [24, 26], 81
                        ],
                        2: [
                            [0, 3], 5, [11, 14],
                            [81, 85]
                        ],
                        3: [
                            [0, 6],
                            [21, 23]
                        ],
                        4: [
                            [0, 6], 81
                        ],
                        5: [
                            [0, 3],
                            [21, 23]
                        ],
                        6: [
                            [0, 2],
                            [11, 13], 34, [81, 87]
                        ],
                        7: [
                            [0, 5], 24, 25, [81, 86]
                        ],
                        8: [
                            [0, 2], 11, [26, 32],
                            [81, 83]
                        ],
                        9: [
                            [0, 3], 11, 21, 23, 82, 83
                        ],
                        10: [
                            [0, 2],
                            [81, 83]
                        ],
                        11: [
                            [0, 3], 21, 22
                        ],
                        12: [
                            [0, 3]
                        ],
                        13: [
                            [0, 2], 11, 12, [21, 29]
                        ],
                        14: [
                            [0, 2],
                            [21, 28], 81, 82
                        ],
                        15: [
                            [0, 2],
                            [21, 26], 81
                        ],
                        16: [
                            [0, 2],
                            [21, 26]
                        ],
                        17: [
                            [0, 2],
                            [21, 28]
                        ]
                    },
                    41: {
                        0: [0],
                        1: [
                            [0, 6], 8, 22, [81, 85]
                        ],
                        2: [
                            [0, 5], 11, [21, 25]
                        ],
                        3: [
                            [0, 7], 11, [22, 29], 81
                        ],
                        4: [
                            [0, 4], 11, [21, 23], 25, 81, 82
                        ],
                        5: [
                            [0, 3], 5, 6, 22, 23, 26, 27, 81
                        ],
                        6: [
                            [0, 3], 11, 21, 22
                        ],
                        7: [
                            [0, 4], 11, 21, [24, 28], 81, 82
                        ],
                        8: [
                            [0, 4], 11, [21, 23], 25, [81, 83]
                        ],
                        9: [
                            [0, 2], 22, 23, [26, 28]
                        ],
                        10: [
                            [0, 2],
                            [23, 25], 81, 82
                        ],
                        11: [
                            [0, 4],
                            [21, 23]
                        ],
                        12: [
                            [0, 2], 21, 22, 24, 81, 82
                        ],
                        13: [
                            [0, 3],
                            [21, 30], 81
                        ],
                        14: [
                            [0, 3],
                            [21, 26], 81
                        ],
                        15: [
                            [0, 3],
                            [21, 28]
                        ],
                        16: [
                            [0, 2],
                            [21, 28], 81
                        ],
                        17: [
                            [0, 2],
                            [21, 29]
                        ],
                        90: [0, 1]
                    },
                    42: {
                        0: [0],
                        1: [
                            [0, 7],
                            [11, 17]
                        ],
                        2: [
                            [0, 5], 22, 81
                        ],
                        3: [
                            [0, 3],
                            [21, 25], 81
                        ],
                        5: [
                            [0, 6],
                            [25, 29],
                            [81, 83]
                        ],
                        6: [
                            [0, 2], 6, 7, [24, 26],
                            [82, 84]
                        ],
                        7: [
                            [0, 4]
                        ],
                        8: [
                            [0, 2], 4, 21, 22, 81
                        ],
                        9: [
                            [0, 2],
                            [21, 23], 81, 82, 84
                        ],
                        10: [
                            [0, 3],
                            [22, 24], 81, 83, 87
                        ],
                        11: [
                            [0, 2],
                            [21, 27], 81, 82
                        ],
                        12: [
                            [0, 2],
                            [21, 24], 81
                        ],
                        13: [
                            [0, 3], 21, 81
                        ],
                        28: [
                            [0, 2], 22, 23, [25, 28]
                        ],
                        90: [0, [4, 6], 21]
                    },
                    43: {
                        0: [0],
                        1: [
                            [0, 5], 11, 12, 21, 22, 24, 81
                        ],
                        2: [
                            [0, 4], 11, 21, [23, 25], 81
                        ],
                        3: [
                            [0, 2], 4, 21, 81, 82
                        ],
                        4: [0, 1, [5, 8], 12, [21, 24], 26, 81, 82],
                        5: [
                            [0, 3], 11, [21, 25],
                            [27, 29], 81
                        ],
                        6: [
                            [0, 3], 11, 21, 23, 24, 26, 81, 82
                        ],
                        7: [
                            [0, 3],
                            [21, 26], 81
                        ],
                        8: [
                            [0, 2], 11, 21, 22
                        ],
                        9: [
                            [0, 3],
                            [21, 23], 81
                        ],
                        10: [
                            [0, 3],
                            [21, 28], 81
                        ],
                        11: [
                            [0, 3],
                            [21, 29]
                        ],
                        12: [
                            [0, 2],
                            [21, 30], 81
                        ],
                        13: [
                            [0, 2], 21, 22, 81, 82
                        ],
                        31: [0, 1, [22, 27], 30]
                    },
                    44: {
                        0: [0],
                        1: [
                            [0, 7],
                            [11, 16], 83, 84
                        ],
                        2: [
                            [0, 5], 21, 22, 24, 29, 32, 33, 81, 82
                        ],
                        3: [0, 1, [3, 8]],
                        4: [
                            [0, 4]
                        ],
                        5: [0, 1, [6, 15], 23, 82, 83],
                        6: [0, 1, [4, 8]],
                        7: [0, 1, [3, 5], 81, [83, 85]],
                        8: [
                            [0, 4], 11, 23, 25, [81, 83]
                        ],
                        9: [
                            [0, 3], 23, [81, 83]
                        ],
                        12: [
                            [0, 3],
                            [23, 26], 83, 84
                        ],
                        13: [
                            [0, 3],
                            [22, 24], 81
                        ],
                        14: [
                            [0, 2],
                            [21, 24], 26, 27, 81
                        ],
                        15: [
                            [0, 2], 21, 23, 81
                        ],
                        16: [
                            [0, 2],
                            [21, 25]
                        ],
                        17: [
                            [0, 2], 21, 23, 81
                        ],
                        18: [
                            [0, 3], 21, 23, [25, 27], 81, 82
                        ],
                        19: [0],
                        20: [0],
                        51: [
                            [0, 3], 21, 22
                        ],
                        52: [
                            [0, 3], 21, 22, 24, 81
                        ],
                        53: [
                            [0, 2],
                            [21, 23], 81
                        ]
                    },
                    45: {
                        0: [0],
                        1: [
                            [0, 9],
                            [21, 27]
                        ],
                        2: [
                            [0, 5],
                            [21, 26]
                        ],
                        3: [
                            [0, 5], 11, 12, [21, 32]
                        ],
                        4: [0, 1, [3, 6], 11, [21, 23], 81],
                        5: [
                            [0, 3], 12, 21
                        ],
                        6: [
                            [0, 3], 21, 81
                        ],
                        7: [
                            [0, 3], 21, 22
                        ],
                        8: [
                            [0, 4], 21, 81
                        ],
                        9: [
                            [0, 3],
                            [21, 24], 81
                        ],
                        10: [
                            [0, 2],
                            [21, 31]
                        ],
                        11: [
                            [0, 2],
                            [21, 23]
                        ],
                        12: [
                            [0, 2],
                            [21, 29], 81
                        ],
                        13: [
                            [0, 2],
                            [21, 24], 81
                        ],
                        14: [
                            [0, 2],
                            [21, 25], 81
                        ]
                    },
                    46: {
                        0: [0],
                        1: [0, 1, [5, 8]],
                        2: [0, 1],
                        3: [0, [21, 23]],
                        90: [
                            [0, 3],
                            [5, 7],
                            [21, 39]
                        ]
                    },
                    50: {
                        0: [0],
                        1: [
                            [0, 19]
                        ],
                        2: [0, [22, 38],
                            [40, 43]
                        ],
                        3: [0, [81, 84]]
                    },
                    51: {
                        0: [0],
                        1: [0, 1, [4, 8],
                            [12, 15],
                            [21, 24], 29, 31, 32, [81, 84]
                        ],
                        3: [
                            [0, 4], 11, 21, 22
                        ],
                        4: [
                            [0, 3], 11, 21, 22
                        ],
                        5: [
                            [0, 4], 21, 22, 24, 25
                        ],
                        6: [0, 1, 3, 23, 26, [81, 83]],
                        7: [0, 1, 3, 4, [22, 27], 81],
                        8: [
                            [0, 2], 11, 12, [21, 24]
                        ],
                        9: [
                            [0, 4],
                            [21, 23]
                        ],
                        10: [
                            [0, 2], 11, 24, 25, 28
                        ],
                        11: [
                            [0, 2],
                            [11, 13], 23, 24, 26, 29, 32, 33, 81
                        ],
                        13: [
                            [0, 4],
                            [21, 25], 81
                        ],
                        14: [
                            [0, 2],
                            [21, 25]
                        ],
                        15: [
                            [0, 3],
                            [21, 29]
                        ],
                        16: [
                            [0, 3],
                            [21, 23], 81
                        ],
                        17: [
                            [0, 3],
                            [21, 25], 81
                        ],
                        18: [
                            [0, 3],
                            [21, 27]
                        ],
                        19: [
                            [0, 3],
                            [21, 23]
                        ],
                        20: [
                            [0, 2], 21, 22, 81
                        ],
                        32: [0, [21, 33]],
                        33: [0, [21, 38]],
                        34: [0, 1, [22, 37]]
                    },
                    52: {
                        0: [0],
                        1: [
                            [0, 3],
                            [11, 15],
                            [21, 23], 81
                        ],
                        2: [0, 1, 3, 21, 22],
                        3: [
                            [0, 3],
                            [21, 30], 81, 82
                        ],
                        4: [
                            [0, 2],
                            [21, 25]
                        ],
                        5: [
                            [0, 2],
                            [21, 27]
                        ],
                        6: [
                            [0, 3],
                            [21, 28]
                        ],
                        22: [0, 1, [22, 30]],
                        23: [0, 1, [22, 28]],
                        24: [0, 1, [22, 28]],
                        26: [0, 1, [22, 36]],
                        27: [
                            [0, 2], 22, 23, [25, 32]
                        ]
                    },
                    53: {
                        0: [0],
                        1: [
                            [0, 3],
                            [11, 14], 21, 22, [24, 29], 81
                        ],
                        3: [
                            [0, 2],
                            [21, 26], 28, 81
                        ],
                        4: [
                            [0, 2],
                            [21, 28]
                        ],
                        5: [
                            [0, 2],
                            [21, 24]
                        ],
                        6: [
                            [0, 2],
                            [21, 30]
                        ],
                        7: [
                            [0, 2],
                            [21, 24]
                        ],
                        8: [
                            [0, 2],
                            [21, 29]
                        ],
                        9: [
                            [0, 2],
                            [21, 27]
                        ],
                        23: [0, 1, [22, 29], 31],
                        25: [
                            [0, 4],
                            [22, 32]
                        ],
                        26: [0, 1, [21, 28]],
                        27: [0, 1, [22, 30]],
                        28: [0, 1, 22, 23],
                        29: [0, 1, [22, 32]],
                        31: [0, 2, 3, [22, 24]],
                        34: [0, [21, 23]],
                        33: [0, 21, [23, 25]],
                        35: [0, [21, 28]]
                    },
                    54: {
                        0: [0],
                        1: [
                            [0, 2],
                            [21, 27]
                        ],
                        21: [0, [21, 29], 32, 33],
                        22: [0, [21, 29],
                            [31, 33]
                        ],
                        23: [0, 1, [22, 38]],
                        24: [0, [21, 31]],
                        25: [0, [21, 27]],
                        26: [0, [21, 27]]
                    },
                    61: {
                        0: [0],
                        1: [
                            [0, 4],
                            [11, 16], 22, [24, 26]
                        ],
                        2: [
                            [0, 4], 22
                        ],
                        3: [
                            [0, 4],
                            [21, 24],
                            [26, 31]
                        ],
                        4: [
                            [0, 4],
                            [22, 31], 81
                        ],
                        5: [
                            [0, 2],
                            [21, 28], 81, 82
                        ],
                        6: [
                            [0, 2],
                            [21, 32]
                        ],
                        7: [
                            [0, 2],
                            [21, 30]
                        ],
                        8: [
                            [0, 2],
                            [21, 31]
                        ],
                        9: [
                            [0, 2],
                            [21, 29]
                        ],
                        10: [
                            [0, 2],
                            [21, 26]
                        ]
                    },
                    62: {
                        0: [0],
                        1: [
                            [0, 5], 11, [21, 23]
                        ],
                        2: [0, 1],
                        3: [
                            [0, 2], 21
                        ],
                        4: [
                            [0, 3],
                            [21, 23]
                        ],
                        5: [
                            [0, 3],
                            [21, 25]
                        ],
                        6: [
                            [0, 2],
                            [21, 23]
                        ],
                        7: [
                            [0, 2],
                            [21, 25]
                        ],
                        8: [
                            [0, 2],
                            [21, 26]
                        ],
                        9: [
                            [0, 2],
                            [21, 24], 81, 82
                        ],
                        10: [
                            [0, 2],
                            [21, 27]
                        ],
                        11: [
                            [0, 2],
                            [21, 26]
                        ],
                        12: [
                            [0, 2],
                            [21, 28]
                        ],
                        24: [0, 21, [24, 29]],
                        26: [0, 21, [23, 30]],
                        29: [0, 1, [21, 27]],
                        30: [0, 1, [21, 27]]
                    },
                    63: {
                        0: [0],
                        1: [
                            [0, 5],
                            [21, 23]
                        ],
                        2: [0, 2, [21, 25]],
                        21: [0, [21, 23],
                            [26, 28]
                        ],
                        22: [0, [21, 24]],
                        23: [0, [21, 24]],
                        25: [0, [21, 25]],
                        26: [0, [21, 26]],
                        27: [0, 1, [21, 26]],
                        28: [
                            [0, 2],
                            [21, 23]
                        ]
                    },
                    64: {
                        0: [0],
                        1: [0, 1, [4, 6], 21, 22, 81],
                        2: [
                            [0, 3], 5, [21, 23]
                        ],
                        3: [
                            [0, 3],
                            [21, 24], 81
                        ],
                        4: [
                            [0, 2],
                            [21, 25]
                        ],
                        5: [
                            [0, 2], 21, 22
                        ]
                    },
                    65: {
                        0: [0],
                        1: [
                            [0, 9], 21
                        ],
                        2: [
                            [0, 5]
                        ],
                        21: [0, 1, 22, 23],
                        22: [0, 1, 22, 23],
                        23: [
                            [0, 3],
                            [23, 25], 27, 28
                        ],
                        28: [0, 1, [22, 29]],
                        29: [0, 1, [22, 29]],
                        30: [0, 1, [22, 24]],
                        31: [0, 1, [21, 31]],
                        32: [0, 1, [21, 27]],
                        40: [0, 2, 3, [21, 28]],
                        42: [
                            [0, 2], 21, [23, 26]
                        ],
                        43: [0, 1, [21, 26]],
                        90: [
                            [0, 4]
                        ],
                        27: [
                            [0, 2], 22, 23
                        ]
                    },
                    71: {
                        0: [0]
                    },
                    81: {
                        0: [0]
                    },
                    82: {
                        0: [0]
                    }
                },
                d = parseInt(b.substr(0, 2), 10),
                e = parseInt(b.substr(2, 2), 10),
                f = parseInt(b.substr(4, 2), 10);
            if (!c[d] || !c[d][e]) return !1;
            for (var g = !1, h = c[d][e], i = 0; i < h.length; i++)
                if (a.isArray(h[i]) && h[i][0] <= f && f <= h[i][1] || !a.isArray(h[i]) && f === h[i]) {
                    g = !0;
                    break
                }
            if (!g) return !1;
            var j;
            j = 18 === b.length ? b.substr(6, 8) : "19" + b.substr(6, 6);
            var k = parseInt(j.substr(0, 4), 10),
                l = parseInt(j.substr(4, 2), 10),
                m = parseInt(j.substr(6, 2), 10);
            if (!a.fn.bootstrapValidator.helpers.date(k, l, m)) return !1;
            if (18 === b.length) {
                var n = 0,
                    o = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                for (i = 0; 17 > i; i++) n += parseInt(b.charAt(i), 10) * o[i];
                n = (12 - n % 11) % 11;
                var p = "X" !== b.charAt(17).toUpperCase() ? parseInt(b.charAt(17), 10) : 10;
                return p === n
            }
            return !0
        },
        _cz: function(b) {
            if (!/^\d{9,10}$/.test(b)) return !1;
            var c = 1900 + parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10) % 50 % 20,
                e = parseInt(b.substr(4, 2), 10);
            if (9 === b.length) {
                if (c >= 1980 && (c -= 100), c > 1953) return !1
            } else 1954 > c && (c += 100);
            if (!a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
            if (10 === b.length) {
                var f = parseInt(b.substr(0, 9), 10) % 11;
                return 1985 > c && (f %= 10), f + "" === b.substr(9, 1)
            }
            return !0
        },
        _dk: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(b)) return !1;
            b = b.replace(/-/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            switch (!0) {
                case -1 !== "5678".indexOf(b.charAt(6)) && e >= 58:
                    e += 1800;
                    break;
                case -1 !== "0123".indexOf(b.charAt(6)):
                case -1 !== "49".indexOf(b.charAt(6)) && e >= 37:
                    e += 1900;
                    break;
                default:
                    e += 2e3
            }
            return a.fn.bootstrapValidator.helpers.date(e, d, c)
        },
        _ee: function(a) {
            return this._lt(a)
        },
        _es: function(a) {
            if (!/^[0-9A-Z]{8}[-]{0,1}[0-9A-Z]$/.test(a) && !/^[XYZ][-]{0,1}[0-9]{7}[-]{0,1}[0-9A-Z]$/.test(a)) return !1;
            a = a.replace(/-/g, "");
            var b = "XYZ".indexOf(a.charAt(0)); - 1 !== b && (a = b + a.substr(1) + "");
            var c = parseInt(a.substr(0, 8), 10);
            return c = "TRWAGMYFPDXBNJZSQVHLCKE" [c % 23], c === a.substr(8, 1)
        },
        _fi: function(b) {
            if (!/^[0-9]{6}[-+A][0-9]{3}[0-9ABCDEFHJKLMNPRSTUVWXY]$/.test(b)) return !1;
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10),
                f = {
                    "+": 1800,
                    "-": 1900,
                    A: 2e3
                };
            if (e = f[b.charAt(6)] + e, !a.fn.bootstrapValidator.helpers.date(e, d, c)) return !1;
            var g = parseInt(b.substr(7, 3), 10);
            if (2 > g) return !1;
            var h = b.substr(0, 6) + b.substr(7, 3) + "";
            return h = parseInt(h, 10), "0123456789ABCDEFHJKLMNPRSTUVWXY".charAt(h % 31) === b.charAt(10)
        },
        _hr: function(b) {
            return /^[0-9]{11}$/.test(b) ? a.fn.bootstrapValidator.helpers.mod11And10(b) : !1
        },
        _ie: function(a) {
            if (!/^\d{7}[A-W][AHWTX]?$/.test(a)) return !1;
            var b = function(a) {
                for (; a.length < 7;) a = "0" + a;
                for (var b = "WABCDEFGHIJKLMNOPQRSTUV", c = 0, d = 0; 7 > d; d++) c += parseInt(a.charAt(d), 10) * (8 - d);
                return c += 9 * b.indexOf(a.substr(7)), b[c % 23]
            };
            return 9 !== a.length || "A" !== a.charAt(8) && "H" !== a.charAt(8) ? a.charAt(7) === b(a.substr(0, 7)) : a.charAt(7) === b(a.substr(0, 7) + a.substr(8) + "")
        },
        _is: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(b)) return !1;
            b = b.replace(/-/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10),
                f = parseInt(b.charAt(9), 10);
            if (e = 9 === f ? 1900 + e : 100 * (20 + f) + e, !a.fn.bootstrapValidator.helpers.date(e, d, c, !0)) return !1;
            for (var g = 0, h = [3, 2, 7, 6, 5, 4, 3, 2], i = 0; 8 > i; i++) g += parseInt(b.charAt(i), 10) * h[i];
            return g = 11 - g % 11, g + "" === b.charAt(8)
        },
        _lt: function(b) {
            if (!/^[0-9]{11}$/.test(b)) return !1;
            var c = parseInt(b.charAt(0), 10),
                d = parseInt(b.substr(1, 2), 10),
                e = parseInt(b.substr(3, 2), 10),
                f = parseInt(b.substr(5, 2), 10),
                g = c % 2 === 0 ? 17 + c / 2 : 17 + (c + 1) / 2;
            if (d = 100 * g + d, !a.fn.bootstrapValidator.helpers.date(d, e, f, !0)) return !1;
            for (var h = 0, i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1], j = 0; 10 > j; j++) h += parseInt(b.charAt(j), 10) * i[j];
            if (h %= 11, 10 !== h) return h + "" === b.charAt(10);
            for (h = 0, i = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3], j = 0; 10 > j; j++) h += parseInt(b.charAt(j), 10) * i[j];
            return h %= 11, 10 === h && (h = 0), h + "" === b.charAt(10)
        },
        _lv: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{5}$/.test(b)) return !1;
            b = b.replace(/\D/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            if (e = e + 1800 + 100 * parseInt(b.charAt(6), 10), !a.fn.bootstrapValidator.helpers.date(e, d, c, !0)) return !1;
            for (var f = 0, g = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], h = 0; 10 > h; h++) f += parseInt(b.charAt(h), 10) * g[h];
            return f = (f + 1) % 11 % 10, f + "" === b.charAt(10)
        },
        _nl: function(a) {
            for (; a.length < 9;) a = "0" + a;
            if (!/^[0-9]{4}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{3}$/.test(a)) return !1;
            if (a = a.replace(/\./g, ""), 0 === parseInt(a, 10)) return !1;
            for (var b = 0, c = a.length, d = 0; c - 1 > d; d++) b += (9 - d) * parseInt(a.charAt(d), 10);
            return b %= 11, 10 === b && (b = 0), b + "" === a.charAt(c - 1)
        },
        _ro: function(b) {
            if (!/^[0-9]{13}$/.test(b)) return !1;
            var c = parseInt(b.charAt(0), 10);
            if (0 === c || 7 === c || 8 === c) return !1;
            var d = parseInt(b.substr(1, 2), 10),
                e = parseInt(b.substr(3, 2), 10),
                f = parseInt(b.substr(5, 2), 10),
                g = {
                    1: 1900,
                    2: 1900,
                    3: 1800,
                    4: 1800,
                    5: 2e3,
                    6: 2e3
                };
            if (f > 31 && e > 12) return !1;
            if (9 !== c && (d = g[c + ""] + d, !a.fn.bootstrapValidator.helpers.date(d, e, f))) return !1;
            for (var h = 0, i = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9], j = b.length, k = 0; j - 1 > k; k++) h += parseInt(b.charAt(k), 10) * i[k];
            return h %= 11, 10 === h && (h = 1), h + "" === b.charAt(j - 1)
        },
        _se: function(b) {
            if (!/^[0-9]{10}$/.test(b) && !/^[0-9]{6}[-|+][0-9]{4}$/.test(b)) return !1;
            b = b.replace(/[^0-9]/g, "");
            var c = parseInt(b.substr(0, 2), 10) + 1900,
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            return a.fn.bootstrapValidator.helpers.date(c, d, e) ? a.fn.bootstrapValidator.helpers.luhn(b) : !1
        },
        _sk: function(a) {
            return this._cz(a)
        },
        _sm: function(a) {
            return /^\d{5}$/.test(a)
        },
        _th: function(a) {
            if (13 !== a.length) return !1;
            for (var b = 0, c = 0; 12 > c; c++) b += parseInt(a.charAt(c), 10) * (13 - c);
            return (11 - b % 11) % 10 === parseInt(a.charAt(12), 10)
        },
        _za: function(b) {
            if (!/^[0-9]{10}[0|1][8|9][0-9]$/.test(b)) return !1;
            var c = parseInt(b.substr(0, 2), 10),
                d = (new Date).getFullYear() % 100,
                e = parseInt(b.substr(2, 2), 10),
                f = parseInt(b.substr(4, 2), 10);
            return c = c >= d ? c + 1900 : c + 2e3, a.fn.bootstrapValidator.helpers.date(c, e, f) ? a.fn.bootstrapValidator.helpers.luhn(b) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.identical = a.extend(a.fn.bootstrapValidator.i18n.identical || {}, {
        "default": "Please enter the same value"
    }), a.fn.bootstrapValidator.validators.identical = {
        html5Attributes: {
            message: "message",
            field: "field"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            var e = a.getFieldElements(c.field);
            return null === e || 0 === e.length ? !0 : d === e.val() ? (a.updateStatus(c.field, a.STATUS_VALID, "identical"), !0) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.imei = a.extend(a.fn.bootstrapValidator.i18n.imei || {}, {
        "default": "Please enter a valid IMEI number"
    }), a.fn.bootstrapValidator.validators.imei = {
        validate: function(b, c) {
            var d = c.val();
            if ("" === d) return !0;
            switch (!0) {
                case /^\d{15}$/.test(d):
                case /^\d{2}-\d{6}-\d{6}-\d{1}$/.test(d):
                case /^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(d):
                    return d = d.replace(/[^0-9]/g, ""), a.fn.bootstrapValidator.helpers.luhn(d);
                case /^\d{14}$/.test(d):
                case /^\d{16}$/.test(d):
                case /^\d{2}-\d{6}-\d{6}(|-\d{2})$/.test(d):
                case /^\d{2}\s\d{6}\s\d{6}(|\s\d{2})$/.test(d):
                    return !0;
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.imo = a.extend(a.fn.bootstrapValidator.i18n.imo || {}, {
        "default": "Please enter a valid IMO number"
    }), a.fn.bootstrapValidator.validators.imo = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^IMO \d{7}$/i.test(c)) return !1;
            for (var d = 0, e = c.replace(/^.*(\d{7})$/, "$1"), f = 6; f >= 1; f--) d += e.slice(6 - f, -f) * (f + 1);
            return d % 10 === parseInt(e.charAt(6), 10)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.integer = a.extend(a.fn.bootstrapValidator.i18n.integer || {}, {
        "default": "Please enter a valid number"
    }), a.fn.bootstrapValidator.validators.integer = {
        enableByHtml5: function(a) {
            return "number" === a.attr("type") && (void 0 === a.attr("step") || a.attr("step") % 1 === 0)
        },
        validate: function(a, b) {
            if (this.enableByHtml5(b) && b.get(0).validity && b.get(0).validity.badInput === !0) return !1;
            var c = b.val();
            return "" === c ? !0 : /^(?:-?(?:0|[1-9][0-9]*))$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.ip = a.extend(a.fn.bootstrapValidator.i18n.ip || {}, {
        "default": "Please enter a valid IP address",
        ipv4: "Please enter a valid IPv4 address",
        ipv6: "Please enter a valid IPv6 address"
    }), a.fn.bootstrapValidator.validators.ip = {
        html5Attributes: {
            message: "message",
            ipv4: "ipv4",
            ipv6: "ipv6"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            d = a.extend({}, {
                ipv4: !0,
                ipv6: !0
            }, d);
            var f, g = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                h = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
                i = !1;
            switch (!0) {
                case d.ipv4 && !d.ipv6:
                    i = g.test(e), f = d.message || a.fn.bootstrapValidator.i18n.ip.ipv4;
                    break;
                case !d.ipv4 && d.ipv6:
                    i = h.test(e), f = d.message || a.fn.bootstrapValidator.i18n.ip.ipv6;
                    break;
                case d.ipv4 && d.ipv6:
                default:
                    i = g.test(e) || h.test(e), f = d.message || a.fn.bootstrapValidator.i18n.ip["default"]
            }
            return {
                valid: i,
                message: f
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.isbn = a.extend(a.fn.bootstrapValidator.i18n.isbn || {}, {
        "default": "Please enter a valid ISBN number"
    }), a.fn.bootstrapValidator.validators.isbn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            var d;
            switch (!0) {
                case /^\d{9}[\dX]$/.test(c):
                case 13 === c.length && /^(\d+)-(\d+)-(\d+)-([\dX])$/.test(c):
                case 13 === c.length && /^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(c):
                    d = "ISBN10";
                    break;
                case /^(978|979)\d{9}[\dX]$/.test(c):
                case 17 === c.length && /^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(c):
                case 17 === c.length && /^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(c):
                    d = "ISBN13";
                    break;
                default:
                    return !1
            }
            c = c.replace(/[^0-9X]/gi, "");
            var e, f, g = c.split(""),
                h = g.length,
                i = 0;
            switch (d) {
                case "ISBN10":
                    for (i = 0, e = 0; h - 1 > e; e++) i += parseInt(g[e], 10) * (10 - e);
                    return f = 11 - i % 11, 11 === f ? f = 0 : 10 === f && (f = "X"), f + "" === g[h - 1];
                case "ISBN13":
                    for (i = 0, e = 0; h - 1 > e; e++) i += e % 2 === 0 ? parseInt(g[e], 10) : 3 * parseInt(g[e], 10);
                    return f = 10 - i % 10, 10 === f && (f = "0"), f + "" === g[h - 1];
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.isin = a.extend(a.fn.bootstrapValidator.i18n.isin || {}, {
        "default": "Please enter a valid ISIN number"
    }), a.fn.bootstrapValidator.validators.isin = {
        COUNTRY_CODES: "AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW",
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            c = c.toUpperCase();
            var d = new RegExp("^(" + this.COUNTRY_CODES + ")[0-9A-Z]{10}$");
            if (!d.test(c)) return !1;
            for (var e = "", f = c.length, g = 0; f - 1 > g; g++) {
                var h = c.charCodeAt(g);
                e += h > 57 ? (h - 55).toString() : c.charAt(g)
            }
            var i = "",
                j = e.length,
                k = j % 2 !== 0 ? 0 : 1;
            for (g = 0; j > g; g++) i += parseInt(e[g], 10) * (g % 2 === k ? 2 : 1) + "";
            var l = 0;
            for (g = 0; g < i.length; g++) l += parseInt(i.charAt(g), 10);
            return l = (10 - l % 10) % 10, l + "" === c.charAt(f - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.ismn = a.extend(a.fn.bootstrapValidator.i18n.ismn || {}, {
        "default": "Please enter a valid ISMN number"
    }), a.fn.bootstrapValidator.validators.ismn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            var d;
            switch (!0) {
                case /^M\d{9}$/.test(c):
                case /^M-\d{4}-\d{4}-\d{1}$/.test(c):
                case /^M\s\d{4}\s\d{4}\s\d{1}$/.test(c):
                    d = "ISMN10";
                    break;
                case /^9790\d{9}$/.test(c):
                case /^979-0-\d{4}-\d{4}-\d{1}$/.test(c):
                case /^979\s0\s\d{4}\s\d{4}\s\d{1}$/.test(c):
                    d = "ISMN13";
                    break;
                default:
                    return !1
            }
            "ISMN10" === d && (c = "9790" + c.substr(1)), c = c.replace(/[^0-9]/gi, "");
            for (var e = c.length, f = 0, g = [1, 3], h = 0; e - 1 > h; h++) f += parseInt(c.charAt(h), 10) * g[h % 2];
            return f = 10 - f % 10, f + "" === c.charAt(e - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.issn = a.extend(a.fn.bootstrapValidator.i18n.issn || {}, {
        "default": "Please enter a valid ISSN number"
    }), a.fn.bootstrapValidator.validators.issn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^\d{4}\-\d{3}[\dX]$/.test(c)) return !1;
            c = c.replace(/[^0-9X]/gi, "");
            var d = c.split(""),
                e = d.length,
                f = 0;
            "X" === d[7] && (d[7] = 10);
            for (var g = 0; e > g; g++) f += parseInt(d[g], 10) * (8 - g);
            return f % 11 === 0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.lessThan = a.extend(a.fn.bootstrapValidator.i18n.lessThan || {}, {
        "default": "Please enter a value less than or equal to %s",
        notInclusive: "Please enter a value less than %s"
    }), a.fn.bootstrapValidator.validators.lessThan = {
        html5Attributes: {
            message: "message",
            value: "value",
            inclusive: "inclusive"
        },
        enableByHtml5: function(a) {
            var b = a.attr("type"),
                c = a.attr("max");
            return c && "date" !== b ? {
                value: c
            } : !1
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (!a.isNumeric(e)) return !1;
            var f = a.isNumeric(d.value) ? d.value : b.getDynamicOption(c, d.value);
            return e = parseFloat(e), d.inclusive === !0 || void 0 === d.inclusive ? {
                valid: f >= e,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.lessThan["default"], f)
            } : {
                valid: f > e,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.lessThan.notInclusive, f)
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.mac = a.extend(a.fn.bootstrapValidator.i18n.mac || {}, {
        "default": "Please enter a valid MAC address"
    }), a.fn.bootstrapValidator.validators.mac = {
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.meid = a.extend(a.fn.bootstrapValidator.i18n.meid || {}, {
        "default": "Please enter a valid MEID number"
    }), a.fn.bootstrapValidator.validators.meid = {
        validate: function(b, c) {
            var d = c.val();
            if ("" === d) return !0;
            switch (!0) {
                case /^[0-9A-F]{15}$/i.test(d):
                case /^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}[- ][0-9A-F]$/i.test(d):
                case /^\d{19}$/.test(d):
                case /^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}[- ]\d$/.test(d):
                    var e = d.charAt(d.length - 1);
                    if (d = d.replace(/[- ]/g, ""), d.match(/^\d*$/i)) return a.fn.bootstrapValidator.helpers.luhn(d);
                    d = d.slice(0, -1);
                    for (var f = "", g = 1; 13 >= g; g += 2) f += (2 * parseInt(d.charAt(g), 16)).toString(16);
                    var h = 0;
                    for (g = 0; g < f.length; g++) h += parseInt(f.charAt(g), 16);
                    return h % 10 === 0 ? "0" === e : e === (2 * (10 * Math.floor((h + 10) / 10) - h)).toString(16);
                case /^[0-9A-F]{14}$/i.test(d):
                case /^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}$/i.test(d):
                case /^\d{18}$/.test(d):
                case /^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}$/.test(d):
                    return !0;
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.notEmpty = a.extend(a.fn.bootstrapValidator.i18n.notEmpty || {}, {
        "default": "Please enter a value"
    }), a.fn.bootstrapValidator.validators.notEmpty = {
        enableByHtml5: function(a) {
            var b = a.attr("required") + "";
            return "required" === b || "true" === b
        },
        validate: function(b, c) {
            var d = c.attr("type");
            return "radio" === d || "checkbox" === d ? b.getFieldElements(c.attr("data-bv-field")).filter(":checked").length > 0 : "number" === d && c.get(0).validity && c.get(0).validity.badInput === !0 ? !0 : "" !== a.trim(c.val())
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.numeric = a.extend(a.fn.bootstrapValidator.i18n.numeric || {}, {
        "default": "Please enter a valid float number"
    }), a.fn.bootstrapValidator.validators.numeric = {
        html5Attributes: {
            message: "message",
            separator: "separator"
        },
        enableByHtml5: function(a) {
            return "number" === a.attr("type") && void 0 !== a.attr("step") && a.attr("step") % 1 !== 0
        },
        validate: function(a, b, c) {
            if (this.enableByHtml5(b) && b.get(0).validity && b.get(0).validity.badInput === !0) return !1;
            var d = b.val();
            if ("" === d) return !0;
            var e = c.separator || ".";
            return "." !== e && (d = d.replace(e, ".")), !isNaN(parseFloat(d)) && isFinite(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.phone = a.extend(a.fn.bootstrapValidator.i18n.phone || {}, {
        "default": "Please enter a valid phone number",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid phone number in %s",
        countries: {
            BR: "Brazil",
            CN: "China",
            CZ: "Czech Republic",
            DK: "Denmark",
            ES: "Spain",
            FR: "France",
            GB: "United Kingdom",
            MA: "Morocco",
            PK: "Pakistan",
            RO: "Romania",
            RU: "Russia",
            SK: "Slovakia",
            TH: "Thailand",
            US: "USA",
            VE: "Venezuela"
        }
    }), a.fn.bootstrapValidator.validators.phone = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        COUNTRY_CODES: ["BR", "CN", "CZ", "DK", "ES", "FR", "GB", "MA", "PK", "RO", "RU", "SK", "TH", "US", "VE"],
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = d.country;
            if (("string" != typeof f || -1 === a.inArray(f, this.COUNTRY_CODES)) && (f = b.getDynamicOption(c, f)), !f || -1 === a.inArray(f.toUpperCase(), this.COUNTRY_CODES)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.phone.countryNotSupported, f)
            };
            var g = !0;
            switch (f.toUpperCase()) {
                case "BR":
                    e = a.trim(e), g = /^(([\d]{4}[-.\s]{1}[\d]{2,3}[-.\s]{1}[\d]{2}[-.\s]{1}[\d]{2})|([\d]{4}[-.\s]{1}[\d]{3}[-.\s]{1}[\d]{4})|((\(?\+?[0-9]{2}\)?\s?)?(\(?\d{2}\)?\s?)?\d{4,5}[-.\s]?\d{4}))$/.test(e);
                    break;
                case "CN":
                    e = a.trim(e), g = /^((00|\+)?(86(?:-| )))?((\d{11})|(\d{3}[- ]{1}\d{4}[- ]{1}\d{4})|((\d{2,4}[- ]){1}(\d{7,8}|(\d{3,4}[- ]{1}\d{4}))([- ]{1}\d{1,4})?))$/.test(e);
                    break;
                case "CZ":
                    g = /^(((00)([- ]?)|\+)(420)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(e);
                    break;
                case "DK":
                    e = a.trim(e), g = /^(\+45|0045|\(45\))?\s?[2-9](\s?\d){7}$/.test(e);
                    break;
                case "ES":
                    e = a.trim(e), g = /^(?:(?:(?:\+|00)34\D?))?(?:9|6)(?:\d\D?){8}$/.test(e);
                    break;
                case "FR":
                    e = a.trim(e), g = /^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}$/.test(e);
                    break;
                case "GB":
                    e = a.trim(e), g = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/.test(e);
                    break;
                case "MA":
                    e = a.trim(e), g = /^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$/.test(e);
                    break;
                case "PK":
                    e = a.trim(e), g = /^0?3[0-9]{2}[0-9]{7}$/.test(e);
                    break;
                case "RO":
                    g = /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/g.test(e);
                    break;
                case "RU":
                    g = /^((8|\+7|007)[\-\.\/ ]?)?([\(\/\.]?\d{3}[\)\/\.]?[\-\.\/ ]?)?[\d\-\.\/ ]{7,10}$/g.test(e);
                    break;
                case "SK":
                    g = /^(((00)([- ]?)|\+)(420)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(e);
                    break;
                case "TH":
                    g = /^0\(?([6|8-9]{2})*-([0-9]{3})*-([0-9]{4})$/.test(e);
                    break;
                case "VE":
                    e = a.trim(e), g = /^0(?:2(?:12|4[0-9]|5[1-9]|6[0-9]|7[0-8]|8[1-35-8]|9[1-5]|3[45789])|4(?:1[246]|2[46]))\d{7}$/.test(e);
                    break;
                case "US":
                default:
                    e = e.replace(/\D/g, ""), g = /^(?:(1\-?)|(\+1 ?))?\(?(\d{3})[\)\-\.]?(\d{3})[\-\.]?(\d{4})$/.test(e) && 10 === e.length
            }
            return {
                valid: g,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.phone.country, a.fn.bootstrapValidator.i18n.phone.countries[f])
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.regexp = a.extend(a.fn.bootstrapValidator.i18n.regexp || {}, {
        "default": "Please enter a value matching the pattern"
    }), a.fn.bootstrapValidator.validators.regexp = {
        html5Attributes: {
            message: "message",
            regexp: "regexp"
        },
        enableByHtml5: function(a) {
            var b = a.attr("pattern");
            return b ? {
                regexp: b
            } : !1
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            var e = "string" == typeof c.regexp ? new RegExp(c.regexp) : c.regexp;
            return e.test(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.remote = a.extend(a.fn.bootstrapValidator.i18n.remote || {}, {
        "default": "Please enter a valid value"
    }), a.fn.bootstrapValidator.validators.remote = {
        html5Attributes: {
            message: "message",
            name: "name",
            type: "type",
            url: "url",
            delay: "delay"
        },
        destroy: function(a, b) {
            b.data("bv.remote.timer") && (clearTimeout(b.data("bv.remote.timer")), b.removeData("bv.remote.timer"))
        },
        validate: function(b, c, d) {
            function e() {
                var b = a.ajax({
                    type: k,
                    headers: l,
                    url: j,
                    dataType: "json",
                    data: i
                });
                return b.then(function(a) {
                    a.valid = a.valid === !0 || "true" === a.valid, g.resolve(c, "remote", a)
                }), g.fail(function() {
                    b.abort()
                }), g
            }
            var f = c.val(),
                g = new a.Deferred;
            if ("" === f) return g.resolve(c, "remote", {
                valid: !0
            }), g;
            var h = c.attr("data-bv-field"),
                i = d.data || {},
                j = d.url,
                k = d.type || "GET",
                l = d.headers || {};
            return "function" == typeof i && (i = i.call(this, b)), "function" == typeof j && (j = j.call(this, b)), i[d.name || h] = f, d.delay ? (c.data("bv.remote.timer") && clearTimeout(c.data("bv.remote.timer")), c.data("bv.remote.timer", setTimeout(e, d.delay)), g) : e()
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.rtn = a.extend(a.fn.bootstrapValidator.i18n.rtn || {}, {
        "default": "Please enter a valid RTN number"
    }), a.fn.bootstrapValidator.validators.rtn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^\d{9}$/.test(c)) return !1;
            for (var d = 0, e = 0; e < c.length; e += 3) d += 3 * parseInt(c.charAt(e), 10) + 7 * parseInt(c.charAt(e + 1), 10) + parseInt(c.charAt(e + 2), 10);
            return 0 !== d && d % 10 === 0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.sedol = a.extend(a.fn.bootstrapValidator.i18n.sedol || {}, {
        "default": "Please enter a valid SEDOL number"
    }), a.fn.bootstrapValidator.validators.sedol = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (c = c.toUpperCase(), !/^[0-9A-Z]{7}$/.test(c)) return !1;
            for (var d = 0, e = [1, 3, 1, 7, 3, 9, 1], f = c.length, g = 0; f - 1 > g; g++) d += e[g] * parseInt(c.charAt(g), 36);
            return d = (10 - d % 10) % 10, d + "" === c.charAt(f - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.siren = a.extend(a.fn.bootstrapValidator.i18n.siren || {}, {
        "default": "Please enter a valid SIREN number"
    }), a.fn.bootstrapValidator.validators.siren = {
        validate: function(b, c) {
            var d = c.val();
            return "" === d ? !0 : /^\d{9}$/.test(d) ? a.fn.bootstrapValidator.helpers.luhn(d) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.siret = a.extend(a.fn.bootstrapValidator.i18n.siret || {}, {
        "default": "Please enter a valid SIRET number"
    }), a.fn.bootstrapValidator.validators.siret = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            for (var d, e = 0, f = c.length, g = 0; f > g; g++) d = parseInt(c.charAt(g), 10), g % 2 === 0 && (d = 2 * d, d > 9 && (d -= 9)), e += d;
            return e % 10 === 0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.step = a.extend(a.fn.bootstrapValidator.i18n.step || {}, {
        "default": "Please enter a valid step of %s"
    }), a.fn.bootstrapValidator.validators.step = {
        html5Attributes: {
            message: "message",
            base: "baseValue",
            step: "step"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (d = a.extend({}, {
                    baseValue: 0,
                    step: 1
                }, d), e = parseFloat(e), !a.isNumeric(e)) return !1;
            var f = function(a, b) {
                    var c = Math.pow(10, b);
                    a *= c;
                    var d = a > 0 | -(0 > a),
                        e = a % 1 === .5 * d;
                    return e ? (Math.floor(a) + (d > 0)) / c : Math.round(a) / c
                },
                g = function(a, b) {
                    if (0 === b) return 1;
                    var c = (a + "").split("."),
                        d = (b + "").split("."),
                        e = (1 === c.length ? 0 : c[1].length) + (1 === d.length ? 0 : d[1].length);
                    return f(a - b * Math.floor(a / b), e)
                },
                h = g(e - d.baseValue, d.step);
            return {
                valid: 0 === h || h === d.step,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.step["default"], [d.step])
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.stringCase = a.extend(a.fn.bootstrapValidator.i18n.stringCase || {}, {
        "default": "Please enter only lowercase characters",
        upper: "Please enter only uppercase characters"
    }), a.fn.bootstrapValidator.validators.stringCase = {
        html5Attributes: {
            message: "message",
            "case": "case"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = (d["case"] || "lower").toLowerCase();
            return {
                valid: "upper" === f ? e === e.toUpperCase() : e === e.toLowerCase(),
                message: d.message || ("upper" === f ? a.fn.bootstrapValidator.i18n.stringCase.upper : a.fn.bootstrapValidator.i18n.stringCase["default"])
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.stringLength = a.extend(a.fn.bootstrapValidator.i18n.stringLength || {}, {
        "default": "Please enter a value with valid length",
        less: "Please enter less than %s characters",
        more: "Please enter more than %s characters",
        between: "Please enter value between %s and %s characters long"
    }), a.fn.bootstrapValidator.validators.stringLength = {
        html5Attributes: {
            message: "message",
            min: "min",
            max: "max"
        },
        enableByHtml5: function(b) {
            var c = {},
                d = b.attr("maxlength"),
                e = b.attr("minlength");
            return d && (c.max = parseInt(d, 10)), e && (c.min = parseInt(e, 10)), a.isEmptyObject(c) ? !1 : c
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = a.isNumeric(d.min) ? d.min : b.getDynamicOption(c, d.min),
                g = a.isNumeric(d.max) ? d.max : b.getDynamicOption(c, d.max),
                h = e.length,
                i = !0,
                j = d.message || a.fn.bootstrapValidator.i18n.stringLength["default"];
            switch ((f && h < parseInt(f, 10) || g && h > parseInt(g, 10)) && (i = !1), !0) {
                case !!f && !!g:
                    j = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.stringLength.between, [parseInt(f, 10), parseInt(g, 10)]);
                    break;
                case !!f:
                    j = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.stringLength.more, parseInt(f, 10));
                    break;
                case !!g:
                    j = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.stringLength.less, parseInt(g, 10))
            }
            return {
                valid: i,
                message: j
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.uri = a.extend(a.fn.bootstrapValidator.i18n.uri || {}, {
        "default": "Please enter a valid URI"
    }), a.fn.bootstrapValidator.validators.uri = {
        html5Attributes: {
            message: "message",
            allowlocal: "allowLocal",
            protocol: "protocol"
        },
        enableByHtml5: function(a) {
            return "url" === a.attr("type")
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            var e = c.allowLocal === !0 || "true" === c.allowLocal,
                f = (c.protocol || "http, https, ftp").split(",").join("|").replace(/\s/g, ""),
                g = new RegExp("^(?:(?:" + f + ")://)(?:\\S+(?::\\S*)?@)?(?:" + (e ? "" : "(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})") + "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" + (e ? "?" : "") + ")(?::\\d{2,5})?(?:/[^\\s]*)?$", "i");
            return g.test(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.uuid = a.extend(a.fn.bootstrapValidator.i18n.uuid || {}, {
        "default": "Please enter a valid UUID number",
        version: "Please enter a valid UUID version %s number"
    }), a.fn.bootstrapValidator.validators.uuid = {
        html5Attributes: {
            message: "message",
            version: "version"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = {
                    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
                    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
                },
                g = d.version ? d.version + "" : "all";
            return {
                valid: null === f[g] ? !0 : f[g].test(e),
                message: d.version ? a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.uuid.version, d.version) : d.message || a.fn.bootstrapValidator.i18n.uuid["default"]
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.vat = a.extend(a.fn.bootstrapValidator.i18n.vat || {}, {
        "default": "Please enter a valid VAT number",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid VAT number in %s",
        countries: {
            AT: "Austria",
            BE: "Belgium",
            BG: "Bulgaria",
            BR: "Brazil",
            CH: "Switzerland",
            CY: "Cyprus",
            CZ: "Czech Republic",
            DE: "Germany",
            DK: "Denmark",
            EE: "Estonia",
            ES: "Spain",
            FI: "Finland",
            FR: "France",
            GB: "United Kingdom",
            GR: "Greek",
            EL: "Greek",
            HU: "Hungary",
            HR: "Croatia",
            IE: "Ireland",
            IS: "Iceland",
            IT: "Italy",
            LT: "Lithuania",
            LU: "Luxembourg",
            LV: "Latvia",
            MT: "Malta",
            NL: "Netherlands",
            NO: "Norway",
            PL: "Poland",
            PT: "Portugal",
            RO: "Romania",
            RU: "Russia",
            RS: "Serbia",
            SE: "Sweden",
            SI: "Slovenia",
            SK: "Slovakia",
            VE: "Venezuela",
            ZA: "South Africa"
        }
    }), a.fn.bootstrapValidator.validators.vat = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        COUNTRY_CODES: ["AT", "BE", "BG", "BR", "CH", "CY", "CZ", "DE", "DK", "EE", "EL", "ES", "FI", "FR", "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LT", "LU", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "RU", "RS", "SE", "SK", "SI", "VE", "ZA"],
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = d.country;
            if (f ? ("string" != typeof f || -1 === a.inArray(f.toUpperCase(), this.COUNTRY_CODES)) && (f = b.getDynamicOption(c, f)) : f = e.substr(0, 2), -1 === a.inArray(f, this.COUNTRY_CODES)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.vat.countryNotSupported, f)
            };
            var g = ["_", f.toLowerCase()].join("");
            return this[g](e) ? !0 : {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.vat.country, a.fn.bootstrapValidator.i18n.vat.countries[f.toUpperCase()])
            }
        },
        _at: function(a) {
            if (/^ATU[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^U[0-9]{8}$/.test(a)) return !1;
            a = a.substr(1);
            for (var b = 0, c = [1, 2, 1, 2, 1, 2, 1], d = 0, e = 0; 7 > e; e++) d = parseInt(a.charAt(e), 10) * c[e], d > 9 && (d = Math.floor(d / 10) + d % 10), b += d;
            return b = 10 - (b + 4) % 10, 10 === b && (b = 0), b + "" === a.substr(7, 1)
        },
        _be: function(a) {
            if (/^BE[0]{0,1}[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0]{0,1}[0-9]{9}$/.test(a)) return !1;
            if (9 === a.length && (a = "0" + a), "0" === a.substr(1, 1)) return !1;
            var b = parseInt(a.substr(0, 8), 10) + parseInt(a.substr(8, 2), 10);
            return b % 97 === 0
        },
        _bg: function(b) {
            if (/^BG[0-9]{9,10}$/.test(b) && (b = b.substr(2)), !/^[0-9]{9,10}$/.test(b)) return !1;
            var c = 0,
                d = 0;
            if (9 === b.length) {
                for (d = 0; 8 > d; d++) c += parseInt(b.charAt(d), 10) * (d + 1);
                if (c %= 11, 10 === c)
                    for (c = 0, d = 0; 8 > d; d++) c += parseInt(b.charAt(d), 10) * (d + 3);
                return c %= 10, c + "" === b.substr(8)
            }
            if (10 === b.length) {
                var e = function(b) {
                        var c = parseInt(b.substr(0, 2), 10) + 1900,
                            d = parseInt(b.substr(2, 2), 10),
                            e = parseInt(b.substr(4, 2), 10);
                        if (d > 40 ? (c += 100, d -= 40) : d > 20 && (c -= 100, d -= 20), !a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
                        for (var f = 0, g = [2, 4, 8, 5, 10, 9, 7, 3, 6], h = 0; 9 > h; h++) f += parseInt(b.charAt(h), 10) * g[h];
                        return f = f % 11 % 10, f + "" === b.substr(9, 1)
                    },
                    f = function(a) {
                        for (var b = 0, c = [21, 19, 17, 13, 11, 9, 7, 3, 1], d = 0; 9 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
                        return b %= 10, b + "" === a.substr(9, 1)
                    },
                    g = function(a) {
                        for (var b = 0, c = [4, 3, 2, 7, 6, 5, 4, 3, 2], d = 0; 9 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
                        return b = 11 - b % 11, 10 === b ? !1 : (11 === b && (b = 0), b + "" === a.substr(9, 1))
                    };
                return e(b) || f(b) || g(b)
            }
            return !1
        },
        _br: function(a) {
            if ("" === a) return !0;
            var b = a.replace(/[^\d]+/g, "");
            if ("" === b || 14 !== b.length) return !1;
            if ("00000000000000" === b || "11111111111111" === b || "22222222222222" === b || "33333333333333" === b || "44444444444444" === b || "55555555555555" === b || "66666666666666" === b || "77777777777777" === b || "88888888888888" === b || "99999999999999" === b) return !1;
            for (var c = b.length - 2, d = b.substring(0, c), e = b.substring(c), f = 0, g = c - 7, h = c; h >= 1; h--) f += parseInt(d.charAt(c - h), 10) * g--, 2 > g && (g = 9);
            var i = 2 > f % 11 ? 0 : 11 - f % 11;
            if (i !== parseInt(e.charAt(0), 10)) return !1;
            for (c += 1, d = b.substring(0, c), f = 0, g = c - 7, h = c; h >= 1; h--) f += parseInt(d.charAt(c - h), 10) * g--, 2 > g && (g = 9);
            return i = 2 > f % 11 ? 0 : 11 - f % 11, i === parseInt(e.charAt(1), 10)
        },
        _ch: function(a) {
            if (/^CHE[0-9]{9}(MWST)?$/.test(a) && (a = a.substr(2)), !/^E[0-9]{9}(MWST)?$/.test(a)) return !1;
            a = a.substr(1);
            for (var b = 0, c = [5, 4, 3, 2, 7, 6, 5, 4], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 10 === b ? !1 : (11 === b && (b = 0), b + "" === a.substr(8, 1))
        },
        _cy: function(a) {
            if (/^CY[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(a) && (a = a.substr(2)), !/^[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(a)) return !1;
            if ("12" === a.substr(0, 2)) return !1;
            for (var b = 0, c = {
                    0: 1,
                    1: 0,
                    2: 5,
                    3: 7,
                    4: 9,
                    5: 13,
                    6: 15,
                    7: 17,
                    8: 19,
                    9: 21
                }, d = 0; 8 > d; d++) {
                var e = parseInt(a.charAt(d), 10);
                d % 2 === 0 && (e = c[e + ""]), b += e
            }
            return b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" [b % 26], b + "" === a.substr(8, 1)
        },
        _cz: function(b) {
            if (/^CZ[0-9]{8,10}$/.test(b) && (b = b.substr(2)), !/^[0-9]{8,10}$/.test(b)) return !1;
            var c = 0,
                d = 0;
            if (8 === b.length) {
                if (b.charAt(0) + "" == "9") return !1;
                for (c = 0, d = 0; 7 > d; d++) c += parseInt(b.charAt(d), 10) * (8 - d);
                return c = 11 - c % 11, 10 === c && (c = 0), 11 === c && (c = 1), c + "" === b.substr(7, 1)
            }
            if (9 === b.length && b.charAt(0) + "" == "6") {
                for (c = 0, d = 0; 7 > d; d++) c += parseInt(b.charAt(d + 1), 10) * (8 - d);
                return c = 11 - c % 11, 10 === c && (c = 0), 11 === c && (c = 1), c = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 10][c - 1], c + "" === b.substr(8, 1)
            }
            if (9 === b.length || 10 === b.length) {
                var e = 1900 + parseInt(b.substr(0, 2), 10),
                    f = parseInt(b.substr(2, 2), 10) % 50 % 20,
                    g = parseInt(b.substr(4, 2), 10);
                if (9 === b.length) {
                    if (e >= 1980 && (e -= 100), e > 1953) return !1
                } else 1954 > e && (e += 100);
                if (!a.fn.bootstrapValidator.helpers.date(e, f, g)) return !1;
                if (10 === b.length) {
                    var h = parseInt(b.substr(0, 9), 10) % 11;
                    return 1985 > e && (h %= 10), h + "" === b.substr(9, 1)
                }
                return !0
            }
            return !1
        },
        _de: function(b) {
            return /^DE[0-9]{9}$/.test(b) && (b = b.substr(2)), /^[0-9]{9}$/.test(b) ? a.fn.bootstrapValidator.helpers.mod11And10(b) : !1
        },
        _dk: function(a) {
            if (/^DK[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [2, 7, 6, 5, 4, 3, 2, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 11 === 0
        },
        _ee: function(a) {
            if (/^EE[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            for (var b = 0, c = [3, 7, 1, 3, 7, 1, 3, 7, 1], d = 0; 9 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 10 === 0
        },
        _es: function(a) {
            if (/^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(a) && (a = a.substr(2)), !/^[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(a)) return !1;
            var b = function(a) {
                    var b = parseInt(a.substr(0, 8), 10);
                    return b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b + "" === a.substr(8, 1)
                },
                c = function(a) {
                    var b = ["XYZ".indexOf(a.charAt(0)), a.substr(1)].join("");
                    return b = parseInt(b, 10), b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b + "" === a.substr(8, 1)
                },
                d = function(a) {
                    var b, c = a.charAt(0);
                    if (-1 !== "KLM".indexOf(c)) return b = parseInt(a.substr(1, 8), 10), b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b + "" === a.substr(8, 1);
                    if (-1 !== "ABCDEFGHJNPQRSUVW".indexOf(c)) {
                        for (var d = 0, e = [2, 1, 2, 1, 2, 1, 2], f = 0, g = 0; 7 > g; g++) f = parseInt(a.charAt(g + 1), 10) * e[g], f > 9 && (f = Math.floor(f / 10) + f % 10), d += f;
                        return d = 10 - d % 10, d + "" === a.substr(8, 1) || "JABCDEFGHI" [d] === a.substr(8, 1)
                    }
                    return !1
                },
                e = a.charAt(0);
            return /^[0-9]$/.test(e) ? b(a) : /^[XYZ]$/.test(e) ? c(a) : d(a)
        },
        _fi: function(a) {
            if (/^FI[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [7, 9, 10, 5, 8, 4, 2, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 11 === 0
        },
        _fr: function(b) {
            if (/^FR[0-9A-Z]{2}[0-9]{9}$/.test(b) && (b = b.substr(2)), !/^[0-9A-Z]{2}[0-9]{9}$/.test(b)) return !1;
            if (!a.fn.bootstrapValidator.helpers.luhn(b.substr(2))) return !1;
            if (/^[0-9]{2}$/.test(b.substr(0, 2))) return b.substr(0, 2) === parseInt(b.substr(2) + "12", 10) % 97 + "";
            var c, d = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
            return c = /^[0-9]{1}$/.test(b.charAt(0)) ? 24 * d.indexOf(b.charAt(0)) + d.indexOf(b.charAt(1)) - 10 : 34 * d.indexOf(b.charAt(0)) + d.indexOf(b.charAt(1)) - 100, (parseInt(b.substr(2), 10) + 1 + Math.floor(c / 11)) % 11 === c % 11
        },
        _gb: function(a) {
            if ((/^GB[0-9]{9}$/.test(a) || /^GB[0-9]{12}$/.test(a) || /^GBGD[0-9]{3}$/.test(a) || /^GBHA[0-9]{3}$/.test(a) || /^GB(GD|HA)8888[0-9]{5}$/.test(a)) && (a = a.substr(2)), !(/^[0-9]{9}$/.test(a) || /^[0-9]{12}$/.test(a) || /^GD[0-9]{3}$/.test(a) || /^HA[0-9]{3}$/.test(a) || /^(GD|HA)8888[0-9]{5}$/.test(a))) return !1;
            var b = a.length;
            if (5 === b) {
                var c = a.substr(0, 2),
                    d = parseInt(a.substr(2), 10);
                return "GD" === c && 500 > d || "HA" === c && d >= 500
            }
            if (11 === b && ("GD8888" === a.substr(0, 6) || "HA8888" === a.substr(0, 6))) return "GD" === a.substr(0, 2) && parseInt(a.substr(6, 3), 10) >= 500 || "HA" === a.substr(0, 2) && parseInt(a.substr(6, 3), 10) < 500 ? !1 : parseInt(a.substr(6, 3), 10) % 97 === parseInt(a.substr(9, 2), 10);
            if (9 === b || 12 === b) {
                for (var e = 0, f = [8, 7, 6, 5, 4, 3, 2, 10, 1], g = 0; 9 > g; g++) e += parseInt(a.charAt(g), 10) * f[g];
                return e %= 97, parseInt(a.substr(0, 3), 10) >= 100 ? 0 === e || 42 === e || 55 === e : 0 === e
            }
            return !0
        },
        _gr: function(a) {
            if (/^(GR|EL)[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            8 === a.length && (a = "0" + a);
            for (var b = 0, c = [256, 128, 64, 32, 16, 8, 4, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = b % 11 % 10, b + "" === a.substr(8, 1)
        },
        _el: function(a) {
            return this._gr(a)
        },
        _hu: function(a) {
            if (/^HU[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [9, 7, 3, 1, 9, 7, 3, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 10 === 0
        },
        _hr: function(b) {
            return /^HR[0-9]{11}$/.test(b) && (b = b.substr(2)), /^[0-9]{11}$/.test(b) ? a.fn.bootstrapValidator.helpers.mod11And10(b) : !1
        },
        _ie: function(a) {
            if (/^IE[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(a) && (a = a.substr(2)), !/^[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(a)) return !1;
            var b = function(a) {
                for (; a.length < 7;) a = "0" + a;
                for (var b = "WABCDEFGHIJKLMNOPQRSTUV", c = 0, d = 0; 7 > d; d++) c += parseInt(a.charAt(d), 10) * (8 - d);
                return c += 9 * b.indexOf(a.substr(7)), b[c % 23]
            };
            return /^[0-9]+$/.test(a.substr(0, 7)) ? a.charAt(7) === b(a.substr(0, 7) + a.substr(8) + "") : -1 !== "ABCDEFGHIJKLMNOPQRSTUVWXYZ+*".indexOf(a.charAt(1)) ? a.charAt(7) === b(a.substr(2, 5) + a.substr(0, 1) + "") : !0
        },
        _is: function(a) {
            return /^IS[0-9]{5,6}$/.test(a) && (a = a.substr(2)), /^[0-9]{5,6}$/.test(a)
        },
        _it: function(b) {
            if (/^IT[0-9]{11}$/.test(b) && (b = b.substr(2)), !/^[0-9]{11}$/.test(b)) return !1;
            if (0 === parseInt(b.substr(0, 7), 10)) return !1;
            var c = parseInt(b.substr(7, 3), 10);
            return 1 > c || c > 201 && 999 !== c && 888 !== c ? !1 : a.fn.bootstrapValidator.helpers.luhn(b)
        },
        _lt: function(a) {
            if (/^LT([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(a) && (a = a.substr(2)), !/^([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(a)) return !1;
            var b, c = a.length,
                d = 0;
            for (b = 0; c - 1 > b; b++) d += parseInt(a.charAt(b), 10) * (1 + b % 9);
            var e = d % 11;
            if (10 === e)
                for (d = 0, b = 0; c - 1 > b; b++) d += parseInt(a.charAt(b), 10) * (1 + (b + 2) % 9);
            return e = e % 11 % 10, e + "" === a.charAt(c - 1)
        },
        _lu: function(a) {
            return /^LU[0-9]{8}$/.test(a) && (a = a.substr(2)), /^[0-9]{8}$/.test(a) ? parseInt(a.substr(0, 6), 10) % 89 + "" === a.substr(6, 2) : !1
        },
        _lv: function(b) {
            if (/^LV[0-9]{11}$/.test(b) && (b = b.substr(2)), !/^[0-9]{11}$/.test(b)) return !1;
            var c, d = parseInt(b.charAt(0), 10),
                e = 0,
                f = [],
                g = b.length;
            if (d > 3) {
                for (e = 0, f = [9, 1, 4, 8, 3, 10, 2, 5, 7, 6, 1], c = 0; g > c; c++) e += parseInt(b.charAt(c), 10) * f[c];
                return e %= 11, 3 === e
            }
            var h = parseInt(b.substr(0, 2), 10),
                i = parseInt(b.substr(2, 2), 10),
                j = parseInt(b.substr(4, 2), 10);
            if (j = j + 1800 + 100 * parseInt(b.charAt(6), 10), !a.fn.bootstrapValidator.helpers.date(j, i, h)) return !1;
            for (e = 0, f = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], c = 0; g - 1 > c; c++) e += parseInt(b.charAt(c), 10) * f[c];
            return e = (e + 1) % 11 % 10, e + "" === b.charAt(g - 1)
        },
        _mt: function(a) {
            if (/^MT[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [3, 4, 6, 7, 8, 9, 10, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 37 === 0
        },
        _nl: function(a) {
            if (/^NL[0-9]{9}B[0-9]{2}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}B[0-9]{2}$/.test(a)) return !1;
            for (var b = 0, c = [9, 8, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b %= 11, b > 9 && (b = 0), b + "" === a.substr(8, 1)
        },
        _no: function(a) {
            if (/^NO[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            for (var b = 0, c = [3, 2, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 11 === b && (b = 0), b + "" === a.substr(8, 1)
        },
        _pl: function(a) {
            if (/^PL[0-9]{10}$/.test(a) && (a = a.substr(2)), !/^[0-9]{10}$/.test(a)) return !1;
            for (var b = 0, c = [6, 5, 7, 2, 3, 4, 5, 6, 7, -1], d = 0; 10 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 11 === 0
        },
        _pt: function(a) {
            if (/^PT[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            for (var b = 0, c = [9, 8, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, b > 9 && (b = 0), b + "" === a.substr(8, 1)
        },
        _ro: function(a) {
            if (/^RO[1-9][0-9]{1,9}$/.test(a) && (a = a.substr(2)), !/^[1-9][0-9]{1,9}$/.test(a)) return !1;
            for (var b = a.length, c = [7, 5, 3, 2, 1, 7, 5, 3, 2].slice(10 - b), d = 0, e = 0; b - 1 > e; e++) d += parseInt(a.charAt(e), 10) * c[e];
            return d = 10 * d % 11 % 10, d + "" === a.substr(b - 1, 1)
        },
        _ru: function(a) {
            if (/^RU([0-9]{10}|[0-9]{12})$/.test(a) && (a = a.substr(2)), !/^([0-9]{10}|[0-9]{12})$/.test(a)) return !1;
            var b = 0;
            if (10 === a.length) {
                var c = 0,
                    d = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
                for (b = 0; 10 > b; b++) c += parseInt(a.charAt(b), 10) * d[b];
                return c %= 11, c > 9 && (c %= 10), c + "" === a.substr(9, 1)
            }
            if (12 === a.length) {
                var e = 0,
                    f = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0],
                    g = 0,
                    h = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
                for (b = 0; 11 > b; b++) e += parseInt(a.charAt(b), 10) * f[b], g += parseInt(a.charAt(b), 10) * h[b];
                return e %= 11, e > 9 && (e %= 10), g %= 11, g > 9 && (g %= 10), e + "" === a.substr(10, 1) && g + "" === a.substr(11, 1)
            }
            return !1
        },
        _rs: function(a) {
            if (/^RS[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            for (var b = 10, c = 0, d = 0; 8 > d; d++) c = (parseInt(a.charAt(d), 10) + b) % 10, 0 === c && (c = 10), b = 2 * c % 11;
            return (b + parseInt(a.substr(8, 1), 10)) % 10 === 1
        },
        _se: function(b) {
            return /^SE[0-9]{10}01$/.test(b) && (b = b.substr(2)), /^[0-9]{10}01$/.test(b) ? (b = b.substr(0, 10), a.fn.bootstrapValidator.helpers.luhn(b)) : !1
        },
        _si: function(a) {
            if (/^SI[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [8, 7, 6, 5, 4, 3, 2], d = 0; 7 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 10 === b && (b = 0), b + "" === a.substr(7, 1)
        },
        _sk: function(a) {
            return /^SK[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(a) && (a = a.substr(2)), /^[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(a) ? parseInt(a, 10) % 11 === 0 : !1
        },
        _ve: function(a) {
            if (/^VE[VEJPG][0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[VEJPG][0-9]{9}$/.test(a)) return !1;
            for (var b = {
                    V: 4,
                    E: 8,
                    J: 12,
                    P: 16,
                    G: 20
                }, c = b[a.charAt(0)], d = [3, 2, 7, 6, 5, 4, 3, 2], e = 0; 8 > e; e++) c += parseInt(a.charAt(e + 1), 10) * d[e];
            return c = 11 - c % 11, (11 === c || 10 === c) && (c = 0), c + "" === a.substr(9, 1)
        },
        _za: function(a) {
            return /^ZA4[0-9]{9}$/.test(a) && (a = a.substr(2)), /^4[0-9]{9}$/.test(a)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.vin = a.extend(a.fn.bootstrapValidator.i18n.vin || {}, {
        "default": "Please enter a valid VIN number"
    }), a.fn.bootstrapValidator.validators.vin = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/i.test(c)) return !1;
            c = c.toUpperCase();
            for (var d = {
                    A: 1,
                    B: 2,
                    C: 3,
                    D: 4,
                    E: 5,
                    F: 6,
                    G: 7,
                    H: 8,
                    J: 1,
                    K: 2,
                    L: 3,
                    M: 4,
                    N: 5,
                    P: 7,
                    R: 9,
                    S: 2,
                    T: 3,
                    U: 4,
                    V: 5,
                    W: 6,
                    X: 7,
                    Y: 8,
                    Z: 9,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    0: 0
                }, e = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2], f = 0, g = c.length, h = 0; g > h; h++) f += d[c.charAt(h) + ""] * e[h];
            var i = f % 11;
            return 10 === i && (i = "X"), i + "" === c.charAt(8)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.zipCode = a.extend(a.fn.bootstrapValidator.i18n.zipCode || {}, {
        "default": "Please enter a valid postal code",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid postal code in %s",
        countries: {
            BR: "Brazil",
            CA: "Canada",
            CZ: "Czech Republic",
            DK: "Denmark",
            GB: "United Kingdom",
            IT: "Italy",
            MA: "Morocco",
            NL: "Netherlands",
            RO: "Romania",
            RU: "Russia",
            SE: "Sweden",
            SG: "Singapore",
            SK: "Slovakia",
            US: "USA"
        }
    }), a.fn.bootstrapValidator.validators.zipCode = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        COUNTRY_CODES: ["BR", "CA", "CZ", "DK", "GB", "IT", "MA", "NL", "RO", "RU", "SE", "SG", "SK", "US"],
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e || !d.country) return !0;
            var f = d.country;
            if (("string" != typeof f || -1 === a.inArray(f, this.COUNTRY_CODES)) && (f = b.getDynamicOption(c, f)), !f || -1 === a.inArray(f.toUpperCase(), this.COUNTRY_CODES)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.zipCode.countryNotSupported, f)
            };
            var g = !1;
            switch (f = f.toUpperCase()) {
                case "BR":
                    g = /^(\d{2})([\.]?)(\d{3})([\-]?)(\d{3})$/.test(e);
                    break;
                case "CA":
                    g = /^(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}\s?[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}[0-9]{1}$/i.test(e);
                    break;
                case "CZ":
                    g = /^(\d{3})([ ]?)(\d{2})$/.test(e);
                    break;
                case "DK":
                    g = /^(DK(-|\s)?)?\d{4}$/i.test(e);
                    break;
                case "GB":
                    g = this._gb(e);
                    break;
                case "IT":
                    g = /^(I-|IT-)?\d{5}$/i.test(e);
                    break;
                case "MA":
                    g = /^[1-9][0-9]{4}$/i.test(e);
                    break;
                case "NL":
                    g = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(e);
                    break;
                case "RO":
                    g = /^(0[1-8]{1}|[1-9]{1}[0-5]{1})?[0-9]{4}$/i.test(e);
                    break;
                case "RU":
                    g = /^[0-9]{6}$/i.test(e);
                    break;
                case "SE":
                    g = /^(S-)?\d{3}\s?\d{2}$/i.test(e);
                    break;
                case "SG":
                    g = /^([0][1-9]|[1-6][0-9]|[7]([0-3]|[5-9])|[8][0-2])(\d{4})$/i.test(e);
                    break;
                case "SK":
                    g = /^(\d{3})([ ]?)(\d{2})$/.test(e);
                    break;
                case "US":
                default:
                    g = /^\d{4,5}([\-]?\d{4})?$/.test(e)
            }
            return {
                valid: g,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.zipCode.country, a.fn.bootstrapValidator.i18n.zipCode.countries[f])
            }
        },
        _gb: function(a) {
            for (var b = "[ABCDEFGHIJKLMNOPRSTUWYZ]", c = "[ABCDEFGHKLMNOPQRSTUVWXY]", d = "[ABCDEFGHJKPMNRSTUVWXY]", e = "[ABEHMNPRVWXY]", f = "[ABDEFGHJLNPQRSTUWXYZ]", g = [new RegExp("^(" + b + "{1}" + c + "?[0-9]{1,2})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(" + b + "{1}[0-9]{1}" + d + "{1})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(" + b + "{1}" + c + "{1}?[0-9]{1}" + e + "{1})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(BF1)(\\s*)([0-6]{1}[ABDEFGHJLNPQRST]{1}[ABDEFGHJLNPQRSTUWZYZ]{1})$", "i"), /^(GIR)(\s*)(0AA)$/i, /^(BFPO)(\s*)([0-9]{1,4})$/i, /^(BFPO)(\s*)(c\/o\s*[0-9]{1,3})$/i, /^([A-Z]{4})(\s*)(1ZZ)$/i, /^(AI-2640)$/i], h = 0; h < g.length; h++)
                if (g[h].test(a)) return !0;
            return !1
        }
    }
}(window.jQuery);
(function() {
    ! function(a) {
        return "function" == typeof define && define.amd ? define(["jquery"], a) : a(window.jQuery)
    }(function(a) {
        "use strict";
        var b, c, d, e, f, g, h, i, j, k, l;
        return k = "caret", b = function() {
            function b(a) {
                this.$inputor = a, this.domInputor = this.$inputor[0]
            }
            return b.prototype.setPos = function() {
                return this.domInputor
            }, b.prototype.getIEPosition = function() {
                return this.getPosition()
            }, b.prototype.getPosition = function() {
                var a, b;
                return b = this.getOffset(), a = this.$inputor.offset(), b.left -= a.left, b.top -= a.top, b
            }, b.prototype.getOldIEPos = function() {
                var a, b;
                return b = h.selection.createRange(), a = h.body.createTextRange(), a.moveToElementText(this.domInputor), a.setEndPoint("EndToEnd", b), a.text.length
            }, b.prototype.getPos = function() {
                var a, b, c;
                return (c = this.range()) ? (a = c.cloneRange(), a.selectNodeContents(this.domInputor), a.setEnd(c.endContainer, c.endOffset), b = a.toString().length, a.detach(), b) : h.selection ? this.getOldIEPos() : void 0
            }, b.prototype.getOldIEOffset = function() {
                var a, b;
                return a = h.selection.createRange().duplicate(), a.moveStart("character", -1), b = a.getBoundingClientRect(), {
                    height: b.bottom - b.top,
                    left: b.left,
                    top: b.top
                }
            }, b.prototype.getOffset = function() {
                var b, c, d, e;
                if (j.getSelection && (d = this.range())) {
                    if (d.endOffset - 1 < 0) return null;
                    b = d.cloneRange(), b.setStart(d.endContainer, d.endOffset - 1), b.setEnd(d.endContainer, d.endOffset), e = b.getBoundingClientRect(), c = {
                        height: e.height,
                        left: e.left + e.width,
                        top: e.top
                    }, b.detach()
                } else h.selection && (c = this.getOldIEOffset());
                return c && (c.top += a(j).scrollTop(), c.left += a(j).scrollLeft()), c
            }, b.prototype.range = function() {
                var a;
                if (j.getSelection) return a = j.getSelection(), a.rangeCount > 0 ? a.getRangeAt(0) : null
            }, b
        }(), c = function() {
            function b(a) {
                this.$inputor = a, this.domInputor = this.$inputor[0]
            }
            return b.prototype.getIEPos = function() {
                var a, b, c, d, e, f, g;
                return b = this.domInputor, f = h.selection.createRange(), e = 0, f && f.parentElement() === b && (d = b.value.replace(/\r\n/g, "\n"), c = d.length, g = b.createTextRange(), g.moveToBookmark(f.getBookmark()), a = b.createTextRange(), a.collapse(!1), e = g.compareEndPoints("StartToEnd", a) > -1 ? c : -g.moveStart("character", -c)), e
            }, b.prototype.getPos = function() {
                return h.selection ? this.getIEPos() : this.domInputor.selectionStart
            }, b.prototype.setPos = function(a) {
                var b, c;
                return b = this.domInputor, h.selection ? (c = b.createTextRange(), c.move("character", a), c.select()) : b.setSelectionRange && b.setSelectionRange(a, a), b
            }, b.prototype.getIEOffset = function(a) {
                var b, c, d, e;
                return c = this.domInputor.createTextRange(), a || (a = this.getPos()), c.move("character", a), d = c.boundingLeft, e = c.boundingTop, b = c.boundingHeight, {
                    left: d,
                    top: e,
                    height: b
                }
            }, b.prototype.getOffset = function(b) {
                var c, d, e;
                return c = this.$inputor, h.selection ? (d = this.getIEOffset(b), d.top += a(j).scrollTop() + c.scrollTop(), d.left += a(j).scrollLeft() + c.scrollLeft(), d) : (d = c.offset(), e = this.getPosition(b), d = {
                    left: d.left + e.left - c.scrollLeft(),
                    top: d.top + e.top - c.scrollTop(),
                    height: e.height
                })
            }, b.prototype.getPosition = function(b) {
                var c, e, f, g, h, i, j;
                return c = this.$inputor, g = function(b) {
                    return a("<div></div>").text(b).html()
                }, void 0 === b && (b = this.getPos()), j = c.val().slice(0, b), f = c.val().slice(b), h = "<span style='position: relative; display: inline;'>" + g(j) + "</span>", h += "<span id='caret' style='position: relative; display: inline;'>|</span>", h += "<span style='position: relative; display: inline;'>" + g(f) + "</span>", i = new d(c), e = i.create(h).rect()
            }, b.prototype.getIEPosition = function(a) {
                var b, c, d, e, f;
                return d = this.getIEOffset(a), c = this.$inputor.offset(), e = d.left - c.left, f = d.top - c.top, b = d.height, {
                    left: e,
                    top: f,
                    height: b
                }
            }, b
        }(), d = function() {
            function b(a) {
                this.$inputor = a
            }
            return b.prototype.css_attr = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontWeight", "height", "letterSpacing", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "outlineWidth", "overflow", "overflowX", "overflowY", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "textAlign", "textOverflow", "textTransform", "whiteSpace", "wordBreak", "wordWrap"], b.prototype.mirrorCss = function() {
                var b, c = this;
                return b = {
                    position: "absolute",
                    left: -9999,
                    top: 0,
                    zIndex: -2e4
                }, "TEXTAREA" === this.$inputor.prop("tagName") && this.css_attr.push("width"), a.each(this.css_attr, function(a, d) {
                    return b[d] = c.$inputor.css(d)
                }), b
            }, b.prototype.create = function(b) {
                return this.$mirror = a("<div></div>"), this.$mirror.css(this.mirrorCss()), this.$mirror.html(b), this.$inputor.after(this.$mirror), this
            }, b.prototype.rect = function() {
                var a, b, c;
                return a = this.$mirror.find("#caret"), b = a.position(), c = {
                    left: b.left,
                    top: b.top,
                    height: a.height()
                }, this.$mirror.remove(), c
            }, b
        }(), e = {
            contentEditable: function(a) {
                return !(!a[0].contentEditable || "true" !== a[0].contentEditable)
            }
        }, g = {
            pos: function(a) {
                return a || 0 === a ? this.setPos(a) : this.getPos()
            },
            position: function(a) {
                return h.selection ? this.getIEPosition(a) : this.getPosition(a)
            },
            offset: function(a) {
                var b;
                return b = this.getOffset(a)
            }
        }, h = null, j = null, i = null, l = function(a) {
            var b;
            return (b = null != a ? a.iframe : void 0) ? (i = b, j = b.contentWindow, h = b.contentDocument || j.document) : (i = void 0, j = window, h = document)
        }, f = function(a) {
            var b;
            h = a[0].ownerDocument, j = h.defaultView || h.parentWindow;
            try {
                return i = j.frameElement
            } catch (c) {
                b = c
            }
        }, a.fn.caret = function(d, f, h) {
            var i;
            return g[d] ? (a.isPlainObject(f) ? (l(f), f = void 0) : l(h), i = e.contentEditable(this) ? new b(this) : new c(this), g[d].apply(i, [f])) : a.error("Method " + d + " does not exist on jQuery.caret")
        }, a.fn.caret.EditableCaret = b, a.fn.caret.InputCaret = c, a.fn.caret.Utils = e, a.fn.caret.apis = g
    })
}).call(this);
(function(e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "codemirror"], e)
    } else {
        e(window.jQuery, window.CodeMirror)
    }
})(function(e, t) {
    if ("function" !== typeof Array.prototype.reduce) {
        Array.prototype.reduce = function(e, t) {
            var n, r, i = this.length >>> 0,
                s = false;
            if (1 < arguments.length) {
                r = t;
                s = true
            }
            for (n = 0; i > n; ++n) {
                if (this.hasOwnProperty(n)) {
                    if (s) {
                        r = e(r, this[n], n, this)
                    } else {
                        r = this[n];
                        s = true
                    }
                }
            }
            if (!s) {
                throw new TypeError("Reduce of empty array with no initial value")
            }
            return r
        }
    }
    var n = {
        bMac: navigator.appVersion.indexOf("Mac") > -1,
        bMSIE: navigator.userAgent.indexOf("MSIE") > -1,
        bFF: navigator.userAgent.indexOf("Firefox") > -1,
        jqueryVersion: parseFloat(e.fn.jquery),
        bCodeMirror: !!t
    };
    var r = function() {
        var e = function(e) {
            return function(t) {
                return e === t
            }
        };
        var t = function(e, t) {
            return e === t
        };
        var n = function() {
            return true
        };
        var r = function() {
            return false
        };
        var i = function(e) {
            return function() {
                return !e.apply(e, arguments)
            }
        };
        var s = function(e) {
            return e
        };
        return {
            eq: e,
            eq2: t,
            ok: n,
            fail: r,
            not: i,
            self: s
        }
    }();
    var i = function() {
        var e = function(e) {
            return e[0]
        };
        var t = function(e) {
            return e[e.length - 1]
        };
        var n = function(e) {
            return e.slice(0, e.length - 1)
        };
        var i = function(e) {
            return e.slice(1)
        };
        var s = function(e, t) {
            var n = e.indexOf(t);
            if (n === -1) {
                return null
            }
            return e[n + 1]
        };
        var o = function(e, t) {
            var n = e.indexOf(t);
            if (n === -1) {
                return null
            }
            return e[n - 1]
        };
        var u = function(e, t) {
            t = t || r.self;
            return e.reduce(function(e, n) {
                return e + t(n)
            }, 0)
        };
        var a = function(e) {
            var t = [],
                n = -1,
                r = e.length;
            while (++n < r) {
                t[n] = e[n]
            }
            return t
        };
        var f = function(n, r) {
            if (n.length === 0) {
                return []
            }
            var s = i(n);
            return s.reduce(function(e, n) {
                var i = t(e);
                if (r(t(i), n)) {
                    i[i.length] = n
                } else {
                    e[e.length] = [n]
                }
                return e
            }, [
                [e(n)]
            ])
        };
        var l = function(e) {
            var t = [];
            for (var n = 0, r = e.length; n < r; n++) {
                if (e[n]) {
                    t.push(e[n])
                }
            }
            return t
        };
        return {
            head: e,
            last: t,
            initial: n,
            tail: i,
            prev: o,
            next: s,
            sum: u,
            from: a,
            compact: l,
            clusterBy: f
        }
    }();
    var s = function() {
        var t = function(t) {
            return t && e(t).hasClass("note-editable")
        };
        var o = function(t) {
            return t && e(t).hasClass("note-control-sizing")
        };
        var u = function(e) {
            var t = function(t) {
                return function() {
                    return e.find(t)
                }
            };
            return {
                editor: function() {
                    return e
                },
                dropzone: t(".note-dropzone"),
                toolbar: t(".note-toolbar"),
                editable: t(".note-editable"),
                codable: t(".note-codable"),
                statusbar: t(".note-statusbar"),
                popover: t(".note-popover"),
                handle: t(".note-handle"),
                dialog: t(".note-dialog")
            }
        };
        var a = function(e) {
            return function(t) {
                return t && t.nodeName === e
            }
        };
        var f = function(e) {
            return e && /^DIV|^P|^LI|^H[1-7]/.test(e.nodeName)
        };
        var l = function(e) {
            return e && /^UL|^OL/.test(e.nodeName)
        };
        var c = function(e) {
            return e && /^TD|^TH/.test(e.nodeName)
        };
        var h = function(e, n) {
            while (e) {
                if (n(e)) {
                    return e
                }
                if (t(e)) {
                    break
                }
                e = e.parentNode
            }
            return null
        };
        var p = function(e, t) {
            t = t || r.fail;
            var n = [];
            h(e, function(e) {
                n.push(e);
                return t(e)
            });
            return n
        };
        var d = function(t, n) {
            var r = p(t);
            for (var i = n; i; i = i.parentNode) {
                if (e.inArray(i, r) > -1) {
                    return i
                }
            }
            return null
        };
        var v = function(e, t) {
            var n = [];
            var r = false,
                i = false;
            (function s(o) {
                if (!o) {
                    return
                }
                if (o === e) {
                    r = true
                }
                if (r && !i) {
                    n.push(o)
                }
                if (o === t) {
                    i = true;
                    return
                }
                for (var u = 0, a = o.childNodes.length; u < a; u++) {
                    s(o.childNodes[u])
                }
            })(d(e, t));
            return n
        };
        var m = function(e, t) {
            t = t || r.fail;
            var n = [];
            while (e) {
                n.push(e);
                if (t(e)) {
                    break
                }
                e = e.previousSibling
            }
            return n
        };
        var g = function(e, t) {
            t = t || r.fail;
            var n = [];
            while (e) {
                n.push(e);
                if (t(e)) {
                    break
                }
                e = e.nextSibling
            }
            return n
        };
        var y = function(e, t) {
            var n = [];
            t = t || r.ok;
            (function i(r) {
                if (e !== r && t(r)) {
                    n.push(r)
                }
                for (var s = 0, o = r.childNodes.length; s < o; s++) {
                    i(r.childNodes[s])
                }
            })(e);
            return n
        };
        var b = function(e, t) {
            var n = t.nextSibling,
                r = t.parentNode;
            if (n) {
                r.insertBefore(e, n)
            } else {
                r.appendChild(e)
            }
            return e
        };
        var w = function(t, n) {
            e.each(n, function(e, n) {
                t.appendChild(n)
            });
            return t
        };
        var E = a("#text");
        var S = function(e) {
            if (E(e)) {
                return e.nodeValue.length
            }
            return e.childNodes.length
        };
        var x = function(e) {
            var t = 0;
            while (e = e.previousSibling) {
                t += 1
            }
            return t
        };
        var T = function(t, n) {
            var s = i.initial(p(n, r.eq(t)));
            return e.map(s, x).reverse()
        };
        var N = function(e, t) {
            var n = e;
            for (var r = 0, i = t.length; r < i; r++) {
                n = n.childNodes[t[r]]
            }
            return n
        };
        var C = function(e, t) {
            if (t === 0) {
                return e
            }
            if (t >= S(e)) {
                return e.nextSibling
            }
            if (E(e)) {
                return e.splitText(t)
            }
            var n = e.childNodes[t];
            e = b(e.cloneNode(false), e);
            return w(e, g(n))
        };
        var k = function(e, t, n) {
            var i = p(t, r.eq(e));
            if (i.length === 1) {
                return C(t, n)
            }
            return i.reduce(function(e, r) {
                var i = r.cloneNode(false);
                b(i, r);
                if (e === t) {
                    e = C(e, n)
                }
                w(i, g(e));
                return i
            })
        };
        var L = function(e, t) {
            if (!e || !e.parentNode) {
                return
            }
            if (e.removeNode) {
                return e.removeNode(t)
            }
            var n = e.parentNode;
            if (!t) {
                var r = [];
                var i, s;
                for (i = 0, s = e.childNodes.length; i < s; i++) {
                    r.push(e.childNodes[i])
                }
                for (i = 0, s = r.length; i < s; i++) {
                    n.insertBefore(r[i], e)
                }
            }
            n.removeChild(e)
        };
        var A = function(e) {
            return s.isTextarea(e[0]) ? e.val() : e.html()
        };
        return {
            blank: n.bMSIE ? "&nbsp;" : "<br/>",
            emptyPara: "",
            isEditable: t,
            isControlSizing: o,
            buildLayoutInfo: u,
            isText: E,
            isPara: f,
            isList: l,
            isTable: a("TABLE"),
            isCell: c,
            isAnchor: a("A"),
            isDiv: a("DIV"),
            isLi: a("LI"),
            isSpan: a("SPAN"),
            isB: a("B"),
            isU: a("U"),
            isS: a("S"),
            isI: a("I"),
            isImg: a("IMG"),
            isTextarea: a("TEXTAREA"),
            ancestor: h,
            listAncestor: p,
            listNext: g,
            listPrev: m,
            listDescendant: y,
            commonAncestor: d,
            listBetween: v,
            insertAfter: b,
            position: x,
            makeOffsetPath: T,
            fromOffsetPath: N,
            split: k,
            remove: L,
            html: A
        }
    }();
    var o = {
        version: "0.5.2",
        options: {
            width: null,
            height: null,
            focus: false,
            tabsize: null,
            styleWithSpan: true,
            disableLinkTarget: false,
            disableDragAndDrop: false,
            codemirror: null,
            lang: "en-US",
            direction: null,
            toolbar: [
                ["style", ["style"]],
                ["font", ["bold", "italic", "underline", "clear"]],
                ["fontname", ["fontname"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]],
                ["table", ["table"]],
                ["insert", ["link", "picture", "video"]],
                ["view", ["fullscreen", "codeview"]],
                ["help", ["help"]]
            ],
            oninit: null,
            onfocus: null,
            onblur: null,
            onenter: null,
            onkeyup: null,
            onkeydown: null,
            onImageUpload: null,
            onImageUploadError: null,
            onToolbarClick: null,
            keyMap: {
                pc: {
                    "CTRL+Z": "undo",
                    "CTRL+Y": "redo",
                    TAB: "tab",
                    "SHIFT+TAB": "untab",
                    "CTRL+B": "bold",
                    "CTRL+I": "italic",
                    "CTRL+U": "underline",
                    "CTRL+SHIFT+S": "strikethrough",
                    "CTRL+BACKSLASH": "removeFormat",
                    "CTRL+SHIFT+L": "justifyLeft",
                    "CTRL+SHIFT+E": "justifyCenter",
                    "CTRL+SHIFT+R": "justifyRight",
                    "CTRL+SHIFT+J": "justifyFull",
                    "CTRL+SHIFT+NUM7": "insertUnorderedList",
                    "CTRL+SHIFT+NUM8": "insertOrderedList",
                    "CTRL+LEFTBRACKET": "outdent",
                    "CTRL+RIGHTBRACKET": "indent",
                    "CTRL+NUM0": "formatPara",
                    "CTRL+NUM1": "formatH1",
                    "CTRL+NUM2": "formatH2",
                    "CTRL+NUM3": "formatH3",
                    "CTRL+NUM4": "formatH4",
                    "CTRL+NUM5": "formatH5",
                    "CTRL+NUM6": "formatH6",
                    "CTRL+ENTER": "insertHorizontalRule"
                },
                mac: {
                    "CMD+Z": "undo",
                    "CMD+SHIFT+Z": "redo",
                    TAB: "tab",
                    "SHIFT+TAB": "untab",
                    "CMD+B": "bold",
                    "CMD+I": "italic",
                    "CMD+U": "underline",
                    "CMD+SHIFT+S": "strikethrough",
                    "CMD+BACKSLASH": "removeFormat",
                    "CMD+SHIFT+L": "justifyLeft",
                    "CMD+SHIFT+E": "justifyCenter",
                    "CMD+SHIFT+R": "justifyRight",
                    "CMD+SHIFT+J": "justifyFull",
                    "CMD+SHIFT+NUM7": "insertUnorderedList",
                    "CMD+SHIFT+NUM8": "insertOrderedList",
                    "CMD+LEFTBRACKET": "outdent",
                    "CMD+RIGHTBRACKET": "indent",
                    "CMD+NUM0": "formatPara",
                    "CMD+NUM1": "formatH1",
                    "CMD+NUM2": "formatH2",
                    "CMD+NUM3": "formatH3",
                    "CMD+NUM4": "formatH4",
                    "CMD+NUM5": "formatH5",
                    "CMD+NUM6": "formatH6",
                    "CMD+ENTER": "insertHorizontalRule"
                }
            }
        },
        lang: {
            "en-US": {
                font: {
                    bold: "Bold",
                    italic: "Italic",
                    underline: "Underline",
                    strike: "Strike",
                    clear: "Remove Font Style",
                    height: "Line Height",
                    name: "Font Family",
                    size: "Font Size"
                },
                image: {
                    image: "Picture",
                    insert: "Insert Image",
                    resizeFull: "Resize Full",
                    resizeHalf: "Resize Half",
                    resizeQuarter: "Resize Quarter",
                    floatLeft: "Float Left",
                    floatRight: "Float Right",
                    floatNone: "Float None",
                    dragImageHere: "Drag an image here",
                    selectFromFiles: "Select from files",
                    url: "Image URL",
                    remove: "Remove Image"
                },
                link: {
                    link: "Link",
                    insert: "Insert Link",
                    unlink: "Unlink",
                    edit: "Edit",
                    textToDisplay: "Text to display",
                    url: "To what URL should this link go?",
                    openInNewWindow: "Open in new window"
                },
                video: {
                    video: "Video",
                    videoLink: "Video Link",
                    insert: "Insert Video",
                    url: "Video URL?",
                    providers: "(YouTube, Vimeo, Vine, Instagram, or DailyMotion)"
                },
                table: {
                    table: "Table"
                },
                hr: {
                    insert: "Insert Horizontal Rule"
                },
                style: {
                    style: "Style",
                    normal: "Normal",
                    blockquote: "Quote",
                    pre: "Code",
                    h1: "Header 1",
                    h2: "Header 2",
                    h3: "Header 3",
                    h4: "Header 4",
                    h5: "Header 5",
                    h6: "Header 6"
                },
                lists: {
                    unordered: "Unordered list",
                    ordered: "Ordered list"
                },
                options: {
                    help: "Help",
                    fullscreen: "Full Screen",
                    codeview: "Code View"
                },
                paragraph: {
                    paragraph: "Paragraph",
                    outdent: "Outdent",
                    indent: "Indent",
                    left: "Align left",
                    center: "Align center",
                    right: "Align right",
                    justify: "Justify full"
                },
                color: {
                    recent: "Recent Color",
                    more: "More Color",
                    background: "BackColor",
                    foreground: "FontColor",
                    transparent: "Transparent",
                    setTransparent: "Set transparent",
                    reset: "Reset",
                    resetToDefault: "Reset to default"
                },
                shortcut: {
                    shortcuts: "Keyboard shortcuts",
                    close: "Close",
                    textFormatting: "Text formatting",
                    action: "Action",
                    paragraphFormatting: "Paragraph formatting",
                    documentStyle: "Document Style"
                },
                history: {
                    undo: "Undo",
                    redo: "Redo"
                }
            }
        }
    };
    var u = function() {
        var t = function(t) {
            return e.Deferred(function(n) {
                e.extend(new FileReader, {
                    onload: function(e) {
                        var t = e.target.result;
                        n.resolve(t)
                    },
                    onerror: function() {
                        n.reject(this)
                    }
                }).readAsDataURL(t)
            }).promise()
        };
        var n = function(t) {
            return e.Deferred(function(n) {
                e("<img>").one("load", function() {
                    n.resolve(e(this))
                }).one("error abort", function() {
                    n.reject(e(this))
                }).css({
                    display: "none"
                }).appendTo(document.body).attr("src", t)
            }).promise()
        };
        return {
            readFileAsDataURL: t,
            createImage: n
        }
    }();
    var a = {
        isEdit: function(e) {
            return [8, 9, 13, 32].indexOf(e) !== -1
        },
        nameFromCode: {
            8: "BACKSPACE",
            9: "TAB",
            13: "ENTER",
            32: "SPACE",
            48: "NUM0",
            49: "NUM1",
            50: "NUM2",
            51: "NUM3",
            52: "NUM4",
            53: "NUM5",
            54: "NUM6",
            55: "NUM7",
            56: "NUM8",
            66: "B",
            69: "E",
            73: "I",
            74: "J",
            75: "K",
            76: "L",
            82: "R",
            83: "S",
            85: "U",
            89: "Y",
            90: "Z",
            191: "SLASH",
            219: "LEFTBRACKET",
            220: "BACKSLASH",
            221: "RIGHTBRACKET"
        }
    };
    var f = function() {
        var t = function(t, r) {
            if (n.jqueryVersion < 1.9) {
                var i = {};
                e.each(r, function(e, n) {
                    i[n] = t.css(n)
                });
                return i
            }
            return t.css.call(t, r)
        };
        this.stylePara = function(t, n) {
            e.each(t.nodes(s.isPara), function(t, r) {
                e(r).css(n)
            })
        };
        this.current = function(n, r) {
            var i = e(s.isText(n.sc) ? n.sc.parentNode : n.sc);
            var o = ["font-family", "font-size", "text-align", "list-style-type", "line-height"];
            var u = t(i, o) || {};
            u["font-size"] = parseInt(u["font-size"], 10);
            u["font-bold"] = document.queryCommandState("bold") ? "bold" : "normal";
            u["font-italic"] = document.queryCommandState("italic") ? "italic" : "normal";
            u["font-underline"] = document.queryCommandState("underline") ? "underline" : "normal";
            u["font-strikethrough"] = document.queryCommandState("strikeThrough") ? "strikethrough" : "normal";
            if (!n.isOnList()) {
                u["list-style"] = "none"
            } else {
                var a = ["circle", "disc", "disc-leading-zero", "square"];
                var f = e.inArray(u["list-style-type"], a) > -1;
                u["list-style"] = f ? "unordered" : "ordered"
            }
            var l = s.ancestor(n.sc, s.isPara);
            if (l && l.style["line-height"]) {
                u["line-height"] = l.style.lineHeight
            } else {
                var c = parseInt(u["line-height"], 10) / parseInt(u["font-size"], 10);
                u["line-height"] = c.toFixed(1)
            }
            u.image = s.isImg(r) && r;
            u.anchor = n.isOnAnchor() && s.ancestor(n.sc, s.isAnchor);
            u.aAncestor = s.listAncestor(n.sc, s.isEditable);
            return u
        }
    };
    var l = function() {
        var t = !!document.createRange;
        var n = function(e, t) {
            var n = e.parentElement(),
                r;
            var o = document.body.createTextRange(),
                u;
            var a = i.from(n.childNodes);
            for (r = 0; r < a.length; r++) {
                if (s.isText(a[r])) {
                    continue
                }
                o.moveToElementText(a[r]);
                if (o.compareEndPoints("StartToStart", e) >= 0) {
                    break
                }
                u = a[r]
            }
            if (r !== 0 && s.isText(a[r - 1])) {
                var f = document.body.createTextRange(),
                    l = null;
                f.moveToElementText(u || n);
                f.collapse(!u);
                l = u ? u.nextSibling : n.firstChild;
                var c = e.duplicate();
                c.setEndPoint("StartToStart", f);
                var h = c.text.replace(/[\r\n]/g, "").length;
                while (h > l.nodeValue.length && l.nextSibling) {
                    h -= l.nodeValue.length;
                    l = l.nextSibling
                }
                var p = l.nodeValue;
                if (t && l.nextSibling && s.isText(l.nextSibling) && h === l.nodeValue.length) {
                    h -= l.nodeValue.length;
                    l = l.nextSibling
                }
                n = l;
                r = h
            }
            return {
                cont: n,
                offset: r
            }
        };
        var o = function(e) {
            var t = function(e, n) {
                var o, u;
                if (s.isText(e)) {
                    var a = s.listPrev(e, r.not(s.isText));
                    var f = i.last(a).previousSibling;
                    o = f || e.parentNode;
                    n += i.sum(i.tail(a), s.length);
                    u = !f
                } else {
                    o = e.childNodes[n] || e;
                    if (s.isText(o)) {
                        return t(o, n)
                    }
                    n = 0;
                    u = false
                }
                return {
                    cont: o,
                    collapseToStart: u,
                    offset: n
                }
            };
            var n = document.body.createTextRange();
            var o = t(e.cont, e.offset);
            n.moveToElementText(o.cont);
            n.collapse(o.collapseToStart);
            n.moveStart("character", o.offset);
            return n
        };
        var u = function(n, u, a, f) {
            this.sc = n;
            this.so = u;
            this.ec = a;
            this.eo = f;
            var l = function() {
                if (t) {
                    var e = document.createRange();
                    e.setStart(n, u);
                    e.setEnd(a, f);
                    return e
                } else {
                    var r = o({
                        cont: n,
                        offset: u
                    });
                    r.setEndPoint("EndToEnd", o({
                        cont: a,
                        offset: f
                    }));
                    return r
                }
            };
            this.select = function() {
                var e = l();
                if (t) {
                    var n = document.getSelection();
                    if (n.rangeCount > 0) {
                        n.removeAllRanges()
                    }
                    n.addRange(e)
                } else {
                    e.select()
                }
            };
            this.nodes = function(t) {
                var o = s.listBetween(n, a);
                var u = i.compact(e.map(o, function(e) {
                    return s.ancestor(e, t)
                }));
                return e.map(i.clusterBy(u, r.eq2), i.head)
            };
            this.commonAncestor = function() {
                return s.commonAncestor(n, a)
            };
            var c = function(e) {
                return function() {
                    var t = s.ancestor(n, e);
                    return !!t && t === s.ancestor(a, e)
                }
            };
            this.isOnEditable = c(s.isEditable);
            this.isOnList = c(s.isList);
            this.isOnAnchor = c(s.isAnchor);
            this.isOnCell = c(s.isCell);
            this.isCollapsed = function() {
                return n === a && u === f
            };
            this.insertNode = function(e) {
                var n = l();
                if (t) {
                    n.insertNode(e)
                } else {
                    n.pasteHTML(e.outerHTML)
                }
            };
            this.toString = function() {
                var e = l();
                return t ? e.toString() : e.text
            };
            this.bookmark = function(e) {
                return {
                    s: {
                        path: s.makeOffsetPath(e, n),
                        offset: u
                    },
                    e: {
                        path: s.makeOffsetPath(e, a),
                        offset: f
                    }
                }
            }
        };
        return {
            create: function(e, r, i, s) {
                if (arguments.length === 0) {
                    if (t) {
                        var o = document.getSelection();
                        if (o.rangeCount === 0) {
                            return null
                        }
                        var a = o.getRangeAt(0);
                        e = a.startContainer;
                        r = a.startOffset;
                        i = a.endContainer;
                        s = a.endOffset
                    } else {
                        var f = document.selection.createRange();
                        var l = f.duplicate();
                        l.collapse(false);
                        var c = f;
                        c.collapse(true);
                        var h = n(c, true),
                            p = n(l, false);
                        e = h.cont;
                        r = h.offset;
                        i = p.cont;
                        s = p.offset
                    }
                } else if (arguments.length === 2) {
                    i = e;
                    s = r
                }
                return new u(e, r, i, s)
            },
            createFromNode: function(e) {
                return this.create(e, 0, e, 1)
            },
            createFromBookmark: function(e, t) {
                var n = s.fromOffsetPath(e, t.s.path);
                var r = t.s.offset;
                var i = s.fromOffsetPath(e, t.e.path);
                var o = t.e.offset;
                return new u(n, r, i, o)
            }
        }
    }();
    var c = function() {
        this.tab = function(e, t) {
            var n = s.ancestor(e.commonAncestor(), s.isCell);
            var r = s.ancestor(n, s.isTable);
            var o = s.listDescendant(r, s.isCell);
            var u = i[t ? "prev" : "next"](o, n);
            if (u) {
                l.create(u, 0).select()
            }
        };
        this.createTable = function(t, n) {
            var r = [],
                i;
            for (var o = 0; o < t; o++) {
                r.push("<td>" + s.blank + "</td>")
            }
            i = r.join("");
            var u = [],
                a;
            for (var f = 0; f < n; f++) {
                u.push("<tr>" + i + "</tr>")
            }
            a = u.join("");
            var l = '<table class="table table-bordered">' + a + "</table>";
            return e(l)[0]
        }
    };
    var h = function() {
        var t = new f;
        var r = new c;
        this.saveRange = function(e) {
            e.data("range", l.create())
        };
        this.restoreRange = function(e) {
            var t = e.data("range");
            if (t) {
                t.select()
            }
        };
        this.currentStyle = function(e) {
            var n = l.create();
            return n.isOnEditable() && t.current(n, e)
        };
        this.undo = function(e) {
            e.data("NoteHistory").undo(e)
        };
        this.redo = function(e) {
            e.data("NoteHistory").redo(e)
        };
        var i = this.recordUndo = function(e) {
            e.data("NoteHistory").recordUndo(e)
        };
        var o = ["bold", "italic", "underline", "strikethrough", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "insertOrderedList", "insertUnorderedList", "indent", "outdent", "formatBlock", "removeFormat", "backColor", "foreColor", "insertHorizontalRule", "fontName"];
        for (var a = 0, h = o.length; a < h; a++) {
            this[o[a]] = function(e) {
                return function(t, n) {
                    i(t);
                    document.execCommand(e, false, n)
                }
            }(o[a])
        }
        var p = function(t, n, r) {
            i(t);
            var o = (new Array(r + 1)).join("&nbsp;");
            n.insertNode(e('<span id="noteTab">' + o + "</span>")[0]);
            var u = e("#noteTab").removeAttr("id");
            n = l.create(u[0], 1);
            n.select();
            s.remove(u[0])
        };
        this.tab = function(e, t) {
            var n = l.create();
            if (n.isCollapsed() && n.isOnCell()) {
                r.tab(n)
            } else {
                p(e, n, t.tabsize)
            }
        };
        this.untab = function() {
            var e = l.create();
            if (e.isCollapsed() && e.isOnCell()) {
                r.tab(e, true)
            }
        };
        this.insertImage = function(e, t) {
            u.createImage(t).then(function(t) {
                i(e);
                t.css({
                    display: "",
                    width: Math.min(e.width(), t.width())
                });
                l.create().insertNode(t[0])
            }).fail(function() {
                var t = e.data("callbacks");
                if (t.onImageUploadError) {
                    t.onImageUploadError()
                }
            })
        };
        this.insertVideo = function(t, n) {
            i(t);
            var r = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var s = n.match(r);
            var o = /\/\/instagram.com\/p\/(.[a-zA-Z0-9]*)/;
            var u = n.match(o);
            var a = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/;
            var f = n.match(a);
            var c = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
            var h = n.match(c);
            var p = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
            var d = n.match(p);
            var v;
            if (s && s[2].length === 11) {
                var m = s[2];
                v = e("<iframe>").attr("src", "//www.youtube.com/embed/" + m).attr("width", "640").attr("height", "360")
            } else if (u && u[0].length > 0) {
                v = e("<iframe>").attr("src", u[0] + "/embed/").attr("width", "612").attr("height", "710").attr("scrolling", "no").attr("allowtransparency", "true")
            } else if (f && f[0].length > 0) {
                v = e("<iframe>").attr("src", f[0] + "/embed/simple").attr("width", "600").attr("height", "600").attr("class", "vine-embed")
            } else if (h && h[3].length > 0) {
                v = e("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("src", "//player.vimeo.com/video/" + h[3]).attr("width", "640").attr("height", "360")
            } else if (d && d[2].length > 0) {
                v = e("<iframe>").attr("src", "//www.dailymotion.com/embed/video/" + d[2]).attr("width", "640").attr("height", "360")
            } else {}
            if (v) {
                v.attr("frameborder", 0);
                l.create().insertNode(v[0])
            }
        };
        this.formatBlock = function(e, t) {
            i(e);
            t = n.bMSIE ? "<" + t + ">" : t;
            document.execCommand("FormatBlock", false, t)
        };
        this.formatPara = function(e) {
            this.formatBlock(e, "P")
        };
        for (var a = 1; a <= 6; a++) {
            this["formatH" + a] = function(e) {
                return function(t) {
                    this.formatBlock(t, "H" + e)
                }
            }(a)
        }
        this.fontSize = function(e, t) {
            i(e);
            document.execCommand("fontSize", false, 3);
            if (n.bFF) {
                e.find("font[size=3]").removeAttr("size").css("font-size", t + "px")
            } else {
                e.find("span").filter(function() {
                    return this.style.fontSize === "medium"
                }).css("font-size", t + "px")
            }
        };
        this.lineHeight = function(e, n) {
            i(e);
            t.stylePara(l.create(), {
                lineHeight: n
            })
        };
        this.unlink = function(e) {
            var t = l.create();
            if (t.isOnAnchor()) {
                i(e);
                var n = s.ancestor(t.sc, s.isAnchor);
                t = l.createFromNode(n);
                t.select();
                document.execCommand("unlink")
            }
        };
        this.createLink = function(t, r, o) {
            var u = l.create();
            i(t);
            var a = r;
            if (r.indexOf("@") !== -1 && r.indexOf(":") === -1) {
                a = "mailto:" + r
            } else if (r.indexOf("://") === -1) {
                a = "http://" + r
            }
            if ((n.bMSIE || n.bFF) && u.isCollapsed()) {
                u.insertNode(e('<A id="linkAnchor">' + r + "</A>")[0]);
                var f = e("#linkAnchor").attr("href", a).removeAttr("id");
                u = l.createFromNode(f[0]);
                u.select()
            } else {
                document.execCommand("createlink", false, a);
                u = l.create()
            }
            e.each(u.nodes(s.isAnchor), function(t, n) {
                if (o) {
                    e(n).attr("target", "_blank")
                } else {
                    e(n).removeAttr("target")
                }
            })
        };
        this.getLinkInfo = function() {
            var t = l.create();
            var n = true;
            var r = "";
            if (t.isOnAnchor()) {
                var i = s.ancestor(t.sc, s.isAnchor);
                t = l.createFromNode(i);
                n = e(i).attr("target") === "_blank";
                r = i.href
            }
            return {
                text: t.toString(),
                url: r,
                newWindow: n
            }
        };
        this.getVideoInfo = function() {
            var e = l.create();
            if (e.isOnAnchor()) {
                var t = s.ancestor(e.sc, s.isAnchor);
                e = l.createFromNode(t)
            }
            return {
                text: e.toString()
            }
        };
        this.color = function(e, t) {
            var n = JSON.parse(t);
            var r = n.foreColor,
                s = n.backColor;
            i(e);
            if (r) {
                document.execCommand("foreColor", false, r)
            }
            if (s) {
                document.execCommand("backColor", false, s)
            }
        };
        this.insertTable = function(e, t) {
            i(e);
            var n = t.split("x");
            l.create().insertNode(r.createTable(n[0], n[1]))
        };
        this.floatMe = function(e, t, n) {
            i(e);
            n.css("float", t)
        };
        this.resize = function(e, t, n) {
            i(e);
            n.css({
                width: e.width() * t + "px",
                height: ""
            })
        };
        this.resizeTo = function(e, t, n) {
            var r;
            if (n) {
                var i = e.y / e.x;
                var s = t.data("ratio");
                r = {
                    width: s > i ? e.x : e.y / s,
                    height: s > i ? e.x * s : e.y
                }
            } else {
                r = {
                    width: e.x,
                    height: e.y
                }
            }
            t.css(r)
        };
        this.removeMedia = function(e, t, n) {
            i(e);
            n.detach()
        }
    };
    var p = function() {
        var e = [],
            t = [];
        var n = function(e) {
            var t = e[0],
                n = l.create();
            return {
                contents: e.html(),
                bookmark: n.bookmark(t),
                scrollTop: e.scrollTop()
            }
        };
        var r = function(e, t) {
            e.html(t.contents).scrollTop(t.scrollTop);
            l.createFromBookmark(e[0], t.bookmark).select()
        };
        this.undo = function(i) {
            var s = n(i);
            if (e.length === 0) {
                return
            }
            r(i, e.pop());
            t.push(s)
        };
        this.redo = function(i) {
            var s = n(i);
            if (t.length === 0) {
                return
            }
            r(i, t.pop());
            e.push(s)
        };
        this.recordUndo = function(r) {
            t = [];
            e.push(n(r))
        }
    };
    var d = function() {
        this.update = function(t, n) {
            var r = function(t, n) {
                t.find(".dropdown-menu li a").each(function() {
                    var t = e(this).data("value") + "" === n + "";
                    this.className = t ? "checked" : ""
                })
            };
            var s = function(e, n) {
                var r = t.find(e);
                r.toggleClass("active", n())
            };
            var o = t.find(".note-fontname");
            if (o.length > 0) {
                var u = n["font-family"];
                if (!!u) {
                    u = i.head(u.split(","));
                    u = u.replace(/\'/g, "");
                    o.find(".note-current-fontname").text(u);
                    r(o, u)
                }
            }
            var a = t.find(".note-fontsize");
            a.find(".note-current-fontsize").text(n["font-size"]);
            r(a, parseFloat(n["font-size"]));
            var f = t.find(".note-height");
            r(f, parseFloat(n["line-height"]));
            s('button[data-event="bold"]', function() {
                return n["font-bold"] === "bold"
            });
            s('button[data-event="italic"]', function() {
                return n["font-italic"] === "italic"
            });
            s('button[data-event="underline"]', function() {
                return n["font-underline"] === "underline"
            });
            s('button[data-event="strikethrough"]', function() {
                return n["font-strikethrough"] === "strikethrough"
            });
            s('button[data-event="justifyLeft"]', function() {
                return n["text-align"] === "left" || n["text-align"] === "start"
            });
            s('button[data-event="justifyCenter"]', function() {
                return n["text-align"] === "center"
            });
            s('button[data-event="justifyRight"]', function() {
                return n["text-align"] === "right"
            });
            s('button[data-event="justifyFull"]', function() {
                return n["text-align"] === "justify"
            });
            s('button[data-event="insertUnorderedList"]', function() {
                return n["list-style"] === "unordered"
            });
            s('button[data-event="insertOrderedList"]', function() {
                return n["list-style"] === "ordered"
            })
        };
        this.updateRecentColor = function(t, n, r) {
            var i = e(t).closest(".note-color");
            var s = i.find(".note-recent-color");
            var o = JSON.parse(s.attr("data-value"));
            o[n] = r;
            s.attr("data-value", JSON.stringify(o));
            var u = n === "backColor" ? "background-color" : "color";
            s.find("i").css(u, r)
        };
        this.updateFullscreen = function(e, t) {
            var n = e.find('button[data-event="fullscreen"]');
            n.toggleClass("active", t)
        };
        this.updateCodeview = function(e, t) {
            var n = e.find('button[data-event="codeview"]');
            n.toggleClass("active", t)
        };
        this.activate = function(e) {
            e.find("button").not('button[data-event="codeview"]').removeClass("disabled")
        };
        this.deactivate = function(e) {
            e.find("button").not('button[data-event="codeview"]').addClass("disabled")
        }
    };
    var v = function() {
        var t = function(t, n) {
            var r = e(n);
            var i = r.position(),
                s = r.height();
            t.css({
                display: "block",
                left: i.left,
                top: i.top + s
            })
        };
        this.update = function(e, n) {
            var r = e.find(".note-link-popover");
            if (n.anchor) {
                var i = r.find("a");
                i.attr("href", n.anchor.href).html(n.anchor.href);
                t(r, n.anchor)
            } else {
                r.hide()
            }
            var s = e.find(".note-image-popover");
            if (n.image) {
                t(s, n.image)
            } else {
                s.hide()
            }
        };
        this.hide = function(e) {
            e.children().hide()
        }
    };
    var m = function() {
        this.update = function(t, n) {
            var r = t.find(".note-control-selection");
            if (n.image) {
                var i = e(n.image);
                var s = i.position();
                var o = {
                    w: i.width(),
                    h: i.height()
                };
                r.css({
                    display: "block",
                    left: s.left,
                    top: s.top,
                    width: o.w,
                    height: o.h
                }).data("target", n.image);
                var u = o.w + "x" + o.h;
                r.find(".note-control-selection-info").text(u)
            } else {
                r.hide()
            }
        };
        this.hide = function(e) {
            e.children().hide()
        }
    };
    var g = function() {
        var t = function(e, t) {
            e.toggleClass("disabled", !t);
            e.attr("disabled", !t)
        };
        this.showImageDialog = function(n, r) {
            return e.Deferred(function(e) {
                var i = r.find(".note-image-dialog");
                var s = r.find(".note-image-input"),
                    o = r.find(".note-image-url"),
                    u = r.find(".note-image-btn");
                i.one("shown.bs.modal", function() {
                    s.replaceWith(s.clone().on("change", function() {
                        i.modal("hide");
                        e.resolve(this.files)
                    }));
                    u.click(function(t) {
                        t.preventDefault();
                        i.modal("hide");
                        e.resolve(o.val())
                    });
                    o.keyup(function() {
                        t(u, o.val())
                    }).val("").focus()
                }).one("hidden.bs.modal", function() {
                    n.focus();
                    s.off("change");
                    o.off("keyup");
                    u.off("click")
                }).modal("show")
            })
        };
        this.showVideoDialog = function(n, r, i) {
            return e.Deferred(function(e) {
                var s = r.find(".note-video-dialog");
                var o = s.find(".note-video-url"),
                    u = s.find(".note-video-btn");
                s.one("shown.bs.modal", function() {
                    o.val(i.text).keyup(function() {
                        t(u, o.val())
                    }).trigger("keyup").trigger("focus");
                    u.click(function(t) {
                        t.preventDefault();
                        s.modal("hide");
                        e.resolve(o.val())
                    })
                }).one("hidden.bs.modal", function() {
                    n.focus();
                    o.off("keyup");
                    u.off("click")
                }).modal("show")
            })
        };
        this.showLinkDialog = function(n, r, i) {
            return e.Deferred(function(e) {
                var s = r.find(".note-link-dialog");
                var o = s.find(".note-link-text"),
                    u = s.find(".note-link-url"),
                    a = s.find(".note-link-btn"),
                    f = s.find("input[type=checkbox]");
                s.one("shown.bs.modal", function() {
                    o.val(i.text);
                    u.keyup(function() {
                        t(a, u.val());
                        if (!i.text) {
                            o.val(u.val())
                        }
                    }).val(i.url).trigger("focus");
                    f.prop("checked", i.newWindow);
                    a.one("click", function(t) {
                        t.preventDefault();
                        s.modal("hide");
                        e.resolve(u.val(), f.is(":checked"))
                    })
                }).one("hidden.bs.modal", function() {
                    n.focus();
                    u.off("keyup")
                }).modal("show")
            }).promise()
        };
        this.showHelpDialog = function(e, t) {
            var n = t.find(".note-help-dialog");
            n.one("hidden.bs.modal", function() {
                e.focus()
            }).modal("show")
        }
    };
    var y = function() {
        var r = new h;
        var i = new d,
            o = new v;
        var f = new m,
            l = new g;
        var c = function(t) {
            var n = e(t).closest(".note-editor");
            return n.length > 0 && s.buildLayoutInfo(n)
        };
        var y = function(t, n) {
            r.restoreRange(t);
            var i = t.data("callbacks");
            if (i.onImageUpload) {
                i.onImageUpload(n, r, t)
            } else {
                e.each(n, function(e, n) {
                    u.readFileAsDataURL(n).then(function(e) {
                        r.insertImage(t, e)
                    }).fail(function() {
                        if (i.onImageUploadError) {
                            i.onImageUploadError()
                        }
                    })
                })
            }
        };
        var b = function(e) {
            if (s.isImg(e.target)) {
                e.preventDefault()
            }
        };
        var w = function(e) {
            var t = c(e.currentTarget || e.target);
            var n = r.currentStyle(e.target);
            if (!n) {
                return
            }
            i.update(t.toolbar(), n);
            o.update(t.popover(), n);
            f.update(t.handle(), n)
        };
        var E = function(e) {
            var t = c(e.currentTarget || e.target);
            o.hide(t.popover());
            f.hide(t.handle())
        };
        var S = function(t) {
            if (s.isControlSizing(t.target)) {
                var n = c(t.target),
                    i = n.handle(),
                    u = n.popover(),
                    a = n.editable(),
                    l = n.editor();
                var h = i.find(".note-control-selection").data("target"),
                    p = e(h);
                var d = p.offset(),
                    v = e(document).scrollTop();
                l.on("mousemove", function(e) {
                    r.resizeTo({
                        x: e.clientX - d.left,
                        y: e.clientY - (d.top - v)
                    }, p, !e.shiftKey);
                    f.update(i, {
                        image: h
                    });
                    o.update(u, {
                        image: h
                    })
                }).one("mouseup", function() {
                    l.off("mousemove")
                });
                if (!p.data("ratio")) {
                    p.data("ratio", p.height() / p.width())
                }
                r.recordUndo(a);
                t.stopPropagation();
                t.preventDefault()
            }
        };
        var x = function(t) {
            var n = e(t.target).closest("[data-event]");
            if (n.length > 0) {
                t.preventDefault()
            }
        };
        var T = function(o) {
            var u = e(o.target).closest("[data-event]");
            if (u.length > 0) {
                var a = u.attr("data-event"),
                    f = u.attr("data-value");
                var h = c(o.target);
                var p = h.editor(),
                    d = h.toolbar(),
                    v = h.dialog(),
                    m = h.editable(),
                    g = h.codable();
                var b;
                var E;
                var S = p.data("options");
                var x;
                if (e.inArray(a, ["resize", "floatMe", "removeMedia"]) !== -1) {
                    var T = h.handle();
                    var N = T.find(".note-control-selection");
                    x = e(N.data("target"))
                }
                if (r[a]) {
                    m.trigger("focus");
                    r[a](m, f, x)
                }
                if (e.inArray(a, ["backColor", "foreColor"]) !== -1) {
                    i.updateRecentColor(u[0], a, f)
                } else if (a === "showLinkDialog") {
                    m.focus();
                    var C = r.getLinkInfo();
                    r.saveRange(m);
                    l.showLinkDialog(m, v, C).then(function(e, t) {
                        r.restoreRange(m);
                        r.createLink(m, e, t)
                    })
                } else if (a === "showImageDialog") {
                    m.focus();
                    l.showImageDialog(m, v).then(function(e) {
                        if (typeof e === "string") {
                            r.restoreRange(m);
                            r.insertImage(m, e)
                        } else {
                            y(m, e)
                        }
                    })
                } else if (a === "showVideoDialog") {
                    m.focus();
                    var k = r.getVideoInfo();
                    r.saveRange(m);
                    l.showVideoDialog(m, v, k).then(function(e) {
                        r.restoreRange(m);
                        r.insertVideo(m, e)
                    })
                } else if (a === "showHelpDialog") {
                    l.showHelpDialog(m, v)
                } else if (a === "fullscreen") {
                    var L = e("html, body");
                    var A = function(e) {
                        p.css("width", e.w);
                        m.css("height", e.h);
                        g.css("height", e.h);
                        if (g.data("cmEditor")) {
                            g.data("cmEditor").setSize(null, e.h)
                        }
                    };
                    p.toggleClass("fullscreen");
                    var O = p.hasClass("fullscreen");
                    if (O) {
                        m.data("orgHeight", m.css("height"));
                        e(window).on("resize", function() {
                            A({
                                w: e(window).width(),
                                h: e(window).height() - d.outerHeight()
                            })
                        }).trigger("resize");
                        L.css("overflow", "hidden")
                    } else {
                        e(window).off("resize");
                        A({
                            w: S.width || "",
                            h: m.data("orgHeight")
                        });
                        L.css("overflow", "auto")
                    }
                    i.updateFullscreen(d, O)
                } else if (a === "codeview") {
                    p.toggleClass("codeview");
                    var M = p.hasClass("codeview");
                    if (M) {
                        g.val(m.html());
                        g.height(m.height());
                        i.deactivate(d);
                        g.focus();
                        if (n.bCodeMirror) {
                            E = t.fromTextArea(g[0], e.extend({
                                mode: "text/html",
                                lineNumbers: true
                            }, S.codemirror));
                            var _ = p.data("options").codemirror.tern || false;
                            if (_) {
                                b = new t.TernServer(_);
                                E.ternServer = b;
                                E.on("cursorActivity", function(e) {
                                    b.updateArgHints(e)
                                })
                            }
                            E.setSize(null, m.outerHeight());
                            if (E.autoFormatRange) {
                                E.autoFormatRange({
                                    line: 0,
                                    ch: 0
                                }, {
                                    line: E.lineCount(),
                                    ch: E.getTextArea().value.length
                                })
                            }
                            g.data("cmEditor", E)
                        }
                    } else {
                        if (n.bCodeMirror) {
                            E = g.data("cmEditor");
                            g.val(E.getValue());
                            E.toTextArea()
                        }
                        m.html(g.val() || s.emptyPara);
                        m.height(S.height ? g.height() : "auto");
                        i.activate(d);
                        m.focus()
                    }
                    i.updateCodeview(h.toolbar(), M)
                }
                w(o)
            }
        };
        var N = 24;
        var C = function(t) {
            var n = e(document);
            var r = c(t.target).editable();
            var i = r.offset().top - n.scrollTop();
            n.on("mousemove", function(e) {
                var t = e.clientY - (i + N);
                r.height(t)
            }).one("mouseup", function() {
                n.off("mousemove")
            });
            t.stopPropagation();
            t.preventDefault()
        };
        var k = 18;
        var L = function(t) {
            var n = e(t.target.parentNode);
            var r = n.next();
            var i = n.find(".note-dimension-picker-mousecatcher");
            var s = n.find(".note-dimension-picker-highlighted");
            var o = n.find(".note-dimension-picker-unhighlighted");
            var u;
            if (t.offsetX === undefined) {
                var a = e(t.target).offset();
                u = {
                    x: t.pageX - a.left,
                    y: t.pageY - a.top
                }
            } else {
                u = {
                    x: t.offsetX,
                    y: t.offsetY
                }
            }
            var f = {
                c: Math.ceil(u.x / k) || 1,
                r: Math.ceil(u.y / k) || 1
            };
            s.css({
                width: f.c + "em",
                height: f.r + "em"
            });
            i.attr("data-value", f.c + "x" + f.r);
            if (3 < f.c && f.c < 10) {
                o.css({
                    width: f.c + 1 + "em"
                })
            }
            if (3 < f.r && f.r < 10) {
                o.css({
                    height: f.r + 1 + "em"
                })
            }
            r.html(f.c + " x " + f.r)
        };
        var A = function(t) {
            var n = e(),
                r = t.dropzone,
                i = t.dropzone.find(".note-dropzone-message");
            e(document).on("dragenter", function(e) {
                var s = t.editor.hasClass("codeview");
                if (!s && n.length === 0) {
                    t.editor.addClass("dragover");
                    r.width(t.editor.width());
                    r.height(t.editor.height());
                    i.text("Drag Image Here")
                }
                n = n.add(e.target)
            }).on("dragleave", function(e) {
                n = n.not(e.target);
                if (n.length === 0) {
                    t.editor.removeClass("dragover")
                }
            }).on("drop", function() {
                n = e();
                t.editor.removeClass("dragover")
            });
            r.on("dragenter", function() {
                r.addClass("hover");
                i.text("Drop Image")
            }).on("dragleave", function() {
                r.removeClass("hover");
                i.text("Drag Image Here")
            });
            r.on("drop", function(e) {
                var t = e.originalEvent.dataTransfer;
                if (t && t.files) {
                    var n = c(e.currentTarget || e.target);
                    n.editable().focus();
                    y(n.editable(), t.files)
                }
                e.preventDefault()
            }).on("dragover", false)
        };
        this.bindKeyMap = function(e, t) {
            var n = e.editor;
            var i = e.editable;
            i.on("keydown", function(e) {
                var s = [];
                if (e.metaKey) {
                    s.push("CMD")
                }
                if (e.ctrlKey) {
                    s.push("CTRL")
                }
                if (e.shiftKey) {
                    s.push("SHIFT")
                }
                var o = a.nameFromCode[e.keyCode];
                if (o) {
                    s.push(o)
                }
                var u = t[s.join("+")];
                if (u) {
                    e.preventDefault();
                    r[u](i, n.data("options"))
                } else if (a.isEdit(e.keyCode)) {
                    r.recordUndo(i)
                }
            })
        };
        this.attach = function(e, t) {
            var i = t.keyMap[n.bMac ? "mac" : "pc"];
            this.bindKeyMap(e, i);
            e.editable.on("mousedown", b);
            e.editable.on("keyup mouseup", w);
            e.editable.on("scroll", E);
            if (!t.disableDragAndDrop) {
                A(e)
            }
            e.handle.on("mousedown", S);
            e.toolbar.on("click", T);
            e.popover.on("click", T);
            e.toolbar.on("mousedown", x);
            e.popover.on("mousedown", x);
            e.statusbar.on("mousedown", C);
            var s = e.toolbar;
            var o = s.find(".note-dimension-picker-mousecatcher");
            o.on("mousemove", L);
            e.editable.on("blur", function() {
                r.saveRange(e.editable)
            });
            e.editor.data("options", t);
            if (t.styleWithSpan && !n.bMSIE) {
                setTimeout(function() {
                    document.execCommand("styleWithCSS", 0, true)
                })
            }
            e.editable.data("NoteHistory", new p);
            if (t.onenter) {
                e.editable.keypress(function(e) {
                    if (e.keyCode === a.ENTER) {
                        t.onenter(e)
                    }
                })
            }
            if (t.onfocus) {
                e.editable.focus(t.onfocus)
            }
            if (t.onblur) {
                e.editable.blur(t.onblur)
            }
            if (t.onkeyup) {
                e.editable.keyup(t.onkeyup)
            }
            if (t.onkeydown) {
                e.editable.keydown(t.onkeydown)
            }
            if (t.onpaste) {
                e.editable.on("paste", t.onpaste)
            }
            if (t.onToolbarClick) {
                e.toolbar.click(t.onToolbarClick)
            }
            e.editable.data("callbacks", {
                onChange: t.onChange,
                onAutoSave: t.onAutoSave,
                onImageUpload: t.onImageUpload,
                onImageUploadError: t.onImageUploadError,
                onFileUpload: t.onFileUpload,
                onFileUploadError: t.onFileUpload
            })
        };
        this.dettach = function(e) {
            e.editable.off();
            e.toolbar.off();
            e.handle.off();
            e.popover.off()
        }
    };
    var b = function() {
        var t, r, i, o, u;
        t = {
            picture: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.image.image + '" data-event="showImageDialog" tabindex="-1"><i class="fa fa-picture-o icon-picture"></i></button>'
            },
            link: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.link.link + '" data-event="showLinkDialog" tabindex="-1"><i class="fa fa-link icon-link"></i></button>'
            },
            video: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.video.video + '" data-event="showVideoDialog" tabindex="-1"><i class="fa fa-youtube-play icon-play"></i></button>'
            },
            table: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="' + e.table.table + '" data-toggle="dropdown" tabindex="-1"><i class="fa fa-table icon-table"></i> <span class="caret"></span></button>' + '<ul class="dropdown-menu">' + '<div class="note-dimension-picker">' + '<div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div>' + '<div class="note-dimension-picker-highlighted"></div>' + '<div class="note-dimension-picker-unhighlighted"></div>' + "</div>" + '<div class="note-dimension-display"> 1 x 1 </div>' + "</ul>"
            },
            style: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="' + e.style.style + '" data-toggle="dropdown" tabindex="-1"><i class="fa fa-magic icon-magic"></i> <span class="caret"></span></button>' + '<ul class="dropdown-menu">' + '<li><a data-event="formatBlock" data-value="p">' + e.style.normal + "</a></li>" + '<li><a data-event="formatBlock" data-value="blockquote"><blockquote>' + e.style.blockquote + "</blockquote></a></li>" + '<li><a data-event="formatBlock" data-value="pre">' + e.style.pre + "</a></li>" + '<li><a data-event="formatBlock" data-value="h1"><h1>' + e.style.h1 + "</h1></a></li>" + '<li><a data-event="formatBlock" data-value="h2"><h2>' + e.style.h2 + "</h2></a></li>" + '<li><a data-event="formatBlock" data-value="h3"><h3>' + e.style.h3 + "</h3></a></li>" + '<li><a data-event="formatBlock" data-value="h4"><h4>' + e.style.h4 + "</h4></a></li>" + '<li><a data-event="formatBlock" data-value="h5"><h5>' + e.style.h5 + "</h5></a></li>" + '<li><a data-event="formatBlock" data-value="h6"><h6>' + e.style.h6 + "</h6></a></li>" + "</ul>"
            },
            fontname: function(e) {
                var t = ["Serif", "Sans", "Arial", "Arial Black", "Courier", "Courier New", "Comic Sans MS", "Helvetica", "Impact", "Lucida Grande", "Lucida Sans", "Tahoma", "Times", "Times New Roman", "Verdana"];
                var n = '<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" data-toggle="dropdown" title="' + e.font.name + '" tabindex="-1"><span class="note-current-fontname">Arial</span> <b class="caret"></b></button>';
                n += '<ul class="dropdown-menu">';
                for (var r = 0; r < t.length; r++) {
                    n += '<li><a data-event="fontName" data-value="' + t[r] + '"><i class="fa fa-check icon-ok"></i> ' + t[r] + "</a></li>"
                }
                n += "</ul>";
                return n
            },
            fontsize: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" data-toggle="dropdown" title="' + e.font.size + '" tabindex="-1"><span class="note-current-fontsize">11</span> <b class="caret"></b></button>' + '<ul class="dropdown-menu">' + '<li><a data-event="fontSize" data-value="8"><i class="fa fa-check icon-ok"></i> 8</a></li>' + '<li><a data-event="fontSize" data-value="9"><i class="fa fa-check icon-ok"></i> 9</a></li>' + '<li><a data-event="fontSize" data-value="10"><i class="fa fa-check icon-ok"></i> 10</a></li>' + '<li><a data-event="fontSize" data-value="11"><i class="fa fa-check icon-ok"></i> 11</a></li>' + '<li><a data-event="fontSize" data-value="12"><i class="fa fa-check icon-ok"></i> 12</a></li>' + '<li><a data-event="fontSize" data-value="14"><i class="fa fa-check icon-ok"></i> 14</a></li>' + '<li><a data-event="fontSize" data-value="18"><i class="fa fa-check icon-ok"></i> 18</a></li>' + '<li><a data-event="fontSize" data-value="24"><i class="fa fa-check icon-ok"></i> 24</a></li>' + '<li><a data-event="fontSize" data-value="36"><i class="fa fa-check icon-ok"></i> 36</a></li>' + "</ul>"
            },
            color: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small note-recent-color" title="' + e.color.recent + '" data-event="color" data-value=\'{"backColor":"yellow"}\' tabindex="-1"><i class="fa fa-font icon-font" style="color:black;background-color:yellow;"></i></button>' + '<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="' + e.color.more + '" data-toggle="dropdown" tabindex="-1">' + '<span class="caret"></span>' + "</button>" + '<ul class="dropdown-menu">' + "<li>" + '<div class="btn-group">' + '<div class="note-palette-title">' + e.color.background + "</div>" + '<div class="note-color-reset" data-event="backColor" data-value="inherit" title="' + e.color.transparent + '">' + e.color.setTransparent + "</div>" + '<div class="note-color-palette" data-target-event="backColor"></div>' + "</div>" + '<div class="btn-group">' + '<div class="note-palette-title">' + e.color.foreground + "</div>" + '<div class="note-color-reset" data-event="foreColor" data-value="inherit" title="' + e.color.reset + '">' + e.color.resetToDefault + "</div>" + '<div class="note-color-palette" data-target-event="foreColor"></div>' + "</div>" + "</li>" + "</ul>"
            },
            bold: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.font.bold + '" data-shortcut="Ctrl+B" data-mac-shortcut="âŒ˜+B" data-event="bold" tabindex="-1"><i class="fa fa-bold icon-bold"></i></button>'
            },
            italic: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.font.italic + '" data-shortcut="Ctrl+I" data-mac-shortcut="âŒ˜+I" data-event="italic" tabindex="-1"><i class="fa fa-italic icon-italic"></i></button>'
            },
            underline: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.font.underline + '" data-shortcut="Ctrl+U" data-mac-shortcut="âŒ˜+U" data-event="underline" tabindex="-1"><i class="fa fa-underline icon-underline"></i></button>'
            },
            strike: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.font.strike + '" data-event="strikethrough" tabindex="-1"><i class="fa fa-strikethrough icon-strikethrough"></i></button>'
            },
            clear: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.font.clear + '" data-shortcut="Ctrl+\\" data-mac-shortcut="âŒ˜+\\" data-event="removeFormat" tabindex="-1"><i class="fa fa-eraser icon-eraser"></i></button>'
            },
            ul: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.lists.unordered + '" data-shortcut="Ctrl+Shift+8" data-mac-shortcut="âŒ˜+â‡§+7" data-event="insertUnorderedList" tabindex="-1"><i class="fa fa-list-ul icon-list-ul"></i></button>'
            },
            ol: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.lists.ordered + '" data-shortcut="Ctrl+Shift+7" data-mac-shortcut="âŒ˜+â‡§+8" data-event="insertOrderedList" tabindex="-1"><i class="fa fa-list-ol icon-list-ol"></i></button>'
            },
            paragraph: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="' + e.paragraph.paragraph + '" data-toggle="dropdown" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i>  <span class="caret"></span></button>' + '<div class="dropdown-menu">' + '<div class="note-align btn-group">' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.paragraph.left + '" data-shortcut="Ctrl+Shift+L" data-mac-shortcut="âŒ˜+â‡§+L" data-event="justifyLeft" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i></button>' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.paragraph.center + '" data-shortcut="Ctrl+Shift+E" data-mac-shortcut="âŒ˜+â‡§+E" data-event="justifyCenter" tabindex="-1"><i class="fa fa-align-center icon-align-center"></i></button>' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.paragraph.right + '" data-shortcut="Ctrl+Shift+R" data-mac-shortcut="âŒ˜+â‡§+R" data-event="justifyRight" tabindex="-1"><i class="fa fa-align-right icon-align-right"></i></button>' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.paragraph.justify + '" data-shortcut="Ctrl+Shift+J" data-mac-shortcut="âŒ˜+â‡§+J" data-event="justifyFull" tabindex="-1"><i class="fa fa-align-justify icon-align-justify"></i></button>' + "</div>" + '<div class="note-list btn-group">' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.paragraph.outdent + '" data-shortcut="Ctrl+[" data-mac-shortcut="âŒ˜+[" data-event="outdent" tabindex="-1"><i class="fa fa-outdent icon-indent-left"></i></button>' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.paragraph.indent + '" data-shortcut="Ctrl+]" data-mac-shortcut="âŒ˜+]" data-event="indent" tabindex="-1"><i class="fa fa-indent icon-indent-right"></i></button>' + "</div>" + "</div>"
            },
            height: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" data-toggle="dropdown" title="' + e.font.height + '" tabindex="-1"><i class="fa fa-text-height icon-text-height"></i>&nbsp; <b class="caret"></b></button>' + '<ul class="dropdown-menu">' + '<li><a data-event="lineHeight" data-value="1.0"><i class="fa fa-check icon-ok"></i> 1.0</a></li>' + '<li><a data-event="lineHeight" data-value="1.2"><i class="fa fa-check icon-ok"></i> 1.2</a></li>' + '<li><a data-event="lineHeight" data-value="1.4"><i class="fa fa-check icon-ok"></i> 1.4</a></li>' + '<li><a data-event="lineHeight" data-value="1.5"><i class="fa fa-check icon-ok"></i> 1.5</a></li>' + '<li><a data-event="lineHeight" data-value="1.6"><i class="fa fa-check icon-ok"></i> 1.6</a></li>' + '<li><a data-event="lineHeight" data-value="1.8"><i class="fa fa-check icon-ok"></i> 1.8</a></li>' + '<li><a data-event="lineHeight" data-value="2.0"><i class="fa fa-check icon-ok"></i> 2.0</a></li>' + '<li><a data-event="lineHeight" data-value="3.0"><i class="fa fa-check icon-ok"></i> 3.0</a></li>' + "</ul>"
            },
            help: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.options.help + '" data-event="showHelpDialog" tabindex="-1"><i class="fa fa-question icon-question"></i></button>'
            },
            fullscreen: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.options.fullscreen + '" data-event="fullscreen" tabindex="-1"><i class="fa fa-arrows-alt icon-fullscreen"></i></button>'
            },
            codeview: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.options.codeview + '" data-event="codeview" tabindex="-1"><i class="fa fa-code icon-code"></i></button>'
            },
            undo: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.history.undo + '" data-event="undo" tabindex="-1"><i class="fa fa-undo icon-undo"></i></button>'
            },
            redo: function(e) {
                return '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.history.redo + '" data-event="redo" tabindex="-1"><i class="fa fa-repeat icon-repeat"></i></button>'
            }
        };
        r = function(e) {
            return '<div class="note-popover">' + '<div class="note-link-popover popover bottom in" style="display: none;">' + '<div class="arrow"></div>' + '<div class="popover-content note-link-content">' + '<a href="http://www.google.com" target="_blank">www.google.com</a>&nbsp;&nbsp;' + '<div class="note-insert btn-group">' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.link.edit + '" data-event="showLinkDialog" tabindex="-1"><i class="fa fa-edit icon-edit"></i></button>' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.link.unlink + '" data-event="unlink" tabindex="-1"><i class="fa fa-unlink icon-unlink"></i></button>' + "</div>" + "</div>" + "</div>" + '<div class="note-image-popover popover bottom in" style="display: none;">' + '<div class="arrow"></div>' + '<div class="popover-content note-image-content">' + '<div class="btn-group">' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.image.resizeFull + '" data-event="resize" data-value="1" tabindex="-1"><span class="note-fontsize-10">100%</span> </button>' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.image.resizeHalf + '" data-event="resize" data-value="0.5" tabindex="-1"><span class="note-fontsize-10">50%</span> </button>' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.image.resizeQuarter + '" data-event="resize" data-value="0.25" tabindex="-1"><span class="note-fontsize-10">25%</span> </button>' + "</div>" + '<div class="btn-group">' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.image.floatLeft + '" data-event="floatMe" data-value="left" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i></button>' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.image.floatRight + '" data-event="floatMe" data-value="right" tabindex="-1"><i class="fa fa-align-right icon-align-right"></i></button>' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.image.floatNone + '" data-event="floatMe" data-value="none" tabindex="-1"><i class="fa fa-align-justify icon-align-justify"></i></button>' + "</div>" + '<div class="btn-group">' + '<button type="button" class="btn btn-default btn-sm btn-small" title="' + e.image.remove + '" data-event="removeMedia" data-value="none" tabindex="-1"><i class="fa fa-trash-o icon-trash"></i></button>' + "</div>" + "</div>" + "</div>" + "</div>"
        };
        var i = function() {
            return '<div class="note-handle">' + '<div class="note-control-selection">' + '<div class="note-control-selection-bg"></div>' + '<div class="note-control-holder note-control-nw"></div>' + '<div class="note-control-holder note-control-ne"></div>' + '<div class="note-control-holder note-control-sw"></div>' + '<div class="note-control-sizing note-control-se"></div>' + '<div class="note-control-selection-info"></div>' + "</div>" + "</div>"
        };
        var a = function(e, t) {
            return '<table class="note-shortcut">' + "<thead>" + "<tr><th></th><th>" + e.shortcut.textFormatting + "</th></tr>" + "</thead>" + "<tbody>" + "<tr><td>âŒ˜ + B</td><td>" + e.font.bold + "</td></tr>" + "<tr><td>âŒ˜ + I</td><td>" + e.font.italic + "</td></tr>" + "<tr><td>âŒ˜ + U</td><td>" + e.font.underline + "</td></tr>" + "<tr><td>âŒ˜ + â‡§ + S</td><td>" + e.font.strike + "</td></tr>" + "<tr><td>âŒ˜ + \\</td><td>" + e.font.clear + "</td></tr>" + "</tr>" + "</tbody>" + "</table>"
        };
        var f = function(e, t) {
            return '<table class="note-shortcut">' + "<thead>" + "<tr><th></th><th>" + e.shortcut.action + "</th></tr>" + "</thead>" + "<tbody>" + "<tr><td>âŒ˜ + Z</td><td>" + e.history.undo + "</td></tr>" + "<tr><td>âŒ˜ + â‡§ + Z</td><td>" + e.history.redo + "</td></tr>" + "<tr><td>âŒ˜ + ]</td><td>" + e.paragraph.indent + "</td></tr>" + "<tr><td>âŒ˜ + [</td><td>" + e.paragraph.outdent + "</td></tr>" + "<tr><td>âŒ˜ + ENTER</td><td>" + e.hr.insert + "</td></tr>" + "</tbody>" + "</table>"
        };
        var l = function(e, t) {
            var n = '<table class="note-shortcut">' + "<thead>" + "<tr><th></th><th>" + e.shortcut.extraKeys + "</th></tr>" + "</thead>" + "<tbody>";
            for (var r in t.extraKeys) {
                if (!t.extraKeys.hasOwnProperty(r)) {
                    continue
                }
                n += "<tr><td>" + r + "</td><td>" + t.extraKeys[r] + "</td></tr>"
            }
            n += "</tbody></table>";
            return n
        };
        var c = function(e, t) {
            return '<table class="note-shortcut">' + "<thead>" + "<tr><th></th><th>" + e.shortcut.paragraphFormatting + "</th></tr>" + "</thead>" + "<tbody>" + "<tr><td>âŒ˜ + â‡§ + L</td><td>" + e.paragraph.left + "</td></tr>" + "<tr><td>âŒ˜ + â‡§ + E</td><td>" + e.paragraph.center + "</td></tr>" + "<tr><td>âŒ˜ + â‡§ + R</td><td>" + e.paragraph.right + "</td></tr>" + "<tr><td>âŒ˜ + â‡§ + J</td><td>" + e.paragraph.justify + "</td></tr>" + "<tr><td>âŒ˜ + â‡§ + NUM7</td><td>" + e.lists.ordered + "</td></tr>" + "<tr><td>âŒ˜ + â‡§ + NUM8</td><td>" + e.lists.unordered + "</td></tr>" + "</tbody>" + "</table>"
        };
        var h = function(e, t) {
            return '<table class="note-shortcut">' + "<thead>" + "<tr><th></th><th>" + e.shortcut.documentStyle + "</th></tr>" + "</thead>" + "<tbody>" + "<tr><td>âŒ˜ + NUM0</td><td>" + e.style.normal + "</td></tr>" + "<tr><td>âŒ˜ + NUM1</td><td>" + e.style.h1 + "</td></tr>" + "<tr><td>âŒ˜ + NUM2</td><td>" + e.style.h2 + "</td></tr>" + "<tr><td>âŒ˜ + NUM3</td><td>" + e.style.h3 + "</td></tr>" + "<tr><td>âŒ˜ + NUM4</td><td>" + e.style.h4 + "</td></tr>" + "<tr><td>âŒ˜ + NUM5</td><td>" + e.style.h5 + "</td></tr>" + "<tr><td>âŒ˜ + NUM6</td><td>" + e.style.h6 + "</td></tr>" + "</tbody>" + "</table>"
        };
        var p = function(e, t) {
            var n = '<table class="note-shortcut-layout">' + "<tbody>" + "<tr><td>" + f(e, t) + "</td><td>" + a(e, t) + "</td></tr>" + "<tr><td>" + h(e, t) + "</td><td>" + c(e, t) + "</td></tr>";
            if (t.extraKeys) {
                n += '<tr><td colspan="2">' + l(e, t) + "</td></tr>"
            }
            n += "</tbody</table>";
            return n
        };
        var d = function(e) {
            return e.replace(/âŒ˜/g, "Ctrl").replace(/â‡§/g, "Shift")
        };
        o = function(e, t) {
            var r = function() {
                return '<div class="note-image-dialog modal" aria-hidden="false">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button>' + "<h4>" + e.image.insert + "</h4>" + "</div>" + '<div class="modal-body">' + '<div class="row-fluid">' + "<h5>" + e.image.selectFromFiles + "</h5>" + '<input class="note-image-input" type="file" name="files" accept="image/*" />' + "<h5>" + e.image.url + "</h5>" + '<input class="note-image-url form-control span12" type="text" />' + "</div>" + "</div>" + '<div class="modal-footer">' + '<button href="#" class="btn btn-primary note-image-btn disabled" disabled="disabled">' + e.image.insert + "</button>" + "</div>" + "</div>" + "</div>" + "</div>"
            };
            var i = function() {
                return '<div class="note-link-dialog modal" aria-hidden="false">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button>' + "<h4>" + e.link.insert + "</h4>" + "</div>" + '<div class="modal-body">' + '<div class="row-fluid">' + '<div class="form-group">' + "<label>" + e.link.textToDisplay + "</label>" + '<input class="note-link-text form-control span12" disabled type="text" />' + "</div>" + '<div class="form-group">' + "<label>" + e.link.url + "</label>" + '<input class="note-link-url form-control span12" type="text" />' + "</div>" + (!t.disableLinkTarget ? '<div class="checkbox">' + "<label>" + '<input type="checkbox" checked> ' + e.link.openInNewWindow + "</label>" + "</div>" : "") + "</div>" + "</div>" + '<div class="modal-footer">' + '<button href="#" class="btn btn-primary note-link-btn disabled" disabled="disabled">' + e.link.insert + "</button>" + "</div>" + "</div>" + "</div>" + "</div>"
            };
            var s = function() {
                return '<div class="note-video-dialog modal" aria-hidden="false">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" aria-hidden="true" tabindex="-1">&times;</button>' + "<h4>" + e.video.insert + "</h4>" + "</div>" + '<div class="modal-body">' + '<div class="row-fluid">' + '<div class="form-group">' + "<label>" + e.video.url + '</label>&nbsp;<small class="text-muted">' + e.video.providers + "</small>" + '<input class="note-video-url form-control span12" type="text" />' + "</div>" + "</div>" + "</div>" + '<div class="modal-footer">' + '<button href="#" class="btn btn-primary note-video-btn disabled" disabled="disabled">' + e.video.insert + "</button>" + "</div>" + "</div>" + "</div>" + "</div>"
            };
            var o = function() {
                return '<div class="note-help-dialog modal" aria-hidden="false">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-body">' + '<a class="modal-close pull-right" aria-hidden="true" tabindex="-1">' + e.shortcut.close + "</a>" + '<div class="title">' + e.shortcut.shortcuts + "</div>" + (n.bMac ? p(e, t) : d(p(e, t))) + '<p class="text-center"><a href="//hackerwins.github.io/summernote/" target="_blank">Summernote 0.5.2</a> Â· <a href="//github.com/HackerWins/summernote" target="_blank">Project</a> Â· <a href="//github.com/HackerWins/summernote/issues" target="_blank">Issues</a></p>' + "</div>" + "</div>" + "</div>" + "</div>"
            };
            return '<div class="note-dialog">' + r() + i() + s() + o() + "</div>"
        };
        u = function() {
            return '<div class="note-resizebar"><div class="note-icon-bar"></div><div class="note-icon-bar"></div><div class="note-icon-bar"></div></div>'
        };
        var v = function(t, r) {
            t.find("button").each(function(t, r) {
                var i = e(r);
                var s = i.attr(n.bMac ? "data-mac-shortcut" : "data-shortcut");
                if (s) {
                    i.attr("title", function(e, t) {
                        return t + " (" + s + ")"
                    })
                }
            }).tooltip({
                container: "body",
                trigger: "hover",
                placement: r || "top"
            }).on("click", function() {
                e(this).tooltip("hide")
            })
        };
        var m = [
            ["#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#F7F7F7", "#FFFFFF"],
            ["#FF0000", "#FF9C00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF"],
            ["#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE"],
            ["#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD"],
            ["#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5"],
            ["#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B"],
            ["#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842"],
            ["#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
        ];
        var g = function(t) {
            t.find(".note-color-palette").each(function() {
                var t = e(this),
                    n = t.attr("data-target-event");
                var r = [];
                for (var i = 0, s = m.length; i < s; i++) {
                    var o = m[i];
                    var u = [];
                    for (var a = 0, f = o.length; a < f; a++) {
                        var l = o[a];
                        u.push(['<button type="button" class="note-color-btn" style="background-color:', l, ';" data-event="', n, '" data-value="', l, '" title="', l, '" data-toggle="button" tabindex="-1"></button>'].join(""))
                    }
                    r.push("<div>" + u.join("") + "</div>")
                }
                t.html(r.join(""))
            })
        };
        this.createLayout = function(n, a) {
            var f = n.next();
            if (f && f.hasClass("note-editor")) {
                return
            }
            var l = e('<div class="note-editor meditor-container sceditor-container"></div>');
            if (a.width) {
                l.width(a.width)
            }
            if (a.height > 0) {
                e('<div class="note-statusbar">' + u() + "</div>").prependTo(l)
            }
            var c = !n.is(":disabled");
            var h = e('<div class="note-editable meditor-iframe" contentEditable="' + c + '"></div>').prependTo(l);
            if (a.height) {
                h.height(a.height)
            }
            if (a.direction) {
                h.attr("dir", a.direction)
            }
            h.html(s.html(n) || s.emptyPara);
            e('<textarea class="note-codable"></textarea>').prependTo(l);
            var p = e.meditor.lang[a.lang];
            var d = "";
            for (var m = 0, y = a.toolbar.length; m < y; m++) {
                var b = a.toolbar[m];
                d += '<div class="note-' + b[0] + ' btn-group">';
                for (var w = 0, E = b[1].length; w < E; w++) {
                    d += t[b[1][w]](p)
                }
                d += "</div>"
            }
            d = '<div class="note-toolbar btn-toolbar">' + d + "</div>";
            var S = e(d).prependTo(l);
            g(S);
            v(S, "bottom");
            var x = e(r(p)).prependTo(l);
            v(x);
            e(i()).prependTo(l);
            var T = e(o(p, a)).prependTo(l);
            T.find("button.close, a.modal-close").click(function() {
                e(this).closest(".modal").modal("hide")
            });
            e('<div class="note-dropzone"><div class="note-dropzone-message"></div></div>').prependTo(l);
            l.insertAfter(n);
            n.hide();
            var N = l;
            var C = N.prev("textarea");
            var k = h;
            var L = e("<div/>", {
                "class": "meditor-link-thumbbox hide"
            }).appendTo(N);
            $editorBody = N.find(".meditor-iframe");
            $editorBody.addClass("form-controls").show();
            $editorBody.on("keyup", function(t) {
//		    alert(t.keyCode);
//                var n = [8, 17, 33, 34, 35, 36, 37, 38, 39, 40];
		C.val(e(this).html());
                var r = /@/ig;
                var i = /@(\w+)/ig;
                var s = /@.*(\s)/ig;
                var o = e(this).text();
                var u = o.match(r);
                var a = o.match(i);
                var f = o.match(s);
//                alert(u);

                topp = parseInt(e(this).caret("position").top) + 25;
                if (C.is(".full-me")) topp += 40;
//                alert(u);
		if (!u || u == null) e(".select-tag-users").remove();
		else if (u && u != null) {
			if (!N.find(".select-tag-users").length) e(this).after('<div class="select-tag-board select-tag-users" style="position: absolute; top: ' + topp + 'px"><a class="select-tag-close fa fa-times"></a> <div class="content"><div class="spinner"> <div></div> <div></div> <div></div> </div></div></div>');
			N.find(".select-tag-users").slideDown("show").find(".select-tag-close").click(function() {
				e(this).closest(".select-tag-users").remove()
			});
			N.find(".select-tag-users .content").html("Tag someone...");
			if (f != null) N.find(".select-tag-users").remove();
			else if (a.length > 0) {
				var url = MAIN_URL + "/pages/friendList.php";
				var l = "key=" + a;
				e.ajax({
					type: "POST",
					url: url,
					data: l,
					cache: false,
					success: function(t) {
						N.find(".select-tag-users").find(".content").html(t).show();
						N.find(".select-tag-users .one-fr-search").on("click", function() {
							ebody = N.find(".meditor-iframe");
							var tt = e(this).attr("alt");
							var nn = ebody.html();
							var rr = nn.replace(i, " ");
							ebody.html(rr + '<span class="tag-name" contenteditable="false">+' + tt + "</span><span>&nbsp;</span>");
							C.val(ebody.html());
							N.find(".select-tag-users").remove()
						})
					}
				})
			}
		}

		var rT = /#/ig;
		var iT = /#(\w+)/ig;
		var sT = /#.*(\s)/ig;
		var uT = o.match(rT);
		var aT = o.match(iT);
		var fT = o.match(sT);

		if (!uT || uT == null) e(".select-tag-trends").remove();
		else if (uT && uT != null) {
			if (!N.find(".select-tag-trends").length) e(this).after('<div class="select-tag-board select-tag-trends" style="position: absolute; top: ' + topp + 'px"><a class="select-tag-close fa fa-times"></a> <div class="content"><div class="spinner"> <div></div> <div></div> <div></div> </div></div></div>');
			N.find(".select-tag-trends").slideDown("show").find(".select-tag-close").click(function() {
				e(this).closest(".select-tag-trends").remove()
			});
			N.find(".select-tag-trends .content").html("Add a trend to your post...");
			if (fT != null) N.find(".select-tag-trends").remove();
			else if (aT.length > 0) {
				var url = MAIN_URL + "/pages/trendList.php";
				var l = "key=" + aT;
				e.ajax({
					type: "POST",
					url: url,
					data: l,
					cache: false,
					success: function(t) {
						N.find(".select-tag-trends").find(".content").html(t).show();
						N.find(".select-tag-trends .one-fr-search").on("click", function() {
							ebody = N.find(".meditor-iframe");
							var tt = e(this).attr("alt");
							var nn = ebody.html();
							var rr = nn.replace(iT, " ");
							ebody.html(rr + '<span class="tag-trend" contenteditable="false">#' + tt + "</span><span>&nbsp;</span>");
							C.val(ebody.html());
							N.find(".select-tag-trends").remove()
						})
					}
				})
			}
		} else e(".select-tag-trends").remove();
            })
        };
        this.layoutInfoFromHolder = function(e) {
            var t = e.next();
            if (!t.hasClass("note-editor")) {
                return
            }
            var n = s.buildLayoutInfo(t);
            for (var r in n) {
                if (n.hasOwnProperty(r)) {
                    n[r] = n[r].call()
                }
            }
            return n
        };
        this.removeLayout = function(e) {
            var t = this.layoutInfoFromHolder(e);
            if (!t) {
                return
            }
            e.html(t.editable.html());
            t.editor.remove();
            e.show()
        }
    };
    e.meditor = e.meditor || {};
    e.extend(e.meditor, o);
    var w = new b;
    var E = new y;
    e.fn.extend({
        meditor: function(t) {
            t = e.extend({}, e.meditor.options, t);
            this.each(function(n, r) {
                var i = e(r);
                w.createLayout(i, t);
                var o = w.layoutInfoFromHolder(i);
                E.attach(o, t);
                if (s.isTextarea(i[0])) {
                    i.closest("form").submit(function() {
                        i.html(i.code())
                    })
                }
            });
            if (this.first() && t.focus) {
                var n = w.layoutInfoFromHolder(this.first());
                n.editable.focus()
            }
            if (this.length > 0 && t.oninit) {
                t.oninit()
            }
            return this
        },
        code: function(t) {
            if (t === undefined) {
                var r = this.first();
                if (r.length === 0) {
                    return
                }
                var i = w.layoutInfoFromHolder(r);
                if (!!(i && i.editable)) {
                    var s = i.editor.hasClass("codeview");
                    if (s && n.bCodeMirror) {
                        i.codable.data("cmEditor").save()
                    }
                    return s ? i.codable.val() : i.editable.html()
                }
                return r.html()
            }
            this.each(function(n, r) {
                var i = w.layoutInfoFromHolder(e(r));
                if (i && i.editable) {
                    i.editable.html(t)
                }
            });
            return this
        },
        destroy: function() {
            this.each(function(t, n) {
                var r = e(n);
                var i = w.layoutInfoFromHolder(r);
                if (!i || !i.editable) {
                    return
                }
                E.dettach(i);
                w.removeLayout(r)
            });
            return this
        }
    })
})
