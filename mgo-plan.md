# Scope of Work – MNGO Ticketing Solution

# Phase 1

# 22 Dec 2025

## MNGO — FINAL SCOPE OF WORK Phase 1

## AI-Driven Ticketing, POS & Experience Management Platform

## 1. INTRODUCTION

```
1.1. Project Overview
```

MNGO is a next-generation, AI-driven ticketing and venue operations platform designed for:

- Theme parks & waterparks
- Museums & attractions
- Zoos & aquariums
- Events, shows & festivals
- Indoor parks & family entertainment centers

The platform replaces legacy systems (Vivaticket, Accesso, VGS, Semnox, Ticketmaster)
with:

- Modern microservices architecture
- AI-assisted configuration & reporting
- Universal Virtual Ticket Identity (UVTI)
- Unified POS, B2C, B2B & Access Control
  1.2. Core Principles
- Microservices-based architecture
- API-first (OTA, B2B, hardware, partners)
- AI reduces operational complexity
- One platform for sales, access & operations
- Multi-venue, multi-currency, multi-language

**Goal:** Establish the technical backbone of MNGO.

**Stories**

1. As a system, I want a multi-tenant architecture so multiple clients can operate
   independently
2. As an operator, I want multi-venue support under one account
3. As an admin, I want multi-currency configuration per venue
4. As an admin, I want multi-language support (EN/AR minimum)
5. As a system, I want environment-based deployment (cloud-ready, on-prem capable)
6. As an admin, I want audit logs for all critical actions

## User Journey

**Actors**

- Cashier

**User Journey**

1. Cashier clicks **Proceed to Payment**
2. Selects currency
3. FX rate shown
4. Selects payment method
5. Payment completed

**Outcome**

✔ Tourist-friendly

✔ Correct accounting

### PHASE 1 — CORE COMMERCIAL & OPERATIONAL PLATFORM

**Phase 1 goal:**
Enable full commercial operations: **sell tickets everywhere, control access, apply
promotions, manage members, and report everything.**

**1. POS — Point of Sale System (Phase 1)**

Core cashier system inspired by **VGS & Vivaticket** :

- Single-screen cashier UI (product catalog + cart + actions)
- Product tiles with images (tickets visually identifiable)
- Event & attraction selection
- Timeslot selection with live availability

- Seat selection (for reserved seating)
- Cart management
- Ticket lookup
- Refund, void, reissue
- Upgrade & upsell
- Coupon & discount application
- Membership sale at POS
- Multi-currency payments (cash, card, split payment)
- Shift open/close, cashier reconciliation
- Offline mode with sync

**Goal:** Enable fast and reliable on-site sales.

**Stories**

1. As a cashier, I want a single-screen POS interface
2. As a cashier, I want to browse products using visual tiles

3. As a cashier, I want to add tickets to cart
4. As a cashier, I want to apply discounts and coupons
5. As a cashier, I want to lookup existing tickets
6. As a cashier, I want to refund or void tickets
7. As a cashier, I want to upgrade tickets
8. As a cashier, I want offline POS support
9. As a supervisor, I want to approve restricted POS actions 4

## User Journey

**Actors**

- Cashier
- POS System

**User Journey**

1. Cashier opens **POS Home**

2. Sees visual product tiles (with images)
3. Clicks an **Event Ticket**
4. System opens **Event Calendar**
5. Cashier selects date
6. System opens **Timeslot Selection**
7. Cashier selects available timeslot
8. (If required) selects seats
9. Ticket added to cart
10. Cashier clicks **Proceed to Payment**
11. Selects payment method
12. Completes sale
13. Ticket issued (QR / print / digital)

**Outcome**

✔ Fast sale
✔ No confusion

✔ Real-time availability enforced

**Actors**

- Cashier
- Supervisor

**User Journey**

1. Cashier looks up ticket
2. Clicks **Refund**
3. System checks rules
4. Supervisor approval (if needed)
5. Refund issued
6. Wallet/card updated

**Outcome**

✔ Clean refund logic

✔ Financial control

