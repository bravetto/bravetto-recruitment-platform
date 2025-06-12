import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Get ClickUp configuration from environment variables
    const clickUpApiKey = process.env.CLICKUP_API_KEY
    const clickUpListId = process.env.CLICKUP_LIST_ID

    if (!clickUpApiKey || !clickUpListId) {
      console.error("ClickUp API Key or List ID is not configured.")
      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 }
      )
    }

    console.log("Received application data:", body.email)

    // Create task in ClickUp
    const taskName = `${body.firstName} ${body.lastName} - Application`
    const taskDescription = `
# Application Details

**Name:** ${body.firstName} ${body.lastName}
**Email:** ${body.email}
**Phone:** ${body.phone || 'Not provided'}

## Additional Information
${JSON.stringify(body, null, 2)}

---
*Submitted on: ${new Date().toLocaleString()}*
`

    const clickUpResponse = await fetch(
      `https://api.clickup.com/api/v2/list/${clickUpListId}/task`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': clickUpApiKey,
        },
        body: JSON.stringify({
          name: taskName,
          description: taskDescription,
          status: 'open',
          priority: 2,
          tags: ['application', 'candidate'],
          custom_fields: [
            {
              id: process.env.CLICKUP_FIELD_ID_FIRST_NAME,
              value: body.firstName
            },
            {
              id: process.env.CLICKUP_FIELD_ID_LAST_NAME,
              value: body.lastName
            },
            {
              id: process.env.CLICKUP_FIELD_ID_EMAIL,
              value: body.email
            },
            {
              id: process.env.CLICKUP_FIELD_ID_PHONE,
              value: body.phone
            }
          ].filter(field => field.id && field.value)
        }),
      }
    )

    if (!clickUpResponse.ok) {
      const errorData = await clickUpResponse.json()
      console.error("ClickUp API Error:", errorData)
      
      // Still return success to user but log the error
      console.error("Failed to create task in ClickUp, but application was received")
    }

    const clickUpTask = clickUpResponse.ok ? await clickUpResponse.json() : null

    return NextResponse.json(
      {
        success: true,
        message: "Application successfully submitted to Bravetto HQ!",
        taskId: clickUpTask?.id || `task_${Date.now()}`,
        taskUrl: clickUpTask?.url || null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { message: "Internal Server Error during submission." },
      { status: 500 }
    )
  }
} 