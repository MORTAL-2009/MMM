# PRD.md --- Make My Marriage

## Complete Product Requirements Document

**Product:** Make My Marriage\
**Product type:** Wedding-management web application\
**Default theme:** Gold Noir\
**Frontend:** React + Vite + Tailwind CSS\
**Backend:** Supabase\
**Database:** PostgreSQL\
**Authentication:** Supabase Auth\
**Real-time features:** Supabase Realtime\
**Deployment:** Vercel or Netlify\
**Target users:** Families managing their own weddings

## 1. Product Vision

Make My Marriage helps families organize a wedding from one application.
It combines financial management, family communication, digital
invitations, and administrative controls in a premium luxury interface.

Build a working product, not just a static UI. Core buttons, forms,
filters, database operations, authentication, and permissions must work.

### Product principles

-   Luxury design with simple navigation.
-   Real database persistence.
-   Secure separation between wedding workspaces.
-   Mobile-first responsive behavior.
-   Real-time family conversations.
-   Clear financial information.
-   Admin controls with proper authorization.
-   Maintainable, reusable React components.

## 2. Main Features

The four primary features are: 1. Wedding Expense Tracker 2. Family
Conversations 3. Digital Wedding Invitations 4. Admin Panel

The Dashboard, Authentication, Settings, Reports, Notifications, and
Security support these main features.

## 3. User Roles and Permissions

Implement role-based access control.

### Owner

-   Creates and owns the wedding workspace.
-   Manages workspace settings and budget.
-   Invites and removes members.
-   Assigns admin permissions.
-   Accesses all workspace features.
-   Controls workspace ownership and deletion.

### Admin

-   Manages members within permitted limits.
-   Manages expenses and wedding details.
-   Manages invitations and workspace content.
-   Reviews activity history.
-   Moderates messages only through explicitly authorized functionality.
-   Cannot bypass owner-level permissions.

### Family Member

-   Views the wedding dashboard.
-   Adds and views permitted expenses.
-   Sends and receives family messages.
-   Views wedding invitations.
-   Updates permitted profile information.

### Public Guest

-   Opens a published digital invitation through its unique link.
-   Can only view information intentionally published by the wedding
    owner.
-   Does not need an account to view the invitation.

Enforce these roles through Supabase Row Level Security (RLS) and
trusted backend operations. Hiding buttons in the frontend is not
sufficient security.

## 4. Feature One --- Wedding Expense Tracker

Build a complete expense-management system.

### 4.1 Budget management

-   Set and edit the total wedding budget.
-   Display total expenses, paid expenses, pending expenses, and
    remaining budget.
-   Calculate budget utilisation as a percentage.
-   Warn users when spending approaches the budget.
-   Clearly indicate when expenses exceed the budget.
-   Recalculate financial totals after every successful change.

Calculations: - **Total expenses:** sum of all recorded expenses. -
**Paid total:** sum of expenses marked Paid. - **Pending total:** sum of
expenses marked Pending. - **Remaining budget:** budget minus total
expenses. - **Budget utilisation:** total expenses divided by budget,
multiplied by 100, when budget is greater than zero.

Do not allow invalid amounts or divide by zero.

### 4.2 Expense CRUD

Users with appropriate permissions can create, read, update, and delete
expenses.

Each expense supports: - Expense title. - Amount in INR (₹). -
Category. - Expense date. - Paid or Pending status. - Payer/family side:
Groom's Side or Bride's Side. - Optional notes. - Creator and creation
timestamp. - Last-updated timestamp.

### 4.3 Default categories

-   Venue
-   Catering
-   Decoration
-   Clothing
-   Photography
-   Transport
-   Gifts
-   Invitations
-   Other

Allow administrators to manage categories if implemented without
compromising existing records.

### 4.4 Expense views

