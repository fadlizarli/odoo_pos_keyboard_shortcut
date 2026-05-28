.. image:: https://img.shields.io/badge/licence-AGPL--3-blue.svg
    :target: http://www.gnu.org/licenses/agpl-3.0-standalone.html
    :alt: License: AGPL-3

.. image:: https://img.shields.io/badge/Odoo-17.0-blue.svg
    :alt: Odoo 17.0

POS KEYBOARD SHORTCUT
=====================

Overview
--------
This module adds configurable keyboard shortcuts to the Odoo 17 Point of Sale
interface, allowing cashiers to quickly navigate and perform common actions
without using the mouse.

Each POS configuration can have its own shortcut profile with fully
customizable key bindings. A **Shortcuts** reference button is also added to
the product screen so cashiers can view all active shortcuts at any time.

Features
--------
* Enable or disable keyboard shortcuts per POS terminal
* Multiple independent shortcut profiles — each with its own key bindings
* All keys are configurable (single character; some fixed keys are read-only)
* Payment method shortcuts — assign a key to each payment method
* **Shortcuts** popup button on the product screen shows the active key map
* Clipboard polyfill for HTTP environments (non-HTTPS servers)
* Covers Product Screen, Payment Screen, and Receipt Screen

Supported Shortcuts
-------------------

All shortcuts require the **Ctrl** key modifier (e.g. Ctrl+C).
Keys marked **(fixed)** cannot be changed.

**Product Screen**

+---------------------+-----------------------------------+
| Default Key         | Action                            |
+=====================+===================================+
| Ctrl + C            | Open Customer Screen              |
+---------------------+-----------------------------------+
| Ctrl + Q            | Select Quantity mode              |
+---------------------+-----------------------------------+
| Ctrl + D            | Select Discount mode              |
+---------------------+-----------------------------------+
| Ctrl + P            | Select Price mode                 |
+---------------------+-----------------------------------+
| Ctrl + U            | Select POS User                   |
+---------------------+-----------------------------------+
| Ctrl + Z            | Go to Payment Screen              |
+---------------------+-----------------------------------+
| Ctrl + F            | Focus Product Search Bar          |
+---------------------+-----------------------------------+
| Backspace (fixed)   | Delete selected order line        |
+---------------------+-----------------------------------+

**Payment Screen**

+---------------------+-----------------------------------+
| Default Key         | Action                            |
+=====================+===================================+
| Ctrl + I            | Toggle Invoice                    |
+---------------------+-----------------------------------+
| Ctrl + B            | Go Back to Product Screen         |
+---------------------+-----------------------------------+
| Ctrl + V (fixed)    | Validate / Confirm Order          |
+---------------------+-----------------------------------+
| Configurable        | Select Payment Method (per method)|
+---------------------+-----------------------------------+

**Receipt Screen**

+---------------------+-----------------------------------+
| Default Key         | Action                            |
+=====================+===================================+
| Ctrl + R            | Print Receipt                     |
+---------------------+-----------------------------------+
| Ctrl + X            | New Order (close receipt)         |
+---------------------+-----------------------------------+
| Ctrl + S            | Resume Order                      |
+---------------------+-----------------------------------+
| Ctrl + Y            | Send Receipt by Email             |
+---------------------+-----------------------------------+
| Ctrl + W            | Send Receipt via WhatsApp         |
+---------------------+-----------------------------------+
| Enter (fixed)       | Confirm / Next Screen             |
+---------------------+-----------------------------------+

**Popup Dialogs (all screens)**

+---------------------+-----------------------------------+
| Default Key         | Action                            |
+=====================+===================================+
| Enter (fixed)       | Confirm / OK                      |
+---------------------+-----------------------------------+
| Esc (fixed)         | Cancel / Close                    |
+---------------------+-----------------------------------+
| Ctrl + B            | Go Back                           |
+---------------------+-----------------------------------+
| Ctrl + M            | Close POS Session                 |
+---------------------+-----------------------------------+

Prerequisites
-------------
* Odoo **17.0**
* The built-in **Point of Sale** (``point_of_sale``) app must be installed

