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
            if (!event.ctrlKey) return;
            const sc = this.pos.keyboard_shortcuts[0];
            if (event.key === sc.select_invoice?.toLowerCase()) {
                event.preventDefault();
                document.querySelector('.js_invoice')?.click();
            }
            if (event.key === sc.back_screen?.toLowerCase()) {
                event.preventDefault();
                document.querySelector('.back')?.click();
            }
            if (this.pos.payment_method_key?.[0]) {
                if (event.key === this.pos.payment_method_key[0].key_code?.toLowerCase()) {
                    event.preventDefault();
                    document.querySelector('.payment-method-display')?.click();
                }
            }
            if (event.key === sc.validate_order?.toLowerCase()) {
                event.preventDefault();
                this.validateOrder();
            }
        });
    },
});
