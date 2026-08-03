// url=https://www.figma.com/design/QJGevc16EkYfnOttxan2iK/Arcaea-Viewer-%E2%80%94-MVP-UI-Foundation?node-id=21-213
import figma from "figma";

const instance = figma.selectedInstance;
const expanded = instance.getEnum("Expanded", {
  Yes: "true",
  No: "false",
});
const disabled = instance.getEnum("State", {
  Disabled: "true",
  Default: "false",
  "Focus-visible": "false",
});

export default {
  example: figma.code`
    <FilterGroup
      title="Difficulty"
      selectedCount={2}
      expanded={${expanded}}
      disabled={${disabled}}
      onExpandedChange={setDifficultyExpanded}
      onClear={clearDifficultyFilters}
    >
      {difficultyFilters}
    </FilterGroup>
  `,
  imports: ['import { FilterGroup } from "./src/ui/FilterGroup"'],
  id: "arcaea-viewer-filter-group",
};