Installation
------------
1. Copy or clone the module folder into your Odoo addons directory::

       git clone https://github.com/fadlizarli/odoo_pos_keyboard_shortcut.git \
           /opt/odoo/custom-addons/odoo_pos_keyboard_shortcut

2. Add the path to ``addons_path`` in your ``odoo.conf`` if not already included::

       addons_path = /opt/odoo/addons,/opt/odoo/custom-addons

3. Restart the Odoo service::

       sudo systemctl restart odoo

4. Go to **Settings > Activate Developer Mode**, then
   **Apps > Update Apps List**, search for *POS Keyboard Shortcut*, and
   click **Install**.

Configuration
=============

Step 1 — Create a Shortcut Profile
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Open the **Point of Sale** app
2. Go to **Configuration > POS Keyboard Shortcut**
3. Click **New** — a reference number (e.g. ``PKS00001``) is auto-generated
4. Edit the key for each action as needed (single character, case-insensitive)
5. To add **Payment Method Shortcuts**, scroll to the *Payment Screen Shortcuts*
   section and add rows in the *Payment Method Shortcuts* table — choose a
   payment method and assign a key
6. Save the record

Step 2 — Enable on a POS Terminal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Go to **Point of Sale > Configuration > Settings**
2. Select the POS terminal you want to configure
3. Under **Connected Devices / Employee**, enable **Enable Keyboard Shortcuts**
4. In the **Choose Shortcut** field, select the profile created in Step 1
5. Save

Step 3 — Use in a POS Session
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Open a POS session
2. The **Shortcuts** button (ⓘ icon) appears in the product screen toolbar
3. Click **Shortcuts** to view the active key map at any time
4. Use ``Ctrl + [key]`` combinations as listed in the popup

Access Control
--------------
+---------------------+--------------------------------------------+
| Group               | Permissions                                |
+=====================+============================================+
| All users           | Read shortcut profiles                     |
+---------------------+--------------------------------------------+
| POS Manager         | Create, edit, and delete shortcut profiles |
+---------------------+--------------------------------------------+

Technical Overview
------------------

**Models**

+-------------------------------+--------------------------------------------+
| Model                         | Purpose                                    |
+===============================+============================================+
| ``pos.keyboard.shortcut``     | Shortcut profile — stores all key bindings |
+-------------------------------+--------------------------------------------+
| ``pos.payment.method.key``    | Maps a payment method to a shortcut key    |
+-------------------------------+--------------------------------------------+
| ``pos.config`` (extended)     | Adds enable flag and profile link          |
+-------------------------------+--------------------------------------------+
| ``res.config.settings`` (ext) | Exposes settings in POS Settings form      |
+-------------------------------+--------------------------------------------+

**JavaScript patches (OWL)**

+---------------------------+--------------------------------------------+
| File                      | Patches                                    |
+===========================+============================================+
| ``pos_store.js``          | Loads shortcut data into POS store         |
+---------------------------+--------------------------------------------+
| ``product_screen.js``     | Ctrl shortcuts for product screen          |
+---------------------------+--------------------------------------------+
| ``payment_screen.js``     | Ctrl shortcuts for payment screen          |
+---------------------------+--------------------------------------------+
| ``receipt_screen.js``     | Ctrl shortcuts for receipt screen          |
+---------------------------+--------------------------------------------+
| ``shortcut_button.js``    | Adds Shortcuts button to product screen    |
+---------------------------+--------------------------------------------+
| ``shortcut_popup.js``     | Popup showing active key map               |
+---------------------------+--------------------------------------------+
| ``error_popup.js``        | Warning popup when no profile is selected  |
+---------------------------+--------------------------------------------+
| ``clipboard_polyfill.js`` | Clipboard fallback for non-HTTPS servers   |
+---------------------------+--------------------------------------------+

Troubleshooting
---------------

**Search bar / numpad not responding to typing**
    Upgrade to version ``17.0.1.0.3`` or later. Earlier versions called
    ``ev.preventDefault()`` on all keydown events, blocking text input.

