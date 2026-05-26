/** @odoo-module */
import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { useExternalListener } from "@odoo/owl";

patch(PaymentScreen.prototype, {
    setup() {
        super.setup();
        useExternalListener(document, 'keydown', (event) => {
            if (!this.pos.config.enable_keyboard_shortcuts) return;
            if (!this.pos.keyboard_shortcuts?.[0]) return;
            event.preventDefault();
            const sc = this.pos.keyboard_shortcuts[0];
            if (event.ctrlKey && event.key === sc.select_invoice?.toLowerCase()) {
                document.querySelector('.js_invoice')?.click();
            }
            if (event.ctrlKey && event.key === sc.back_screen?.toLowerCase()) {
                document.querySelector('.back')?.click();
            }
            if (this.pos.payment_method_key?.[0]) {
                if (event.ctrlKey && event.key === this.pos.payment_method_key[0].key_code?.toLowerCase()) {
                    document.querySelector('.payment-method-display')?.click();
                }
            }
            if (event.ctrlKey && event.key === sc.validate_order?.toLowerCase()) {
                this.validateOrder();
            }
        });
    },
});