**2. Ticket, Product & Package Engine (Phase 1)** - Ticket types (single, multi-day, season, family) - Packages & bundles - Add-ons & upgrades - Entitlements engine (access, fast track, benefits) - Validity rules (date, time, usage count) - Product matrix support - Media assignment (QR / RFID-ready)

**Goal:** Define what can be sold.

**Stories**

1. As an admin, I want to create ticket products
2. As an admin, I want to create packages and bundles
3. As an admin, I want to define ticket validity rules
4. As an admin, I want to configure entitlements per ticket
5. As a system, I want to support QR-based ticket identity
6. As a system, I want to link tickets to external media (RFID-ready)

**3. Event, Performance & Calendar Management (Phase 1)** - Venue & zone configuration - Event & attraction creation - Performances & timeslots - Capacity & availability rules - Seat map configuration - Maintenance & blackout periods - AI-assisted event setup (basic)

**Goal:** Control availability and capacity.

**Stories**

1. As an admin, I want to create events and attractions
2. As an admin, I want to define event calendars
3. As an admin, I want to create timeslots with capacity

4. As a system, I want to prevent overselling of timeslots
5. As a cashier, I want to see availability in real time
6. As an admin, I want to block dates for maintenance

## User Journey

**Actors**

- Cashier / Online Customer

**User Journey**

1. Select event-based product
2. System shows **availability calendar**
3. User selects date
4. System shows **timeslot grid** with capacity
5. User selects timeslot
6. seat map appears
7. Seats locked during checkout
8. Sale completed

**Outcome**

✔ No overselling

✔ Clear capacity control

✔ Identical flow for POS & B2C

Support reserved seating.

**Stories**

1. As an admin, I want to configure seat maps
2. As a cashier, I want to select seats during sale
3. As a system, I want to lock seats during checkout
4. As a system, I want to validate seat at access control

**4. Access Control & Gate Validation (Phase 1)** - QR / barcode scanning - RFID / NFC readiness - Online & offline gate validation - Anti-passback - Timeslot & seat validation - Membership validation - Gate/device configuration - Real-time access logs - REST API for third-party hardware

**Goal:** Control entry securely.

**Stories**

1. As a system, I want to validate QR tickets
2. As a system, I want to support offline validation
3. As a system, I want to prevent double entry (anti-passback)
4. As a system, I want to validate timeslots
5. As a system, I want to validate seat assignments
6. As an admin, I want to configure access points

## User Journey

**Actors**

- Guest
- Gate Device
- Access Control Service

**User Journey**

1. Guest arrives at gate
2. Ticket QR scanned
3. System validates:
   o Date
   o Timeslot
   o Seat (if applicable)

```
o Membership
```

4. If valid → green light
5. If invalid → reason shown
6. Entry logged

**Outcome**

✔ Secure entry

✔ Anti-passback

✔ Offline-ready

### OFFLINE ACCESS CONTROL

**Actors**

- Gate Device

**User Journey**

1. Internet goes down
2. Gate switches to offline mode
3. Uses last synced whitelist

4. Logs entries locally
5. Syncs when online returns

**Outcome**

✔ No gate shutdown

✔ No guest disruption

**5. Discount, Promotion & Fee Engine (Phase 1)** - Promo codes & coupons - Fixed & percentage discounts - Membership discounts - Channel-based rules (POS / B2C / B2B) - Complimentary tickets - Usage limits & validity windows - Stackable / non-stackable rules - Manual discounts with approval

- Fee configuration (service, booking, payment fees)

**Goal:** Control pricing incentives.

**Stories**

1. As an admin, I want to create promotion codes
2. As an admin, I want to set promotion validity rules
3. As an admin, I want to restrict promotion usage
4. As a cashier, I want to apply coupons at POS
5. As a system, I want to support membership discounts
6. As a supervisor, I want to approve manual discounts
7. As an admin, I want to configure service fees

## User Journey

**Actors**

- Cashier

- Supervisor (optional)

**User Journey**

1. Ticket is in cart
2. Cashier clicks **Apply Discount**
3. Options:
   o Coupon code
   o Membership discount (auto)
   o Manual discount
