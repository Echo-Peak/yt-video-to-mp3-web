# Privacy Policy for **Youtube to Mp3 converter**

**Effective date:** October 4, 2025  
**Developer:** echopeakdev

## 1) Overview

This policy explains what limited information is handled by the **Youtube to Mp3
converter** utility website and how it’s used. The service is designed to
function without collecting personal data.

## 2) Sign-In & Identity

- The site offers **Google Federation (OAuth)** strictly to verify that a user
  is real and to gate access.
- **No profile data (e.g., name, email, photo) is collected, stored, or used**
  by the site during authentication.

## 3) What We Store (Transient “Access Code” Only)

- After you sign in with Google, the OAuth flow produces an **access code**.
- The site writes **only this access code** to **AWS DynamoDB** to associate
  your active session with a user record.
- This access code is **transient**:
  - It is valid **only for the duration of your current logged-in session**
    while using the site.
  - When you sign out—or your session ends—the access code becomes invalid and
    the prior DB entry is no longer usable.
  - If you sign in again, a **new access code** is generated and a **new
    short-lived DB entry** is created.
- No other identifiers or personal information are stored alongside this access
  code.

## 4) Cookies & Local Storage

- The site may use strictly **necessary cookies or session storage** to keep you
  signed in and operate core functionality.
- No tracking, advertising, or analytics cookies are used.

## 5) How We Use Information

- The transient access code is used **only** to:
  - Verify an active session; and
  - Authorize access to site functionality during that session.
- **We do not sell, rent, or share** any information with third parties for
  marketing or profiling.

## 6) Data Retention

- The access code in DynamoDB is **short-lived** and becomes unusable when the
  session ends.
- Old entries are periodically cleaned up according to operational needs.
  Because the access code is not reusable, it does not provide continuing access
  once your session is over.

## 7) Service Providers

- The site runs on **Amazon Web Services (AWS)** infrastructure and uses **AWS
  DynamoDB** to hold the transient access code.
- **Google** acts as the identity provider for sign-in. Authentication is
  handled by Google; the site does not collect your Google profile data.

## 8) Security

- Reasonable administrative, technical, and physical safeguards are used to
  protect the service and the transient access codes in DynamoDB.
- No system can be guaranteed 100% secure, but we work to limit scope and
  retention to reduce risk.

## 9) Children’s Privacy

- The site is intended for general audiences and is **not directed to children
  under 13** (or the age defined by local law). We do not knowingly collect
  personal data from children.

## 10) Your Choices

- You can end your session at any time by signing out or closing the session,
  which renders the access code unusable.
- Re-signing in generates a new code and a new short-lived entry.

## 11) Changes to This Policy

- We may update this policy to reflect changes in functionality or legal
  requirements. Material changes will be posted here with an updated effective
  date.

---