-   Search by expense title.
-   Filter by category.
-   Filter by date or date range.
-   Filter by payment status.
-   Filter by family side.
-   Sort by date, amount, or title.
-   Paginate large lists.
-   Display recent expenses on the dashboard.
-   Show category-wise financial breakdowns.
-   Compare expenses between the bride's and groom's sides.

### 4.5 Validation

-   Amount must be greater than zero.
-   Title and category are required.
-   Date must be valid.
-   Prevent accidental duplicate submissions.
-   Confirm before deletion.
-   Show success and error feedback.
-   Keep database records and dashboard totals consistent.

## 5. Feature Two --- Family Conversations

Create a shared real-time chat for authorized members of the same
wedding workspace.

### 5.1 Messaging

-   Send and receive text messages.
-   Display sender name, family-side label, and timestamp.
-   Persist messages in Supabase.
-   Receive new messages through Supabase Realtime.
-   Load previous conversation history.
-   Automatically scroll to the latest message when appropriate.
-   Support Enter to send and Shift + Enter for a new line.
-   Show sending, failure, and retry states.
-   Handle temporary disconnections gracefully.

### 5.2 Chat security

-   Only workspace members can read and send messages.
-   Users cannot access another wedding's conversation.
-   Validate message length and content.
-   Protect against unauthorized edits and deletions.
-   Do not permit ordinary members to moderate other people's messages
    unless explicitly authorized.
-   Record moderation actions when moderation functionality is enabled.

A single shared family chat is sufficient for the initial version.
Separate group chats and file sharing can be added later.

## 6. Feature Three --- Digital Wedding Invitations

Create a digital invitation builder with a live preview.

### 6.1 Invitation details

Support: - Bride's name. - Groom's name. - Wedding date. - Wedding
time. - Venue name. - Venue address. - Custom invitation message. -
Optional host or family names. - Publication status. - Unique invitation
slug or URL.

### 6.2 Invitation builder

-   Provide a form to edit invitation details.
-   Show a live preview while editing.
-   Save changes to the database.
-   Display validation errors.
-   Provide a publish/unpublish control for authorized users.
-   Allow the owner to update details without generating an entirely new
    invitation.
-   Preserve a polished design on desktop and mobile.

### 6.3 Public invitation page

-   Use a unique URL for each wedding.
-   Do not require guest login.
-   Display only explicitly published fields.
-   Include bride and groom names, event date, time, venue, and
    invitation message.
-   Use a beautiful, responsive invitation card.
-   Show an appropriate unavailable page for unpublished or invalid
    links.
-   Do not expose internal workspace IDs, family messages, financial
    records, or private member information.

### 6.4 Sharing

-   Copy invitation URL.
-   Provide a WhatsApp share link using the published invitation URL.
-   Display feedback when the URL is copied.
-   Use the Web Share API where supported, with a copy-link fallback.

Guest RSVP, QR codes, photo galleries, and advanced invitation editing
are future enhancements.

## 7. Feature Four --- Admin Panel

Build a dedicated administration area accessible only to authorized
users.

### 7.1 Admin overview

Display: - Wedding budget. - Total expenses. - Paid and pending
totals. - Remaining budget. - Member count. - Recent expenses. - Recent
workspace activity. - Quick links to key management sections.

### 7.2 Member management

-   List workspace members.
-   Display member name, email where authorized, family side, role, and
    membership status.
-   Invite new members.
-   Support invitation acceptance and rejection.
-   Assign and update roles according to the current user's permissions.
-   Remove members with confirmation.
-   Prevent accidental removal of the last owner.
-   Prevent users from granting themselves additional privileges.
-   Enforce invitation expiration and safe acceptance where supported.

Implement invitation delivery through a configured email provider or a
secure invitation workflow. Do not simulate successful delivery when no
delivery provider is configured.

### 7.3 Expense administration

-   View workspace expenses.
-   Edit or delete records according to permissions.
-   Review expense creator and timestamps.
-   Confirm destructive actions.
-   Record important administrative changes in the activity log.

