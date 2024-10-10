import IconCloud from "@/components/magicUi/iconCloud";

const slugs = [
  "linkedin",
  "whatsapp",
  "facebook",
  "instagram",
  "youtube",
  "notion",
  "amazon",
  "tiktok",
  "jira",
  "github",
  "android",
  "ios",
  "apple",
  "figma",
  "adobe",
  "appstore",
  "zoom",
  "google",
  "googlecloud",
  "googledrive",
  "googlesheets",
  "googlemybusiness",
  "googlemarketingplatform",
  "salesforce",
  "zapier",
  "sap",
  "apache",
  "telegram",
];

export function IconCloudPage() {
  return (
    <div className="relative flex h-full w-full max-w-full items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
