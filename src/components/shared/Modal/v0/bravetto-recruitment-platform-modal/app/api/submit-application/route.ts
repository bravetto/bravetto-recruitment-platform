import { NextResponse } from "next/server"

export async function POST(request: Request) {
  // INTEGRATION NOTE: This is a template for your real backend API route.
  // You will replace the logic here to securely call the ClickUp API.

  // 1. Securely get your ClickUp API Key from server-side environment variables.
  //    DO NOT expose this key to the client.
  const clickUpApiKey = process.env.CLICKUP_API_KEY
  const clickUpListId = process.env.CLICKUP_LIST_ID

  if (!clickUpApiKey || !clickUpListId) {
    console.error("ClickUp API Key or List ID is not configured on the server.")
    return NextResponse.json({ message: "Server configuration error." }, { status: 500 })
  }

  try {
    const body = await request.json()
    console.log("Received application data on server:", body.email)

    // 2. Here, you would format the `body` data as needed for the ClickUp API
    //    and make a `fetch` request to the ClickUp API endpoint.
    /*
    const clickUpResponse = await fetch(`https://api.clickup.com/api/v2/list/${clickUpListId}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': clickUpApiKey,
      },
      body: JSON.stringify({
        name: `New Application: ${body.firstName} ${body.lastName}`,
        description: `Email: ${body.email}\nPhone: ${body.phone}`,
        // ... map other fields from `body` to ClickUp custom fields ...
      }),
    });

    if (!clickUpResponse.ok) {
      const errorData = await clickUpResponse.json();
      console.error("ClickUp API Error:", errorData);
      throw new Error("Failed to create task in ClickUp.");
    }

    const clickUpTask = await clickUpResponse.json();
    */

    // 3. For now, we simulate the above logic.
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const simulatedTaskId = `task_${Date.now()}`
    const simulatedTaskUrl = `https://app.clickup.com/t/${simulatedTaskId}`

    return NextResponse.json(
      {
        success: true,
        message: "Application successfully submitted to Bravetto HQ!",
        taskId: simulatedTaskId,
        taskUrl: simulatedTaskUrl,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "Internal Server Error during submission." }, { status: 500 })
  }
}