4. If manual discount:
   o Supervisor approval required
5. Approved discount applied
6. Cart recalculates totals

**Outcome**

✔ Controlled discounts
✔ No abuse

✔ Full audit

**6. Membership, Loyalty & Basic CRM (Phase 1)** - Membership creation & renewal - Tiered memberships - Family structure (parent / spouse / kids) - Wallet sharing & transfer rules - Membership discounts - Loyalty points (earn & redeem) - Basic customer profiles - Visit & purchase history

**Goal:** Retain customers and manage relationships.

**Stories**

1. As a cashier, I want to sell a membership
2. As an admin, I want to configure membership tiers

3. As a system, I want to apply membership discounts automatically
4. As a system, I want to track loyalty points
5. As a user, I want family-linked memberships
6. As a cashier, I want to apply membership to cart

## User Journey

**Actors**

- Cashier
- Customer

**User Journey**

1. Customer requests membership
2. Cashier clicks **New Membership**
3. Membership types displayed (with visuals)
4. Cashier selects tier
5. Customer details entered
6. Membership created

7. Membership auto-applied to cart
8. Discounts reflected immediately
   **Outcome**

```
✔ Upsell at POS
✔ Instant benefit
✔ Membership active immediately
```

**7. Wallet & Payments (Phase 1)** - Guest wallet - Membership wallet - B2B credit wallet - Wallet top-up & refund - Transfers between family members - Multi-currency support - Payment gateway integration

**Goal:** Collect money safely and flexibly.

**Stories**

1. As a cashier, I want to accept cash payments
2. As a cashier, I want to accept card payments
3. As a cashier, I want to support split payments
4. As a system, I want multi-currency payment support
5. As a user, I want a wallet balance
6. As a cashier, I want to refund to wallet

## User Journey

```
Actors
```

- Cashier

- Member
  **User Journey**

1. Cashier searches member
2. Opens **Family View**
3. Sees parent & kids
4. Selects **Transfer Balance**
5. Transfers from parent to child
6. System enforces limits
7. Transfer logged
   **Outcome**

```
✔ Easy family usage
✔ Secure wallet rules
```

**8. B2C Online Sales (Phase 1)** - Online ticket sales - Event calendar & timeslot selection - Seat selection - Promotions & coupons - Membership purchase - Digital ticket delivery (QR / wallet) - Mobile-friendly web experience

**Goal:** Sell tickets online.

**Stories**

1. As a customer, I want to browse events online
2. As a customer, I want to select timeslots

3. As a customer, I want to select seats
4. As a customer, I want to apply promo codes
5. As a customer, I want to pay online
6. As a system, I want to deliver digital tickets
7. As a customer, I want to create a profile
8. As a customer, I want to modify the booking
9. As a customer, I want to request for refund

## User Journey

**Actors**

- Customer

**User Journey**

1. Customer opens website
2. Browses events
3. Selects date & timeslot
4. Selects seats
5. Applies promo code
6. Pays online
7. Receives digital ticket
8. Create a profile
9. Modify the booking
10. Request for refund

**Outcome**

✔ Full self-service

✔ Same logic as POS

**11. B2B Reseller Portal (Phase 1)**

- B2B accounts & contracts
- Assigned products & net pricing
- Credit wallet loading
- Incentive programs
- Group bookings
- Voucher redemption

- Auto registration
- B2B reporting & settlement

**Goal:** Enable partner sales.

**Stories**

1. As an admin, I want to create B2B accounts
2. As an admin, I want to assign pricing to B2B partners
3. As a reseller, I want to load credit
4. As a reseller, I want to sell tickets
5. As an admin, I want to define incentives
6. As a reseller, I want sales reports
7. As end user I should be able to auto registration from the website

## User Journey

**Actors**

- B2B Reseller

**User Journey**

1. Reseller logs in
2. Sees assigned products
3. Uses credit wallet
4. Books tickets
5. Issues voucher/ticket
6. Ticket validated at gate

**Outcome**

