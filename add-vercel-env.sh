#!/bin/bash

# First link the project
echo "Linking project to Vercel..."
vercel link --yes

# Add all environment variables
echo "Adding environment variables..."

vercel env add BUILD_TIME production < <(echo "2025-06-06T17:22:00Z")
vercel env add NEXT_PUBLIC_APP_VERSION production < <(echo "1.0.0")
vercel env add CLICKUP_API_KEY production < <(echo "pk_81414126_JH0AO0X769UOJSIA0DOANJ37529UYU0Z")
vercel env add NOTIFICATION_WEBHOOK_URL production < <(echo "4567890-1234-5678-9012-345678901234")
vercel env add CLICKUP_WORKSPACE_ID production < <(echo "9011549512")
vercel env add CLICKUP_FIELD_ID_RATING_EDGE production < <(echo "2479d370-1dd8-400e-a0ba-6b2fcccd74c5")
vercel env add CLICKUP_FIELD_ID_RATING_DB production < <(echo "be511a15-b26a-44d6-a152-3fdc386507a9")
vercel env add CLICKUP_FIELD_ID_AVAILABILITY production < <(echo "0c4eff4f-05b9-4618-a818-3aaa586f0f1c")
vercel env add CLICKUP_FIELD_ID_AGENT production < <(echo "29ad1609-34c5-4d8a-b5f8-c14b580dfb79")
vercel env add CLICKUP_FIELD_ID_DEV_ENV production < <(echo "9f2a1a3c-0b5c-4c16-864e-f0454f00db77")
vercel env add CLICKUP_FIELD_ID_SUPERPOWER production < <(echo "40c6baae-2cc4-4cc1-aff7-d0b4ec3af0be")
vercel env add CLICKUP_FIELD_ID_EMAIL production < <(echo "a9c7b391-3cb4-4fd1-af4d-fcbb79599d46")
vercel env add CLICKUP_FIELD_ID_PHONE production < <(echo "5e5cb139-182f-4432-8f78-6ba78c0db063")
vercel env add CLICKUP_FIELD_ID_GITHUB production < <(echo "b06a8e8d-6a95-4e41-99fd-645426f5f96b")
vercel env add CLICKUP_FIELD_ID_PORTFOLIO production < <(echo "2853c5f1-fd75-43e0-8518-68e630660f88")
vercel env add CLICKUP_FIELD_ID_RATING_REACT production < <(echo "2016547b-40be-4cc2-b608-26c95f49a76e")
vercel env add CLICKUP_FIELD_ID_RATING_AI production < <(echo "9fc093f3-119d-49df-b54e-e54ef115e528")
vercel env add CLICKUP_FIELD_ID_FIRST_NAME production < <(echo "00000000-0000-0000-0000-000000000001")
vercel env add CLICKUP_FIELD_ID_LAST_NAME production < <(echo "70aef73b-2f4d-4b96-94cd-f2ad97c1dcff")
vercel env add CLICKUP_LIST_ID production < <(echo "901110917543")
vercel env add CLICKUP_SPACE_ID production < <(echo "9011549512")

echo "All environment variables added successfully!"
echo "You may need to redeploy for changes to take effect." 