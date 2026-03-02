# Testing Guide

## 🧪 Complete Testing Checklist

### Pre-Testing Setup

- [ ] MongoDB is running (local or Atlas)
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Dependencies installed (npm install)
- [ ] Both servers running (backend on 5000, frontend on 5173)

## 1️⃣ Basic Functionality Tests

### Home Page
- [ ] Page loads without errors
- [ ] Language selector shows all options
- [ ] Form validation works (empty fields)
- [ ] Date picker functions correctly
- [ ] Submit button is clickable

### Report Generation
- [ ] Enter name: "John Smith"
- [ ] Select DOB: 1990-01-15
- [ ] Language: English
- [ ] Click "Generate My Report"
- [ ] Loading spinner appears
- [ ] Redirects to report page
- [ ] Report displays correctly

### Report Display
- [ ] All numbers calculated correctly
- [ ] Life Path Number shows with interpretation
- [ ] Birthday Number displays
- [ ] Expression Number with calculation steps
- [ ] Soul Urge Number with steps
- [ ] Personality Number with steps
- [ ] Maturity Number shows
- [ ] Personal Year Number displays
- [ ] Lucky dates section appears
- [ ] Share button works (copies link)
- [ ] Download PDF button works

## 2️⃣ Calculation Accuracy Tests

### Test Case 1: Simple Name
```
Name: "ABC"
Expected Expression: A=1, B=2, C=3 → 1+2+3=6
Result: Expression Number = 6
```

### Test Case 2: Master Number
```
Name: "ABCDEFGHIJK"
A=1,B=2,C=3,D=4,E=5,F=6,G=7,H=8,I=9,J=1,K=2
Sum: 48 → 4+8=12 → 1+2=3
But if sum is 11, 22, or 33, don't reduce
```

### Test Case 3: Life Path
```
DOB: 1990-05-15
Day: 15 → 1+5=6
Month: 05 → 5
Year: 1990 → 1+9+9+0=19 → 1+9=10 → 1+0=1
Total: 6+5+1=12 → 1+2=3
Life Path: 3
```

### Test Case 4: Karmic Debt
```
If intermediate sum is 13, 14, 16, or 19
Should be detected and displayed
```

## 3️⃣ Multi-Language Tests

### English (en)
- [ ] Generate report in English
- [ ] All interpretations in English
- [ ] Professional tone maintained

### Hindi (hi)
- [ ] Generate report in Hindi
- [ ] Devanagari script displays correctly
- [ ] All sections translated

### Hinglish (hinglish)
- [ ] Generate report in Hinglish
- [ ] Roman script used
- [ ] Natural Hindi-English mix
- [ ] Example: "Aap ek natural leader hain"

### Spanish (es)
- [ ] Generate report in Spanish
- [ ] Accents display correctly (á, é, í, ó, ú, ñ)

### French (fr)
- [ ] Generate report in French
- [ ] Accents display correctly (é, è, ê, à, ç)

### Arabic (ar)
- [ ] Generate report in Arabic
- [ ] Right-to-left text displays correctly
- [ ] Arabic numerals or Western numerals

## 4️⃣ Authentication Tests

### Registration
- [ ] Navigate to /register
- [ ] Enter full name
- [ ] Enter valid email
- [ ] Enter password (min 6 chars)
- [ ] Click Sign Up
- [ ] Redirects to dashboard
- [ ] Token stored in localStorage

### Login
- [ ] Navigate to /login
- [ ] Enter registered email
- [ ] Enter correct password
- [ ] Click Login
- [ ] Redirects to dashboard
- [ ] User info displayed

### Logout
- [ ] Click Logout button
- [ ] Redirects to home
- [ ] Token removed from localStorage
- [ ] Protected routes inaccessible

## 5️⃣ Dashboard Tests

### User Dashboard
- [ ] Login as regular user
- [ ] Navigate to /dashboard
- [ ] Welcome message shows user name
- [ ] Generate a report (should save to user)
- [ ] Report appears in dashboard list
- [ ] Click "View Report" opens report
- [ ] Generate multiple reports
- [ ] All reports listed

## 6️⃣ Admin Tests

### Admin Access
- [ ] Create user account
- [ ] Manually set isAdmin: true in MongoDB
- [ ] Login as admin
- [ ] "Admin" link appears in header
- [ ] Navigate to /admin

### Admin Dashboard
- [ ] Language selector shows all languages
- [ ] Click language (e.g., English)
- [ ] JSON loads in textarea
- [ ] Edit JSON (change a word)
- [ ] Click "Save Changes"
- [ ] Success message appears
- [ ] Generate new report
- [ ] Verify change appears in report

