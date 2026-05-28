/** @odoo-module */
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { patch } from "@web/core/utils/patch";
import { useExternalListener } from "@odoo/owl";

patch(ProductScreen.prototype, {
    setup(){
        super.setup(...arguments);
        useExternalListener(document, "keydown", (ev) => {
            if (Object.keys(this.popup.popups).length === 0) {
                this._product_screen_shortcuts(ev);
            }
        });
    },
    _product_screen_shortcuts(event){
        if (!this.pos.config.enable_keyboard_shortcuts || !this.pos.config.select_shortcut_id) return;
        if (!this.pos.keyboard_shortcuts?.[0]) return;
        if (!event.ctrlKey) return;
        const sc = this.pos.keyboard_shortcuts[0];
        if (event.key === sc.customer_screen?.toLowerCase()) {
            event.preventDefault();
            this.pos.selectPartner();
        }
        else if (event.key === sc.select_price?.toLowerCase()) {
            event.preventDefault();
            this.onNumpadClick('price');
        }
        else if (event.key === sc.select_discount?.toLowerCase()) {
            event.preventDefault();
            this.onNumpadClick('discount');
        }
        else if (event.key === sc.select_qty?.toLowerCase()) {
            event.preventDefault();
            this.onNumpadClick('quantity');
        }
        else if (event.key === sc.select_user?.toLowerCase()) {
            event.preventDefault();
            document.querySelector('.username')?.click();
        }
        else if (event.key === sc.next_screen?.toLowerCase()) {
            event.preventDefault();
            this.onClickPay();
        }
        else if (event.key === sc.search_product?.toLowerCase()) {
            event.preventDefault();
            document.querySelector('.products-widget-control input')?.focus();
        }
    }
});