### 7.4 Conversation administration

-   Review permitted workspace conversation activity.
-   Provide message moderation only for authorized roles.
-   Record the moderator, action, and timestamp.
-   Do not silently rewrite or delete messages without appropriate
    authorization and an audit trail.

### 7.5 Invitation administration

-   Edit invitation details.
-   Preview the public page.
-   Publish or unpublish the invitation.
-   Copy and share its URL.
-   Verify that public pages expose only published invitation fields.

### 7.6 Workspace administration

-   Edit wedding details.
-   Change the total budget.
-   Review membership and access.
-   Configure allowed workspace preferences.
-   Provide a carefully protected workspace deletion workflow if
    deletion is implemented.

## 8. Dashboard

Create a polished home dashboard after login.

### 8.1 Financial summary cards

Display: - Total budget. - Total expenses. - Remaining budget. - Paid
amount. - Pending amount. - Budget utilisation.

### 8.2 Dashboard sections

-   Category-wise spending chart.
-   Bride's-side versus groom's-side spending.
-   Recent expenses.
-   Recent family messages.
-   Upcoming wedding date or countdown.
-   Quick actions to add an expense, open chat, and edit the invitation.
-   Important budget warnings.
-   Workspace activity summary.

All data must come from the authenticated user's actual workspace. Do
not leave sample data in production.

## 9. Authentication and Workspace Setup

Use Supabase Auth.

### 9.1 Authentication

-   Sign up with email and password.
-   Sign in.
-   Sign out.
-   Password recovery.
-   Session persistence.
-   Protected application routes.
-   Clear authentication errors and loading states.

### 9.2 Initial setup

After account creation: 1. Create a wedding workspace. 2. Enter the
wedding name. 3. Enter bride and groom names. 4. Set the wedding date
and venue. 5. Set the total budget. 6. Set the creator's profile name
and family side. 7. Open the dashboard.

The creator becomes the workspace owner.

### 9.3 Workspace isolation

-   A user may belong to one or more workspaces if supported by the data
    model.
-   All records must be associated with the correct workspace.
-   A user can only access records permitted by their membership.
-   Do not trust workspace IDs sent by the frontend without verifying
    membership and permissions.

## 10. Settings

Create a dedicated settings page.

### Wedding settings

-   Wedding name.
-   Bride and groom names.
-   Wedding date and time.
-   Venue and address.
-   Total budget.
-   Family-side details.
-   Invitation publication settings.

### Profile settings

-   Display name.
-   Family side where applicable.
-   Account preferences.

### Workspace settings

-   Member management entry point.
-   Theme selection.
-   Notification preferences.
-   Workspace access and security information.

Persist all saved settings to Supabase.

## 11. Reports and Financial Insights

Build a reports section using real expense records.

-   Total spending report.
-   Category-wise spending.
-   Bride's-side versus groom's-side comparison.
-   Paid versus pending totals.
-   Budget versus actual spending.
-   Highest-cost categories.
-   Date-range reports.
-   CSV export suitable for Excel.

Reports must respect workspace permissions and active filters. Format
currency in Indian Rupees using an appropriate locale.

## 12. Notifications and Activity History

### In-app notifications

Prepare support for: - New family messages. - New workspace
invitations. - Expense additions and edits. - Budget warnings. -
Important administrative changes.

### Notification behavior

-   Read and unread status.
-   Timestamp.
-   Link to the relevant workspace page.
-   Permission-aware delivery and display.

### Activity log

Record important events such as: - Expense creation, edits, and
deletion. - Member invitations and removals. - Role changes. - Wedding
settings updates. - Invitation publication changes. - Administrative
moderation actions.

Include the actor, action, affected record where appropriate, and
timestamp. Prevent ordinary users from modifying audit history.

Push notifications and external messaging notifications are future
enhancements.

## 13. UI/UX and Design System

The website must look premium, elegant, modern, and wedding-focused.

