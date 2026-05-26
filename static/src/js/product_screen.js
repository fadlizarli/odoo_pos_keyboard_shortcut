/** @odoo-module */
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { patch } from "@web/core/utils/patch";
import { useExternalListener } from "@odoo/owl";

patch(ProductScreen.prototype, {
    setup(){
        super.setup(...arguments);
        useExternalListener(document, "keydown", (ev) => {
            if (Object.keys(this.popup.popups).length === 0) {
                ev.preventDefault();
                this._product_screen_shortcuts(ev);
            }
        });
    },
    _product_screen_shortcuts(event){
        if (!this.pos.config.enable_keyboard_shortcuts || !this.pos.config.select_shortcut_id) return;
        if (!this.pos.keyboard_shortcuts?.[0]) return;
        const sc = this.pos.keyboard_shortcuts[0];
        if (event.ctrlKey && event.key === sc.customer_screen?.toLowerCase()) {
            this.pos.selectPartner();
        }
        else if (event.ctrlKey && event.key === sc.select_price?.toLowerCase()) {
            this.onNumpadClick('price');
        }
        else if (event.ctrlKey && event.key === sc.select_discount?.toLowerCase()) {
            this.onNumpadClick('discount');
        }
        else if (event.ctrlKey && event.key === sc.select_qty?.toLowerCase()) {
            this.onNumpadClick('quantity');
        }
        else if (event.ctrlKey && event.key === sc.select_user?.toLowerCase()) {
            document.querySelector('.username')?.click();
        }
        else if (event.ctrlKey && event.key === sc.next_screen?.toLowerCase()) {
            this.onClickPay();
        }
        else if (event.ctrlKey && event.key === sc.search_product?.toLowerCase()) {
            const searchInput = document.querySelector('.pos-search-bar input');
            searchInput?.focus();
        }
    }
});
