/** @odoo-module */
import { patch } from "@web/core/utils/patch";
import { ReceiptScreen } from "@point_of_sale/app/screens/receipt_screen/receipt_screen";
import { useExternalListener } from "@odoo/owl";

patch(ReceiptScreen.prototype, {
    setup() {
        super.setup();
        useExternalListener(document, 'keydown', (event) => {
            if (!this.pos.config.enable_keyboard_shortcuts) return;
            if (!this.pos.keyboard_shortcuts?.[0]) return;
            event.preventDefault();
            const sc = this.pos.keyboard_shortcuts[0];
            if (event.ctrlKey && event.key === sc.print_receipt?.toLowerCase()) {
                this.printReceipt();
            }
            if (event.ctrlKey && event.key === sc.new_order?.toLowerCase()) {
                this.orderDone();
            }
            if (event.ctrlKey && event.key === sc.resume_order?.toLowerCase()) {
                this.resumeOrder();
            }
            if (event.ctrlKey && event.key === sc.sent_email?.toLowerCase()) {
                this.onSendEmail();
            }
        });
    },
});