### 13.1 Default theme --- Gold Noir

Use: - Deep black and charcoal backgrounds. - Antique gold accents. -
Warm neutral text. - Elegant typography. - Refined borders and subtle
shadows. - Premium dashboard cards. - Restrained gradients and
animations.

Avoid excessive gold, visual clutter, and overly bright neon effects.

### 13.2 Additional themes

Provide a theme selector with four choices:

**Gold Noir** - Black and antique gold. - Default theme.

**Emerald Velvet** - Deep emerald, dark green, and gold accents.

**Sapphire Lounge** - Midnight blue, sapphire, and gold accents.

**Champagne Pearl** - Ivory, champagne, pearl, and warm gold accents.

Themes must update the application consistently, including navigation,
buttons, cards, forms, tables, dialogs, and charts. Persist the selected
theme for the user.

### 13.3 Layout

-   Desktop sidebar navigation.
-   Mobile-friendly navigation.
-   Top bar with page title and profile menu.
-   Consistent content spacing.
-   Responsive cards, tables, charts, and forms.
-   Clear active navigation state.
-   Accessible labels and keyboard focus.

### 13.4 Navigation

Include: - Dashboard. - Expenses. - Family Chat. - Digital Invitation. -
Reports. - Notifications. - Settings. - Admin Panel, visible only to
authorized roles.

### 13.5 UX requirements

-   Loading skeletons or loading indicators.
-   Useful empty states.
-   Form validation.
-   Success and error feedback.
-   Confirmation dialogs for destructive actions.
-   Responsive mobile forms.
-   Smooth but restrained animations.
-   Accessible contrast and keyboard navigation.
-   Consistent date, number, and currency formatting.

## 14. Technical Architecture

### Frontend

-   React.
-   Vite.
-   Tailwind CSS.
-   React Router for navigation.
-   Lucide React for icons.
-   Reusable components and shared design tokens.
-   A maintained charting library for financial visualizations.

### Backend

-   Supabase PostgreSQL.
-   Supabase Auth.
-   Supabase Realtime.
-   Row Level Security.
-   Database constraints and indexes.
-   Trusted server-side functions for privileged operations.

Use Supabase Edge Functions or equivalent trusted server-side logic when
an operation requires secrets, privileged access, invitation processing,
or sensitive authorization checks.

Never expose a Supabase service-role key in frontend code.

### Suggested folder structure

``` text
make-my-marriage/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── forms/
│   │   └── charts/
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── expenses/
│   │   ├── chat/
│   │   ├── invitation/
│   │   ├── admin/
│   │   ├── reports/
│   │   └── settings/
│   ├── hooks/
│   ├── contexts/
│   ├── lib/
│   │   ├── supabase.js
│   │   ├── permissions.js
│   │   └── utils.js
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   ├── migrations/
│   ├── functions/
│   └── seed.sql
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── README.md
└── PRD.md
```

Adjust the structure if needed, but keep features modular and
maintainable.

## 15. Database Design

Create appropriate migrations and constraints for the following tables.

### profiles

-   `id` --- UUID referencing the authenticated user.
-   `display_name`.
-   `created_at`.
-   `updated_at`.

### weddings

-   `id` --- UUID.
-   `name`.
-   `owner_id`.
-   `bride_name`.
-   `groom_name`.
-   `wedding_date`.
-   `wedding_time`.
-   `venue_name`.
-   `venue_address`.
-   `total_budget`.
-   `created_at`.
-   `updated_at`.

### wedding_members

-   `id`.
-   `wedding_id`.
-   `user_id`.
-   `family_side` --- groom or bride.
-   `role` --- owner, admin, or member.
-   Membership status.
-   `created_at`.

Add unique constraints to prevent duplicate memberships.

### wedding_invitations

-   `id`.
-   `wedding_id`.
-   `invited_email`.
-   `role_to_assign`.
-   Secure token hash or equivalent secure invitation identifier.
-   Expiration timestamp.
-   `accepted_at`.
-   `invited_by`.
-   `created_at`.

