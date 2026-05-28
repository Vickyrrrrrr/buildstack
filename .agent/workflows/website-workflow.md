---
description: Buildstack Platform Workflow & User Lifecycle
---

# Buildstack Platform Workflow

This document outlines the end-to-end operational flow of the Buildstack agency platform, from initial lead generation to project delivery and administrative management.

## 1. Public Visitor Journey (Lead Generation)
1. **Landing Page**: Visitors land on the homepage to explore services, process, and "Featured Deliveries" (Portfolio).
2. **Contact Inquiry**: 
   - Visitor fills out the **Contact Form**.
   - They specify the service type (Web Design, SaaS, etc.).
   - Upon submission, the inquiry is saved to the `buildstack_projects` collection with a `pending` status.
3. **Login/Auth**: Visitors can sign up/in using **Google Authentication** to access their personal dashboard.

## 2. Administrative Flow (Project Onboarding)
1. **Inquiry Review**: The Admin (`vickynishad110@gmail.com`) accesses the **Admin Panel**.
2. **Client Management**: 
   - Admin views the list of incoming requests in the **Clients** tab.
   - Admin verifies details and "Approves" the project.
3. **Automated Setup**:
   - Approving a project automatically initializes the **5 delivery stations** (Requirements → Design → Development → Review → Delivered) in Firestore.
   - The project status moves from `pending` to `active`.

## 3. Project Execution & Sync
1. **Real-time Tracking**: As the team works, the Admin updates the status and notes of various **Stations** in the Admin Panel.
2. **Financial Management**: 
   - Admin generates an **Invoice** document in Firestore.
   - Once the client pays, the Admin marks the invoice as `paid`.
   - The Admin Dashboard's "Total Revenue" and charts update instantly.
3. **Deliverables**:
   - Admin uploads/shares **Preview URLs** or **File Links** via the Admin Panel.
   - These appear instantly in the client's "Deliverables" tab.

## 4. Client Experience (The Dashboard)
1. **Real-time Tracker**: Clients watch their project move through the timeline in the **Tracking** tab.
2. **Document Access**: 
   - **Invoices**: View billing history and payment status.
   - **Deliverables**: One-click access to review sites or download assets.
3. **Profile Settings**: Clients can update their business name, bio, and website URL, which persists across the platform.

## 5. Portfolio Showcase
1. **Completion**: Once a project is finished, the Admin can add it to the **Portfolio Manager**.
2. **Instant Visibility**: The project immediately appears on the public Homepage under "Featured Deliveries" using the `buildstack_portfolio` collection.
3. **External Links**: Potential customers can click "Live Demo" to visit the actual site (e.g., Dawakhana).

---
**Tech Stack Reminder:**
- **Auth**: Firebase Authentication (Google)
- **Database**: Firestore (Real-time `onSnapshot` listeners)
- **Deployment**: Next.js (App Router)
