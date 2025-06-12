# 🚀 Bravetto ClickUp Integration Guide

## Overview

This guide documents the complete ClickUp CRM integration for the Bravetto recruitment platform. The integration automatically creates tasks in ClickUp when candidates submit their quest applications.

## 🔄 Integration Flow

graph TB
    subgraph "User Flow"
        A["👤 Candidate fills form"] --> B["🚀 Clicks Submit"]
    end
    
    subgraph "Frontend"
        B --> C["📱 Modal validates data"]
        C --> D["📤 POST to /api/submit-quest"]
    end
    
    subgraph "Backend API"
        D --> E["✅ Validate required fields"]
        E --> F["🔐 Check ClickUp config"]
        F --> G["📝 Create task in ClickUp"]
        G --> H["🔔 Send webhook notification<br/>(optional)"]
    end
    
    subgraph "ClickUp"
        G --> I["📋 New task created<br/>with all custom fields"]
        I --> J["🏷️ Tagged as 'quest-application'"]
    end
    
    subgraph "Response"
        H --> K["✅ Return success to user"]
        K --> L["🎉 Show success modal"]
    end

## 📋 Implementation Details

### API Route: `/api/submit-quest`

The API route handles:
1. **Data Validation** - Ensures required fields are present
2. **ClickUp Task Creation** - Creates a comprehensive task with all candidate information
3. **Error Handling** - Gracefully handles API failures without disrupting user experience
4. **Webhook Notifications** - Optional notifications for real-time alerts

### ClickUp Task Structure

Each submission creates a task with:
- **Task Name**: `[FirstName] [LastName] - Quest Application`
- **Description**: Comprehensive markdown-formatted candidate profile
- **Status**: `open` (customizable)
- **Priority**: Normal (2)
- **Tags**: `quest-application`, `candidate`
- **Custom Fields**: Mapped to specific ClickUp field IDs

## 🔧 Environment Variables

Add these to your `.env.local` for development:

```env
# ClickUp Configuration
CLICKUP_API_KEY=pk_81414126_JH0AO0X769UOJSIA0DOANJ37529UYU0Z
CLICKUP_LIST_ID=901110917543
CLICKUP_WORKSPACE_ID=9011549512

# Custom Field IDs
CLICKUP_FIELD_ID_FIRST_NAME=00000000-0000-0000-0000-000000000001
CLICKUP_FIELD_ID_LAST_NAME=70aef73b-2f4d-4b96-94cd-f2ad97c1dcff
CLICKUP_FIELD_ID_EMAIL=a9c7b391-3cb4-4fd1-af4d-fcbb79599d46
CLICKUP_FIELD_ID_PHONE=5e5cb139-182f-4432-8f78-6ba78c0db063
CLICKUP_FIELD_ID_GITHUB=b06a8e8d-6a95-4e41-99fd-645426f5f96b
CLICKUP_FIELD_ID_PORTFOLIO=2853c5f1-fd75-43e0-8518-68e630660f88

# Rating Fields
CLICKUP_FIELD_ID_RATING_REACT=2016547b-40be-4cc2-b608-26c95f49a76e
CLICKUP_FIELD_ID_RATING_DB=be511a15-b26a-44d6-a152-3fdc386507a9
CLICKUP_FIELD_ID_RATING_AI=9fc093f3-119d-49df-b54e-e54ef115e528
CLICKUP_FIELD_ID_RATING_EDGE=2479d370-1dd8-400e-a0ba-6b2fcccd74c5

# Other Fields
CLICKUP_FIELD_ID_AVAILABILITY=0c4eff4f-05b9-4618-a818-3aaa586f0f1c
CLICKUP_FIELD_ID_AGENT=29ad1609-34c5-4d8a-b5f8-c14b580dfb79
CLICKUP_FIELD_ID_DEV_ENV=9f2a1a3c-0b5c-4c16-864e-f0454f00db77
CLICKUP_FIELD_ID_SUPERPOWER=40c6baae-2cc4-4cc1-aff7-d0b4ec3af0be

# Optional Webhook
NOTIFICATION_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## 🚀 Production Deployment

### Vercel Deployment

1. Go to your Vercel dashboard
2. Navigate to Project Settings > Environment Variables
3. Add all the environment variables from `.env.local`
4. Redeploy your application

### Other Platforms

For Netlify, Heroku, or other platforms, add environment variables through their respective dashboards.

## 📊 Data Mapping

| Form Field | ClickUp Field | Type |
|------------|---------------|------|
| firstName | CLICKUP_FIELD_ID_FIRST_NAME | Text |
| lastName | CLICKUP_FIELD_ID_LAST_NAME | Text |
| email | CLICKUP_FIELD_ID_EMAIL | Email |
| portfolio | CLICKUP_FIELD_ID_PORTFOLIO | URL |
| frontendRating | CLICKUP_FIELD_ID_RATING_REACT | Number |
| backendRating | CLICKUP_FIELD_ID_RATING_DB | Number |
| scalabilityRating | CLICKUP_FIELD_ID_RATING_AI | Number |
| devOpsRating | CLICKUP_FIELD_ID_RATING_EDGE | Number |
| innovationExample | CLICKUP_FIELD_ID_SUPERPOWER | Text |

## 🛡️ Security Considerations

1. **API Key Protection**: Never expose ClickUp API key in client-side code
2. **Rate Limiting**: ClickUp API limits vary by plan (100-10,000 requests/minute)
3. **Error Handling**: Application continues even if ClickUp fails
4. **Data Validation**: All inputs validated before sending to ClickUp

## 🧪 Testing

### Local Testing
```bash
# Test the API endpoint
curl -X POST http://localhost:3002/api/submit-quest \
  -H "Content-Type: application/json" \
  -d '{
    "basicInfo": {
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com",
      "location": "Remote",
      "portfolio": "https://portfolio.com",
      "linkedin": "https://linkedin.com/in/test"
    },
    "experience": {
      "totalYears": "5+ years",
      "currentRole": "Senior Developer",
      "techStack": ["React", "Node.js"],
      "achievements": "Built scalable systems"
    },
    "technicalSkills": {
      "frontendRating": 5,
      "backendRating": 4,
      "mobileRating": 3,
      "devOpsRating": 4,
      "specializations": ["React", "TypeScript"]
    },
    "problemSolving": {
      "challengeDescription": "Complex system design",
      "approach": "Systematic analysis",
      "outcome": "Successful implementation",
      "learnings": "Importance of planning"
    },
    "systemDesign": {
      "scalabilityRating": 5,
      "architectureExperience": "Microservices",
      "performanceOptimization": "Caching strategies",
      "securityPractices": "OAuth, encryption"
    },
    "innovation": {
      "innovationExample": "AI-powered tool",
      "emergingTech": ["AI", "Blockchain"],
      "continuousLearning": "Daily practice",
      "openSourceContributions": "Multiple projects"
    },
    "culture": {
      "workStyle": "Collaborative",
      "collaboration": "Team player",
      "mentorship": "Active mentor",
      "values": ["Innovation", "Quality"]
    }
  }'
```

### Verify in ClickUp
1. Check your ClickUp list for the new task
2. Verify all custom fields are populated
3. Check task description formatting

## 🔄 Next Steps

### Enhancements for V2
1. **Automated Status Updates**: Update task status based on recruitment progress
2. **Two-way Sync**: Pull ClickUp updates back into the application
3. **Advanced Analytics**: Track conversion rates and candidate metrics
4. **Email Notifications**: Send automated emails to candidates
5. **Multiple List Support**: Route applications to different lists based on role

### Additional Integrations
- Slack notifications for new applications
- Calendar integration for interview scheduling
- Email automation for candidate communication
- Analytics dashboard for recruitment metrics

## 📞 Support

For issues or questions:
1. Check ClickUp API status: https://status.clickup.com/
2. Review API documentation: https://clickup.com/api
3. Contact Bravetto tech team

---

*Last updated: January 2025* 