**TypeError: undefined is not an object (evaluating 'browser.navigator.clipboard.writeText')**
    The ``navigator.clipboard`` API requires HTTPS. On plain HTTP servers the
    API is unavailable. The ``clipboard_polyfill.js`` included from version
    ``17.0.1.0.2`` onwards provides an automatic ``document.execCommand``
    fallback. Long-term fix: serve Odoo behind HTTPS.

**Shortcuts button not visible in POS**
    Confirm that *Enable Keyboard Shortcuts* is checked in **POS Settings**
    for the active terminal.

**Shortcut key has no effect**
    * Make sure a shortcut profile is selected in POS Settings
    * Keys are case-insensitive; check there are no duplicate keys in the profile
    * Some keys (Enter, Esc, Backspace, V) are fixed and cannot be reassigned

**Conflict with browser shortcuts (e.g. Ctrl+P opens browser print)**
    All handlers call ``event.preventDefault()`` for matched shortcuts.
    Avoid assigning keys that conflict with critical OS shortcuts you rely on.

Changelog
---------

**17.0.1.0.5**

* Fix: search bar selector corrected from ``.pos-search-bar input`` to
  ``.products-widget-control input`` for proper Odoo 17 POS compatibility —
  the selector now correctly focuses the search input in Odoo 17's product
  list widget

**17.0.1.0.4**

* New: **Send Receipt via WhatsApp** shortcut (``Ctrl+W`` default) — calls the
  ``sendWhatsApp()`` method patched by the ``pos_whatsapp_receipt_baileys``
  module onto the Receipt Screen; uses optional chaining (``?.``) to ensure
  no crash when that module is not installed
* New: **Shortcut Popup** now displays all receipt screen shortcuts (print,
  new order, resume, email, WhatsApp) — previously only print receipt was listed

**17.0.1.0.3**

* Fix: keyboard handler was calling ``ev.preventDefault()`` on every keydown
  event, blocking the search bar, numpad, and all text input fields. Refactored
  to only intercept ``Ctrl+[key]`` combinations that are explicitly handled;
  all other keystrokes pass through normally.

**17.0.1.0.2**

* Fix: ``navigator.clipboard`` unavailable on HTTP — added
  ``clipboard_polyfill.js`` providing a ``document.execCommand('copy')``
  fallback, with a ``Proxy``-based secondary fallback when
  ``Object.defineProperty`` is blocked by the browser.

**17.0.1.0.1**

* Fix: ``hel=`` typo on ``select_discount`` field — help text was not displayed
* Fix: ``String=`` (capital S) on ``pos.payment.method.key`` — field label
  was missing in UI
* Fix: ``click_ok`` missing from constraint ``fields_to_check`` list
* Fix: memory leak in ``payment_screen.js`` and ``receipt_screen.js`` —
  replaced bare ``document.addEventListener`` with OWL
  ``useExternalListener`` (auto-removed on component destroy)
* Fix: null reference crash on DOM queries — added ``?.`` optional chaining
* Fix: replaced global ``owl.useExternalListener`` with explicit import from
  ``@odoo/owl``
* Fix: ``select_user`` appeared twice in shortcut popup table
* Fix: ``next_screen`` field label incorrectly set to "Payment Screen" in form
* Fix: tightened access rights — regular users are read-only; write/create/
  unlink restricted to POS Managers
* Fix: ``'summery'`` typo in ``__manifest__.py`` → ``'summary'``
* New: **Search Product** shortcut (``Ctrl+F`` default) — focuses the POS
  product search bar

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
Bugs are tracked on `GitHub Issues <https://github.com/fadlizarli/odoo_pos_keyboard_shortcut/issues>`__.
In case of trouble, please check there if your issue has already been reported.

Maintainer
==========
.. image:: https://cybrosys.com/images/logo.png
   :target: https://cybrosys.com

This module is maintained by Cybrosys Technologies.

For support and more information, please visit `Our Website <https://cybrosys.com/>`__

Further information
===================
HTML Description: `<static/description/index.html>`__
