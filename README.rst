.. image:: https://img.shields.io/badge/licence-AGPL--3-blue.svg
    :target: http://www.gnu.org/licenses/agpl-3.0-standalone.html
    :alt: License: AGPL-3

POS KEYBOARD SHORTCUT
=====================
This module adds configurable keyboard shortcuts to the Odoo 17 Point of Sale
interface, allowing cashiers to quickly navigate and perform common actions
without using the mouse.

Features
--------
* Enable/disable keyboard shortcuts per POS configuration
* Multiple configurable shortcut profiles (each with its own key bindings)
* Shortcut reference popup button on the POS product screen
* Shortcuts cover Product Screen, Payment Screen, and Receipt Screen

Supported Shortcuts
-------------------

**Product Screen**

+---------------------+---------------------------+
| Default Key         | Action                    |
+=====================+===========================+
| Ctrl + C            | Open Customer Screen      |
+---------------------+---------------------------+
| Ctrl + Q            | Select Quantity mode      |
+---------------------+---------------------------+
| Ctrl + D            | Select Discount mode      |
+---------------------+---------------------------+
| Ctrl + P            | Select Price mode         |
+---------------------+---------------------------+
| Ctrl + U            | Select POS User           |
+---------------------+---------------------------+
| Ctrl + Z            | Go to Payment Screen      |
+---------------------+---------------------------+
| Ctrl + F            | Search Product            |
+---------------------+---------------------------+
| Backspace           | Delete Order Line         |
+---------------------+---------------------------+

**Payment Screen**

+---------------------+---------------------------+
| Default Key         | Action                    |
+=====================+===========================+
| Ctrl + I            | Toggle Invoice            |
+---------------------+---------------------------+
| Ctrl + B            | Go Back                   |
+---------------------+---------------------------+
| Ctrl + V            | Validate Order            |
+---------------------+---------------------------+

**Receipt Screen**

+---------------------+---------------------------+
| Default Key         | Action                    |
+=====================+===========================+
| Ctrl + R            | Print Receipt             |
+---------------------+---------------------------+
| Ctrl + X            | New Order                 |
+---------------------+---------------------------+
| Ctrl + S            | Resume Order              |
+---------------------+---------------------------+
| Ctrl + Y            | Send Receipt by Email     |
+---------------------+---------------------------+

All shortcut keys are fully customizable per profile. Payment method shortcuts
can also be configured individually per payment method.

Configuration
=============
1. Go to **Point of Sale > Configuration > Settings**
2. Under the **Connected Devices / Employee** section, enable
   **Enable Keyboard Shortcuts**
3. Select or create a **Shortcut Profile** (POS Keyboard Shortcut)
4. In the shortcut profile form, customize key bindings as needed
5. Save and open a POS session — the **Shortcuts** button will appear on the
   product screen

Access Control
--------------
* **All users**: read access to shortcut profiles
* **POS Manager**: full access (create, edit, delete shortcut profiles)

Changelog
---------

**17.0.1.0.1**

* Fix: ``hel=`` typo on ``select_discount`` field (help text was not displayed)
* Fix: ``String=`` capitalization on ``pos.payment.method.key`` (field label
  was missing in UI)
* Fix: ``click_ok`` field missing from constraint validation list
* Fix: memory leak — replaced bare ``document.addEventListener`` in
  ``payment_screen.js`` and ``receipt_screen.js`` with OWL
  ``useExternalListener`` (auto-cleanup on component destroy)
* Fix: null reference errors on DOM queries — added optional chaining ``?.``
* Fix: replaced global ``owl.useExternalListener`` with explicit import from
  ``@odoo/owl``
* Fix: ``select_user`` duplicated in shortcut popup table
* Fix: ``next_screen`` field label was incorrectly set to "Payment Screen" in
  form view
* Fix: tightened access rights — regular users are now read-only; write/create/
  unlink restricted to POS Managers
* Fix: ``'summery'`` typo in ``__manifest__.py`` → ``'summary'``
* New: **Search Product** shortcut (Ctrl+F by default) — focuses the POS
  product search bar from anywhere on the product screen

**17.0.1.0.0**

* Initial release

Company
-------
* `Cybrosys Techno Solutions <https://cybrosys.com/>`__

License
-------
GNU Affero General Public License v3.0 (AGPL v3)
(https://www.gnu.org/licenses/agpl-3.0-standalone.html)

Credits
-------
Developer: version 17: Ajith V @cybrosys,
Contact: odoo@cybrosys.com

Contacts
--------
* Mail Contact : odoo@cybrosys.com
* Website : https://cybrosys.com

Bug Tracker
-----------
Bugs are tracked on GitHub Issues. In case of trouble, please check there if
your issue has already been reported.

Maintainer
==========
.. image:: https://cybrosys.com/images/logo.png
   :target: https://cybrosys.com

This module is maintained by Cybrosys Technologies.

For support and more information, please visit `Our Website <https://cybrosys.com/>`__

Further information
===================
HTML Description: `<static/description/index.html>`__
