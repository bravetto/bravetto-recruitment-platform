import { NextRequest, NextResponse } from 'next/server';

// Type definition matching the modal's FormData
interface QuestFormData {
  basicInfo: {
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    portfolio: string;
    linkedin: string;
  };
  experience: {
    totalYears: string;
    currentRole: string;
    techStack: string[];
    achievements: string;
  };
  technicalSkills: {
    frontendRating: number;
    backendRating: number;
    mobileRating: number;
    devOpsRating: number;
    specializations: string[];
  };
  problemSolving: {
    challengeDescription: string;
    approach: string;
    outcome: string;
    learnings: string;
  };
  systemDesign: {
    scalabilityRating: number;
    architectureExperience: string;
    performanceOptimization: string;
    securityPractices: string;
  };
  innovation: {
    innovationExample: string;
    emergingTech: string[];
    continuousLearning: string;
    openSourceContributions: string;
  };
  culture: {
    workStyle: string;
    collaboration: string;
    mentorship: string;
    values: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const data: QuestFormData = await request.json();
    console.log('Received quest data:', JSON.stringify(data, null, 2));
    
    // Validate required fields - data is already the parsed body
    if (!data.basicInfo?.firstName || !data.basicInfo?.lastName || !data.basicInfo?.email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Get ClickUp configuration from environment variables
    const clickUpApiKey = process.env.CLICKUP_API_KEY;
    const clickUpListId = process.env.CLICKUP_LIST_ID;

    if (!clickUpApiKey || !clickUpListId) {
      console.error('ClickUp API Key or List ID is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create the task name
    const taskName = `${data.basicInfo.firstName} ${data.basicInfo.lastName} - Quest Application`;
    
    // Build the task description with all the detailed information
    const taskDescription = `
# Candidate Application Details

## 📋 Basic Information
- **Name:** ${data.basicInfo.firstName} ${data.basicInfo.lastName}
- **Email:** ${data.basicInfo.email}
- **Location:** ${data.basicInfo.location}
- **Portfolio:** ${data.basicInfo.portfolio}
- **LinkedIn:** ${data.basicInfo.linkedin}

## 💼 Experience
- **Total Years:** ${data.experience.totalYears}
- **Current Role:** ${data.experience.currentRole}
- **Tech Stack:** ${data.experience.techStack.join(', ')}
- **Key Achievements:** ${data.experience.achievements}

## 🛠️ Technical Skills
- **Frontend Rating:** ${data.technicalSkills.frontendRating}/5
- **Backend Rating:** ${data.technicalSkills.backendRating}/5
- **Mobile Rating:** ${data.technicalSkills.mobileRating}/5
- **DevOps Rating:** ${data.technicalSkills.devOpsRating}/5
- **Specializations:** ${data.technicalSkills.specializations.join(', ')}

## 🧩 Problem Solving
- **Challenge:** ${data.problemSolving.challengeDescription}
- **Approach:** ${data.problemSolving.approach}
- **Outcome:** ${data.problemSolving.outcome}
- **Learnings:** ${data.problemSolving.learnings}

## 🏗️ System Design
- **Scalability Rating:** ${data.systemDesign.scalabilityRating}/5
- **Architecture Experience:** ${data.systemDesign.architectureExperience}
- **Performance Optimization:** ${data.systemDesign.performanceOptimization}
- **Security Practices:** ${data.systemDesign.securityPractices}

## 💡 Innovation
- **Innovation Example:** ${data.innovation.innovationExample}
- **Emerging Tech:** ${data.innovation.emergingTech.join(', ')}
- **Continuous Learning:** ${data.innovation.continuousLearning}
- **Open Source:** ${data.innovation.openSourceContributions}

## 🤝 Culture Fit
- **Work Style:** ${data.culture.workStyle}
- **Collaboration:** ${data.culture.collaboration}
- **Mentorship:** ${data.culture.mentorship}
- **Values:** ${data.culture.values.join(', ')}

---
*Application submitted on: ${new Date().toLocaleString()}*
`;

    console.log('Creating ClickUp task:', taskName);

    // Create task in ClickUp
    const clickUpResponse = await fetch(`https://api.clickup.com/api/v2/list/${clickUpListId}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': clickUpApiKey,
      },
      body: JSON.stringify({
        name: taskName,
        description: taskDescription,
        status: 'open', // You can customize this based on your ClickUp workflow
        priority: 2, // Normal priority
        tags: ['quest-application', 'candidate'],
        custom_fields: [
          // Basic Info
          {
            id: process.env.CLICKUP_FIELD_ID_FIRST_NAME,
            value: data.basicInfo.firstName
          },
          {
            id: process.env.CLICKUP_FIELD_ID_LAST_NAME,
            value: data.basicInfo.lastName
          },
          {
            id: process.env.CLICKUP_FIELD_ID_EMAIL,
            value: data.basicInfo.email
          },
          {
            id: process.env.CLICKUP_FIELD_ID_PORTFOLIO,
            value: data.basicInfo.portfolio
          },
          // Ratings (numeric fields)
          {
            id: process.env.CLICKUP_FIELD_ID_RATING_REACT,
            value: data.technicalSkills.frontendRating
          },
          {
            id: process.env.CLICKUP_FIELD_ID_RATING_DB,
            value: data.technicalSkills.backendRating
          },
          {
            id: process.env.CLICKUP_FIELD_ID_RATING_AI,
            value: data.systemDesign.scalabilityRating
          },
          {
            id: process.env.CLICKUP_FIELD_ID_RATING_EDGE,
            value: data.technicalSkills.devOpsRating
          },
          // Other fields
          {
            id: process.env.CLICKUP_FIELD_ID_SUPERPOWER,
            value: data.innovation.innovationExample
          }
        ].filter(field => field.id && field.value !== undefined && field.value !== '')
      }),
    });

    if (!clickUpResponse.ok) {
      const errorData = await clickUpResponse.json();
      console.error('ClickUp API Error:', errorData);
      
      // Still return success to user but log the error
      console.error('Failed to create ClickUp task, but application was received');
    }

    const clickUpTask = clickUpResponse.ok ? await clickUpResponse.json() : null;

    // Send notification webhook if configured
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `New Quest Application: ${data.basicInfo.firstName} ${data.basicInfo.lastName}`,
            email: data.basicInfo.email,
            taskId: clickUpTask?.id,
            taskUrl: clickUpTask?.url,
          }),
        });
      } catch (webhookError) {
        console.error('Webhook notification failed:', webhookError);
        // Don't fail the main request if webhook fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Quest completed successfully! Our team will review your application soon.',
      taskId: clickUpTask?.id || `QUEST-${Date.now()}`,
      data: {
        firstName: data.basicInfo.firstName,
        lastName: data.basicInfo.lastName,
        fullName: `${data.basicInfo.firstName} ${data.basicInfo.lastName}`,
        email: data.basicInfo.email
      }
    });
  } catch (error) {
    console.error('Quest submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process quest submission' },
      { status: 500 }
    );
  }
} 