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
            if (!event.ctrlKey) return;
            const sc = this.pos.keyboard_shortcuts[0];
            if (event.key === sc.print_receipt?.toLowerCase()) {
                event.preventDefault();
                this.printReceipt();
            }
            if (event.key === sc.new_order?.toLowerCase()) {
                event.preventDefault();
                this.orderDone();
            }
            if (event.key === sc.resume_order?.toLowerCase()) {
                event.preventDefault();
                this.resumeOrder();
            }
            if (event.key === sc.sent_email?.toLowerCase()) {
                event.preventDefault();
                this.onSendEmail();
            }
            if (event.key === sc.send_whatsapp?.toLowerCase()) {
                event.preventDefault();
                this.sendWhatsApp?.();
            }
        });
    },
});
