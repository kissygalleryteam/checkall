/*!build time : 2014-03-27 3:32:16 PM*/
KISSY.add("gallery/checkall/1.0/index",function(a,b,c){function d(a){var c=this;d.superclass.constructor.call(c,a),this.config=a,this.container=b.one(a.container||document.body),this.container.delegate("change",a.checkAll,function(a){b.one(a.currentTarget).fire("checkAllChange")}),this.container.delegate("change",a.checkItem,function(a){b.one(a.currentTarget).fire("checkItemChange")}),this.container.delegate("checkAllChange",a.checkAll,function(a){var b=c.ifChecked(a.currentTarget);c._checkParents(b),c._checkChildren(b)}),this.container.delegate("checkItemChange",a.checkItem,function(){c._checkParents(c._ifChildrenChecked()?!0:!1)})}return a.extend(d,c,{_checkItem:function(a,c){c=c!==!1,a=b.all(a),a.attr("checked",c)},_checkParents:function(a){a=a!==!1;var c=this;this.container.all(this.config.checkAll).each(function(d){var e=c.ifChecked(d);e!==a&&(c._checkItem(d,a),b.one(d).fire("checkItemChange"))})},_checkChildren:function(a){a=a!==!1;var c=this;this.container.all(this.config.checkItem).each(function(d){var e=c.ifChecked(d);e!==a&&(c._checkItem(d,a),b.one(d).fire("checkAllChange"))})},_ifChildrenChecked:function(){var a=!0,b=this;return this.container.all(this.config.checkItem).each(function(c){b.ifChecked(c)||(a=!1)}),a},ifChecked:function(b){return"checked"===a.one(b).attr("checked")}},{ATTRS:{}}),d},{requires:["node","base"]});