Invitation tokens must be generated and validated through a secure
workflow. Do not store reusable raw secrets unnecessarily.

### expenses

-   `id`.
-   `wedding_id`.
-   `title`.
-   `amount`.
-   `category`.
-   `expense_date`.
-   `payment_status`.
-   `family_side`.
-   `notes`.
-   `created_by`.
-   `created_at`.
-   `updated_at`.

### messages

-   `id`.
-   `wedding_id`.
-   `sender_id`.
-   `message_text`.
-   `created_at`.
-   `updated_at`, if message editing is supported.

### wedding_public_invitations

-   `id`.
-   `wedding_id`.
-   Unique slug.
-   Publication status.
-   Published fields or controlled access to relevant wedding fields.
-   `created_at`.
-   `updated_at`.

Public access must not expose the private wedding record. Use a
carefully designed public view or a trusted database function that
returns only approved invitation fields.

### notifications

-   `id`.
-   `wedding_id`.
-   `recipient_id`.
-   `notification_type`.
-   `title`.
-   `message`.
-   `target_path` or validated target identifier.
-   `read_at`.
-   `created_at`.

### activity_logs

-   `id`.
-   `wedding_id`.
-   `actor_id`.
-   `action_type`.
-   `entity_type`.
-   `entity_id`.
-   Safe metadata.
-   `created_at`.

Ensure activity history is written through trusted operations and cannot
be freely altered by ordinary clients.

### expense_categories

Optional workspace-specific categories if custom category management is
implemented.

Add appropriate foreign keys, indexes, constraints, timestamps, and
delete behavior. Avoid cascading deletions that accidentally destroy
important records.

## 16. Security Requirements

Security is mandatory.

-   Enable RLS on every table accessible through the Supabase client.
-   Write and test policies for every role.
-   Verify workspace membership on reads and writes.
-   Prevent privilege escalation.
-   Validate ownership and admin permissions server-side.
-   Restrict public access to explicitly published invitation data.
-   Protect chat history and expense records.
-   Never expose secret keys in the frontend.
-   Validate and sanitize inputs.
-   Use safe database queries and avoid unsafe HTML rendering.
-   Apply reasonable message and request size limits.
-   Use confirmation steps for destructive actions.
-   Avoid logging passwords, authentication tokens, or sensitive
    invitation secrets.
-   Configure deployment environment variables correctly.

Create and test policies for both allowed and denied access. A working
login screen alone does not satisfy these requirements.

## 17. Non-Functional Requirements

### Performance

-   Use efficient queries and appropriate indexes.
-   Avoid unnecessary full-page reloads.
-   Paginate large tables and chat history.
-   Avoid loading every workspace record at once.
-   Use lightweight animations.

### Reliability

-   Show useful errors when requests fail.
-   Do not display a successful save until the operation succeeds.
-   Prevent duplicate submissions.
-   Keep derived totals consistent with database records.
-   Handle network interruptions gracefully.

### Accessibility

-   Use semantic HTML.
-   Provide labels for inputs.
-   Ensure keyboard navigation.
-   Maintain readable contrast.
-   Provide visible focus indicators.

### Compatibility

-   Current desktop browsers.
-   Mobile browsers.
-   Tablet-sized screens.
-   Responsive layouts across common viewport widths.

## 18. Future Features --- Not Required for Initial Delivery

Keep the architecture extensible for: - Guest list and RSVP
management. - Vendor management. - Payment schedules and instalments. -
Receipt and bill uploads. - Wedding task checklists. - Multiple wedding
ceremonies and events. - Seating plans. - QR-code invitations. -
Invitation photo galleries and advanced design tools. - Hindi and Urdu
language support. - AI wedding assistant. - Email, WhatsApp, and push
notifications. - Installable PWA and offline support.

Do not build these advanced modules before the four main features work
reliably.

