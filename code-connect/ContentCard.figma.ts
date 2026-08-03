// url=https://www.figma.com/design/QJGevc16EkYfnOttxan2iK/Arcaea-Viewer-%E2%80%94-MVP-UI-Foundation?node-id=22-140
import figma from "figma";

const instance = figma.selectedInstance;
const featured = instance.getEnum("Variant", {
  Featured: "true",
  Default: "false",
});

export default {
  example: figma.code`
    <ContentCard
      title="Browse packs"
      description="Structured entry point with limited, scannable supporting information."
      href="/explore"
      actionLabel="View collection"
      featured={${featured}}
    />
  `,
  imports: ['import { ContentCard } from "./src/ui/ContentCard"'],
  id: "arcaea-viewer-content-card",
};
