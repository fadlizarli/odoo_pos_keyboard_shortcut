/** @odoo-module */
import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { _t } from "@web/core/l10n/translation";
import { useState, useRef, onMounted } from "@odoo/owl";

export class SearchProductPopup extends AbstractAwaitablePopup {
    static template = "pos_keyboard_shortcut.SearchProductPopup";
    static defaultProps = {
        cancelText: _t("Close"),
        title: _t("Search Product"),
    };

    setup() {
        super.setup();
        this.pos = usePos();
        this.inputRef = useRef("searchInput");
        this.state = useState({
            searchWord: "",
            selectedIndex: 0,
        });
        onMounted(() => this.inputRef.el?.focus());
    }

    get filteredProducts() {
        const word = this.state.searchWord.toLowerCase().trim();
        if (!word) return [];
        let products = [];
        try {
            products = this.pos.models["product.product"].getAll();
        } catch {
            products = Object.values(this.pos.db?.product_by_id || {});
        }
        return products
            .filter((p) => p.available_in_pos !== false)
            .filter(
                (p) =>
                    p.display_name?.toLowerCase().includes(word) ||
                    p.barcode?.toLowerCase().includes(word) ||
                    p.default_code?.toLowerCase().includes(word)
            )
            .slice(0, 15);
    }

    onInput(ev) {
        this.state.searchWord = ev.target.value;
        this.state.selectedIndex = 0;
    }

    onKeyDown(ev) {
        const results = this.filteredProducts;
        if (ev.key === "ArrowDown") {
            ev.preventDefault();
            this.state.selectedIndex = Math.min(
                this.state.selectedIndex + 1,
                results.length - 1
            );
        } else if (ev.key === "ArrowUp") {
            ev.preventDefault();
            this.state.selectedIndex = Math.max(
                this.state.selectedIndex - 1,
                0
            );
        } else if (ev.key === "Enter") {
            ev.preventDefault();
            this._addProduct(results[this.state.selectedIndex]);
        } else if (ev.key === "Escape") {
            this.cancel();
        }
    }

    _addProduct(product) {
        if (!product) return;
        this.pos.get_order().add_product(product);
        this.confirm();
    }

    formatPrice(price) {
        try {
            return this.pos.format_currency(price);
        } catch {
            return (price ?? 0).toFixed(2);
        }
    }
}