## 19. Implementation Plan

### Phase 1 --- Foundation

-   Set up React, Vite, Tailwind, routing, and Supabase.
-   Create the design system and four themes.
-   Implement authentication.
-   Implement workspace creation.
-   Create database migrations and initial RLS policies.

### Phase 2 --- Expense Tracker

-   Build expense CRUD.
-   Implement budget calculations.
-   Add filtering, search, and validation.
-   Connect dashboard financial cards to real data.

### Phase 3 --- Family Conversations

-   Build the chat interface.
-   Save and load messages.
-   Add Supabase Realtime.
-   Enforce member-only access.

### Phase 4 --- Digital Invitations

-   Build the invitation editor.
-   Add live preview.
-   Create secure public invitation rendering.
-   Implement publication controls and sharing.

### Phase 5 --- Admin Panel

-   Implement member invitations.
-   Add role and permission management.
-   Add administrative expense and invitation controls.
-   Add permitted moderation and activity history.

### Phase 6 --- Supporting Features

-   Complete settings.
-   Add reports and CSV export.
-   Add in-app notifications.
-   Complete responsive behavior and loading/error states.

### Phase 7 --- Testing and Deployment

-   Test all CRUD operations.
-   Test role permissions and RLS.
-   Test workspace isolation.
-   Test public invitation access.
-   Test real-time chat.
-   Test mobile layouts.
-   Deploy to Vercel or Netlify.
-   Configure environment variables and production Supabase settings.

## 20. Acceptance Criteria

The application is ready for its initial release only when:

1.  Users can sign up, log in, log out, and recover their accounts.
2.  A user can create a wedding workspace and save its details.
3.  Authorized members can add, edit, view, and delete expenses.
4.  Budget totals and payment summaries calculate correctly.
5.  Expense search, filters, and reports use actual database data.
6.  Authorized members can communicate through persistent real-time
    chat.
7.  Users from one wedding cannot read another wedding's private
    records.
8.  Owners can create, preview, publish, unpublish, and share
    invitations.
9.  Public guests can view only the intended published invitation
    information.
10. Authorized administrators can manage permitted workspace settings
    and members.
11. Role restrictions are enforced by database policies and trusted
    server-side operations.
12. All four themes work consistently and the selection persists.
13. Dashboard, reports, settings, and navigation are responsive.
14. Loading, empty, validation, success, and error states are
    implemented.
15. Important administrative changes are recorded in the activity
    history.
16. The project can be installed and run using documented setup
    instructions.
17. No essential core feature depends on hardcoded sample data.
18. Production secrets are not committed to the repository.

## 21. Instructions for Antigravity

Treat this PRD as the source of truth.

-   Build a functional full-stack application, not just a mockup.
-   Use React + Vite + Tailwind CSS and Supabase.
-   Use Gold Noir as the initial theme.
-   Include Emerald Velvet, Sapphire Lounge, and Champagne Pearl as
    selectable themes.
-   Prioritize the four main features in the specified order.
-   Implement real database operations and authentication.
-   Create migrations and secure RLS policies.
-   Do not fake successful saves, messages, invitations, or member
    invitations.
-   Do not leave essential buttons disconnected.
-   Do not use placeholder charts when real data is available.
-   Keep components reusable and the code organized.
-   Use sensible defaults without repeatedly asking for minor design
    decisions.
-   If a required external service needs credentials, provide clear
    environment-variable instructions and a graceful setup state.
-   Run the application, resolve build errors, and test the core
    workflows before declaring completion.
-   Document setup, migrations, environment variables, and deployment in
    `README.md`.
-   If the full scope is too large for one pass, implement the
    foundation and core features incrementally while preserving the
    architecture described here.

**Final product objective:** Make My Marriage should feel like a premium
wedding-management SaaS product, with dependable expense tracking,
real-time family collaboration, shareable digital invitations, and a
secure admin panel.
