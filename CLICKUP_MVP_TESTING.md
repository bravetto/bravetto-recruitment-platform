# 🧪 ClickUp Integration MVP Testing Guide

## Quick Start Testing

### 1. Test the Integration Locally

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Open the application**: http://localhost:3002

3. **Test the Full-Stack Developer flow**:
   - Click on "SENIOR FULL-STACK DEVELOPER" card
   - Click "Submit Dusty Resume" to test email flow
   - OR click "Start Your Quest" to test the modal flow

4. **Fill out the quest modal** with test data and submit

### 2. Verify in ClickUp

1. **Login to ClickUp**: https://app.clickup.com
2. **Navigate to your list** (ID: 901110917543)
3. **Look for the new task** named "[Test Name] - Quest Application"
4. **Verify**:
   - Task description contains all candidate information
   - Custom fields are populated
   - Tags are applied: `quest-application`, `candidate`

### 3. Quick API Test

Test the API directly using curl:

```bash
curl -X POST http://localhost:3002/api/submit-quest \
  -H "Content-Type: application/json" \
  -d '{
    "basicInfo": {
      "firstName": "MVP",
      "lastName": "Test",
      "email": "mvp@test.com",
      "location": "Remote",
      "portfolio": "https://mvptest.com",
      "linkedin": "https://linkedin.com/in/mvptest"
    },
    "experience": {
      "totalYears": "3-5 years",
      "currentRole": "Developer",
      "techStack": ["React", "Node.js"],
      "achievements": "MVP Testing"
    },
    "technicalSkills": {
      "frontendRating": 4,
      "backendRating": 3,
      "mobileRating": 2,
      "devOpsRating": 3,
      "specializations": ["Testing"]
    },
    "problemSolving": {
      "challengeDescription": "Testing challenge",
      "approach": "Systematic testing",
      "outcome": "Success",
      "learnings": "Learned a lot"
    },
    "systemDesign": {
      "scalabilityRating": 3,
      "architectureExperience": "Basic",
      "performanceOptimization": "Some",
      "securityPractices": "Standard"
    },
    "innovation": {
      "innovationExample": "Test innovation",
      "emergingTech": ["AI"],
      "continuousLearning": "Always",
      "openSourceContributions": "Some"
    },
    "culture": {
      "workStyle": "Remote",
      "collaboration": "Good",
      "mentorship": "Yes",
      "values": ["Quality", "Speed"]
    }
  }'
```

## 🔍 What to Check

### ✅ Success Indicators:
- Modal shows success message
- Response includes taskId
- Task appears in ClickUp within seconds
- All data is properly formatted

### ❌ Common Issues:

1. **"Server configuration error"**
   - Check your .env.local file has all variables
   - Restart your dev server after adding env vars

2. **Task not appearing in ClickUp**
   - Verify API key is correct
   - Check list ID matches your ClickUp workspace
   - Look in ClickUp's "All" view (not just active tasks)

3. **Custom fields not populated**
   - Some field IDs might not match your ClickUp setup
   - Check console logs for field mapping errors

## 🚀 MVP Success Criteria

Your MVP is working if:
1. ✅ Form submissions create tasks in ClickUp
2. ✅ Basic candidate info is captured (name, email)
3. ✅ Users see success confirmation
4. ✅ No errors block the user experience

## 📈 Next Steps After MVP

Once basic integration is working:
1. Map additional custom fields
2. Add Slack notifications
3. Implement automated email responses
4. Create recruitment dashboard
5. Add interview scheduling

---

**Remember**: This is an MVP! Focus on getting the basic flow working first, then iterate and improve. 