✔ Controlled reseller sales

✔ Correct pricing

**10. Reporting, Analytics & BI (Phase 1)**

**Explicitly included in Phase 1**

- Sales & revenue reports
- Attendance & capacity reports
- Access control logs
- POS performance
- Membership & loyalty reports
- Promotion effectiveness
- B2B performance
- AI reporting assistant (natural language queries)

- Scheduled & exportable reports

**Goal:** Visibility and decision support.

**Stories**

1. As a manager, I want sales reports
2. As a manager, I want attendance reports
3. As a manager, I want POS performance reports
4. As a manager, I want membership reports
5. As a manager, I want promotion effectiveness reports
6. As a user, I want to ask reports in natural language (AI)

## User Journey

```
Actors
```

- Manager
  **User Journey**

1. Manager opens **Reports**
2. Types:
   “Show today’s sales by channel”
3. AI generates report
4. Manager filters/export
5. Schedules report
   **Outcome**

```
✔ No SQL knowledge
✔ Fast insights
```

**11. Configuration & Approval Workflow (Phase 1)** - Approval for:
o Price changes
o New tickets/products
o Promotions
o Manual discounts - Approval via:
o Backoffice
o Email
o Mobile approval screen - Full audit trail

**Goal:** Control operational risk.

**Stories**

1. As an admin, I want price changes to require approval
2. As a manager, I want to approve or reject changes
3. As a system, I want to notify managers of approvals

4. As a system, I want an audit trail of approvals

## User Journey

**Actors**

- Admin
- Manager

**User Journey**

1. Admin submits change (price/ticket)
2. Status = Pending Approval
3. Manager reviews impact
4. Approves or rejects
5. System publishes or discards
6. Audit recorded

**Outcome**

✔ Safe operations

✔ Governance enforced

**Mobile approval flow:**

**12. Users, Roles & Permissions (Phase 1)** - Role-based access control - Cashier / Supervisor / Manager roles - Approval permissions - Action audit logs

**Goal:** Secure system access and governance.

**Stories**

1. As an admin, I want to create roles (cashier, supervisor, manager)
2. As an admin, I want to assign permissions per role
3. As a supervisor, I want override permissions for restricted actions

4. As a system, I want to log all user actions
5. As an admin, I want to restrict sensitive actions by role
   **13. API & Integrations (Phase 1)**

- REST APIs for all core modules
- OTA readiness
- POS & Access Control APIs
- Webhooks for events & transactions

**Goal:** Enable ecosystem integrations.

**Stories**

1. As a partner, I want REST APIs for ticketing
2. As a partner, I want APIs for validation
3. As a partner, I want APIs for pricing & availability
4. As a system, I want webhooks for transactions

## User Journey

**Actors**

- OTA System

**User Journey**

1. OTA requests availability
2. System responds with capacity
3. OTA books ticket
4. Ticket issued
5. Guest validates at gate

**Outcome**

✔ OTA-ready

✔ Unified inventory

**14. AI-Driven Configuration Assistant (Phase 1)**

**Scope:**

- AI-assisted creation and modification of:
  o Events & attractions
  o Timeslots & calendars
  o Tickets & packages
  o Pricing rules
  o Promotions (basic)
- Natural language input for administrators
- Draft mode with full preview
- Mandatory approval workflow before activation
- Full audit logging of AI-generated changes

## User Journey

**Actors**

- Admin
- Manager (Approver)
- AI Assistant

**User Journey**

1. Admin opens **AI Configuration Assistant**
2. Admin types:

“Create a weekend family ticket, AED 250, valid 10am–6pm, includes fast track”

3. AI:
   o Creates ticket draft
   o Assigns validity rules
   o Suggests pricing & tax

```
o Shows preview (what will be created/changed)
```

4. Admin clicks **Submit for Approval**
5. Manager receives notification (email/mobile)
6. Manager reviews changes and **Approves**
7. System publishes configuration
8. Audit log records:
   o Requester
   o Approver
   o Changes

**Outcome**

✔ Ticket is live

✔ No technical admin needed
✔ Full governance
