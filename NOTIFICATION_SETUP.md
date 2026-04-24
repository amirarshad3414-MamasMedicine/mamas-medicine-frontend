# Email Notification Implementation Guide

Based on the PDF requirements, I've created a complete email notification system for tracking purchases, onboarding completions, and errors. All notifications are sent to `hi@soul-sighted.com`.

## 📋 Overview

Three notification endpoints have been created:

### 1. **Purchase Notification** (CRITICAL)
- **Endpoint**: `POST /api/notifications/purchase`
- **When**: Triggered when a purchase is completed (including coupon/free orders)
- **Email Format**:
  - Subject: `PD – NEW PURCHASE – [Parent Name] – [Child Name] – [$ Amount or Coupon]`
  - Contains: Customer name, email, product, child name, order ID, payment type

### 2. **Onboarding Notification**
- **Endpoint**: `POST /api/notifications/onboarding`
- **When**: Triggered when onboarding form is completed
- **Email Format**:
  - Subject: `PD – ONBOARDING COMPLETE – [Parent Name] – [Child Name]`
  - Contains: Parent details (name, DOB, time, place), child details, additional context, tone preferences

### 3. **Issue Flag Notification** (IMPORTANT)
- **Endpoint**: `POST /api/notifications/issue-flag`
- **When**: Triggered on errors/failures at any stage
- **Email Format**:
  - Subject: `PD – ISSUE FLAG – [Parent Name if available] – [Child Name if available]`
  - Contains: Stage failed, customer email, relevant data, error message

## 📁 Files Created

```
app/
├── api/
│   └── notifications/
│       ├── sendAdminEmail.js           # Helper for sending emails
│       ├── purchase/route.js            # Purchase notification endpoint
│       ├── onboarding/route.js          # Onboarding notification endpoint
│       └── issue-flag/route.js          # Issue flag notification endpoint
└── lib/
    └── notifications.js                 # Client-side helper functions
```

## 🔧 Integration Points

### From Purchase Flow

In `app/purchase/page.jsx`, after successful Stripe checkout:

```javascript
import { notifyPurchase } from "@/app/lib/notifications";

// After successful payment (in the Stripe callback)
await notifyPurchase({
  parentName: "John Doe",
  childName: "Jane Doe",
  customerEmail: "john@example.com",
  productName: "Parenting Dynamic",
  amount: 49.99, // or "coupon"/"free"
  orderId: "stripe_order_id",
  customerId: "stripe_customer_id",
  paymentType: "paid", // or "coupon"
});
```

### From Onboarding Flow

In `app/onboardingMain/page.jsx`, after successful form submission:

```javascript
import { notifyOnboarding } from "@/app/lib/notifications";

// After successful onboarding submission
await notifyOnboarding({
  parentName: "John Doe",
  childName: "Jane Doe",
  parentEmail: "john@example.com",
  parentDob: "1985-03-15",
  parentTimeOfBirth: "14:30",
  parentPlaceOfBirth: "New York, USA",
  childDob: "2015-07-22",
  childTimeOfBirth: "09:45",
  childPlaceOfBirth: "Los Angeles, USA",
  additionalContext: "Any notes or context...",
  tonePreferences: "Supportive and gentle",
  otherPreferences: {
    journeyType: "parenting_dynamic",
    preferences: ["supportive", "practical"],
  },
});
```

### Error Handling

Wrap operations in try-catch and trigger issue flag:

```javascript
import { notifyIssueFlag } from "@/app/lib/notifications";

try {
  // Purchase or onboarding logic
  await submitOnboarding(data);
} catch (error) {
  await notifyIssueFlag({
    stage: "onboarding", // or "purchase", "generation"
    parentName: data?.parentName,
    childName: data?.childName,
    customerEmail: data?.email,
    errorMessage: error.message,
    relevantData: {
      formData: data,
      endpoint: "submit_onboarding",
    },
    stackTrace: error.stack,
  });
  throw error;
}
```

## 🔐 Environment Variables

Ensure these are set in your `.env.local` or `.env`:

```
MAIL_USER=your-gmail@gmail.com
MAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=hi@soul-sighted.com
```

⚠️ **Note**: Use a Gmail app-specific password, not your regular Gmail password.

## 📊 Email Format Details

### Purchase Email Structure
- **Header**: "New Purchase Notification"
- **Sections**:
  - Customer Details (name, email, ID)
  - Child Information (if available)
  - Purchase Details (product, amount, payment type, order ID)
- **Footer**: Timestamp

### Onboarding Email Structure
- **Header**: "Onboarding Submission Complete"
- **Sections**:
  - Parent Details (name, email, DOB, time, place)
  - Child Details (name, DOB, time, place)
  - Additional Context (if provided)
  - Tone & Preferences (if provided)
  - Other Preferences (if provided)
- **Footer**: Timestamp

### Issue Flag Email Structure
- **Header**: "⚠️ Issue Flag Alert" (in red)
- **Sections**:
  - Issue Details (stage, customer email, names)
  - Error Message (in warning box)
  - Relevant Data (JSON formatted)
  - Stack Trace (if provided)
- **Footer**: Timestamp

## ✅ Testing

To test the endpoints locally:

```bash
# Purchase notification
curl -X POST http://localhost:3000/api/notifications/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "parentName": "Test Parent",
    "childName": "Test Child",
    "customerEmail": "test@example.com",
    "productName": "Parenting Dynamic",
    "amount": 49.99,
    "orderId": "test_order_123",
    "customerId": "test_customer_123",
    "paymentType": "paid"
  }'

# Onboarding notification
curl -X POST http://localhost:3000/api/notifications/onboarding \
  -H "Content-Type: application/json" \
  -d '{
    "parentName": "Test Parent",
    "childName": "Test Child",
    "parentEmail": "test@example.com",
    "parentDob": "1985-03-15",
    "parentTimeOfBirth": "14:30",
    "parentPlaceOfBirth": "New York"
  }'

# Issue flag notification
curl -X POST http://localhost:3000/api/notifications/issue-flag \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "onboarding",
    "parentName": "Test Parent",
    "childName": "Test Child",
    "customerEmail": "test@example.com",
    "errorMessage": "Form validation failed",
    "relevantData": {"field": "childDob", "issue": "Missing value"}
  }'
```

## 🎯 Next Steps

1. **Update Purchase Flow**: Add `notifyPurchase()` call after successful Stripe payment
2. **Update Onboarding Flow**: Add `notifyOnboarding()` call when form is submitted
3. **Add Error Handlers**: Wrap key operations with try-catch + `notifyIssueFlag()`
4. **Test Integration**: Verify emails are being received at `hi@soul-sighted.com`
5. **Monitor**: Check email logs regularly for errors and failures

## 📝 Notes

- All notifications go to the single `hi@soul-sighted.com` address for searchable records
- Each email includes a timestamp for tracking and correlation
- Issue flags have priority styling (red/warning colors) to stand out
- All HTML emails are responsive and readable on mobile
- Retry logic: Each email attempt retries up to 3 times on failure