## 7️⃣ Share & PDF Tests

### Share Functionality
- [ ] Generate a report
- [ ] Click "Share" button
- [ ] Alert shows "Link copied"
- [ ] Open new incognito window
- [ ] Paste link
- [ ] Report loads without login
- [ ] All data displays correctly

### PDF Download
- [ ] Generate a report
- [ ] Click "Download PDF"
- [ ] PDF downloads
- [ ] Open PDF
- [ ] All sections included
- [ ] Formatting is readable
- [ ] Name and DOB correct
- [ ] All numbers present

## 8️⃣ Edge Cases & Error Handling

### Invalid Inputs
- [ ] Empty name → Error message
- [ ] No date selected → Error message
- [ ] Future date → Should work
- [ ] Very old date (1900) → Should work
- [ ] Special characters in name → Should work
- [ ] Numbers in name → Should be filtered

### Network Errors
- [ ] Stop backend server
- [ ] Try to generate report
- [ ] Error message displays
- [ ] Restart backend
- [ ] Try again → Works

### Invalid Share Links
- [ ] Navigate to /report/invalid123
- [ ] "Report not found" message
- [ ] No crash or blank page

### Database Errors
- [ ] Stop MongoDB
- [ ] Try to generate report
- [ ] Backend handles gracefully
- [ ] Error logged in console

## 9️⃣ Responsive Design Tests

### Desktop (1920x1080)
- [ ] Layout looks good
- [ ] Cards properly sized
- [ ] No horizontal scroll
- [ ] All buttons accessible

### Tablet (768x1024)
- [ ] Layout adjusts
- [ ] Grid becomes single column
- [ ] Navigation works
- [ ] Forms usable

### Mobile (375x667)
- [ ] Mobile-first design works
- [ ] Text readable
- [ ] Buttons large enough
- [ ] No content cut off
- [ ] Scrolling smooth

## 🔟 Performance Tests

### Load Time
- [ ] Home page loads < 2 seconds
- [ ] Report generation < 3 seconds
- [ ] PDF generation < 2 seconds
- [ ] Dashboard loads < 2 seconds

### Multiple Users
- [ ] Generate 10 reports quickly
- [ ] No slowdown
- [ ] All reports saved
- [ ] Database handles load

## 1️⃣1️⃣ Browser Compatibility

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] PDF downloads

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] PDF downloads

### Safari
- [ ] All features work
- [ ] Date picker works
- [ ] PDF downloads

### Edge
- [ ] All features work
- [ ] No console errors
- [ ] PDF downloads

## 1️⃣2️⃣ Security Tests

### Authentication
- [ ] Cannot access /dashboard without login
- [ ] Cannot access /admin without admin role
- [ ] Token expires after 7 days
- [ ] Password is hashed in database

### Input Validation
- [ ] SQL injection attempts blocked
- [ ] XSS attempts sanitized
- [ ] CSRF protection (if implemented)

### API Security
- [ ] Protected routes require token
- [ ] Invalid tokens rejected
- [ ] Rate limiting (if implemented)

## 📊 Test Results Template

```
Test Date: ___________
Tester: ___________
Environment: Local / Staging / Production

✅ Passed: ___/100
❌ Failed: ___/100
⚠️  Warnings: ___

Critical Issues:
1. 
2. 

Minor Issues:
1.
2.

Notes:


```

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution**: Check MongoDB is running, verify connection string

### Issue: Port Already in Use
**Solution**: Change port in .env or kill process using port

### Issue: Module Not Found
**Solution**: Run npm install in both backend and frontend

### Issue: CORS Error
**Solution**: Check FRONTEND_URL in backend .env matches frontend URL

### Issue: PDF Not Downloading
**Solution**: Check browser popup blocker, try different browser

### Issue: Language Not Loading
**Solution**: Verify language file exists in backend/languages/

### Issue: Calculations Wrong
**Solution**: Check numerology.js logic, verify Pythagorean chart

## ✅ Final Checklist

Before marking complete:
- [ ] All core features tested
- [ ] All languages tested
- [ ] Authentication works
- [ ] Admin panel works
- [ ] Share links work
- [ ] PDF downloads work
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Database saves correctly
- [ ] Ready for deployment

## 🎯 Acceptance Criteria

The application is ready for production when:
1. ✅ All calculations are accurate
2. ✅ All 6 languages work correctly
3. ✅ Authentication is secure
4. ✅ Reports can be shared
5. ✅ PDFs generate correctly
6. ✅ Mobile responsive
7. ✅ No critical bugs
8. ✅ Performance is acceptable
9. ✅ Admin panel functional
10. ✅ Documentation complete

---

**Happy Testing! 🧪✨**
