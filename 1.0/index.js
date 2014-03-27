/**
 * @fileoverview
 * @author yinruo.nyj<yinruo.nyj@taobao.com>
 * @module checkall
 **/
KISSY.add(function (S, Node,Base) {
    /**
     *
     * @class Checkall
     * @constructor
     * @extends Base
     * @param {Object} cfg
     * @param {Element|selector} [cfg.container] 限定全选的容器
     * @param {selector} cfg.checkAll 全选框
     * @param {selector} cfg.checkItem 子选框
     */
    function Checkall(cfg) {
        var self = this;

        //调用父类构造函数
        Checkall.superclass.constructor.call(self, cfg);

        this.config = cfg;
        this.container = Node.one( cfg.container || document.body );

        // 全选按钮
        this.container.delegate( 'change', cfg.checkAll, function( e ){
            Node.one( e.currentTarget ).fire( 'checkAllChange' );
        });

        // 每个单选框的点击和change事件
        this.container.delegate( 'change', cfg.checkItem, function( e ){
            Node.one( e.currentTarget).fire( 'checkItemChange' );
        });

        /**
         * 全选按钮发生变化
         */
        this.container.delegate( 'checkAllChange', cfg.checkAll, function( e ){

            var checked = self.ifChecked( e.currentTarget );
            // 同步其他全选按钮
            self._checkParents( checked );

            // 选中所有子节点
            self._checkChildren( checked );
        });

        /**
         * 单个checkbox发生变化
         */
        this.container.delegate( 'checkItemChange', cfg.checkItem, function(){

            // 检查是否所有子节点都选中了
            if( self._ifChildrenChecked() ){
                self._checkParents( true );
            }
            else {
                self._checkParents( false );
            }
        });
    }

    S.extend(Checkall, Base, /** @lends Checkall.prototype*/{

        /**
         * 选中单个checkbox
         * @param item
         * @param ifCheck
         */
        _checkItem: function( item, ifCheck ){
            ifCheck = ifCheck !== false;
            item = Node.all( item );
            item.attr( 'checked', ifCheck );
        },

        /**
         * 选中/反选所有的全选按钮
         * @param {Boolean} ifCheck
         * @private
         */
        _checkParents: function( ifCheck ){
            ifCheck = ifCheck !== false;
            var self = this;

            this.container.all( this.config.checkAll ).each(function( i ){
                var itemChecked = self.ifChecked( i );

                if( itemChecked !== ifCheck ){
                    self._checkItem( i, ifCheck );
                    Node.one( i ).fire( 'checkItemChange')
                }
            });
        },

        /**
         * 选中/反选所有的子节点
         * @param ifCheck
         * @private
         */
        _checkChildren: function( ifCheck ){
            ifCheck = ifCheck !== false;
            var self = this;

            this.container.all( this.config.checkItem ).each(function( i ){
                var itemChecked = self.ifChecked( i );

                if( itemChecked !== ifCheck ){
                    self._checkItem( i, ifCheck );
                    Node.one( i ).fire( 'checkAllChange')
                }
            });
        },

        /**
         * 是否所有的子节点都已经选中了
         */
        _ifChildrenChecked: function(){

            var ifCheckAll = true;
            var self = this;

            this.container.all( this.config.checkItem ).each(function( i ){
                if( !self.ifChecked( i ) ){
                    ifCheckAll = false;
                }
            });

            return ifCheckAll;
        },

        /**
         * 检查一个元素是否已经被选中
         * @param item
         * @return {Boolean}
         */
        ifChecked: function( item ){
            return S.one( item ).attr( 'checked' ) === 'checked';
        }

    }, { ATTRS : /** @lends Checkall*/{

    }});
    return Checkall;
}, {requires:['node', 'base']});
