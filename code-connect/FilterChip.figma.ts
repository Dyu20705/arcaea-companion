// url=https://www.figma.com/design/QJGevc16EkYfnOttxan2iK/Arcaea-Companion-%E2%80%94-MVP-UI-Foundation?node-id=21-193
import figma from "figma";

const instance = figma.selectedInstance;
const selected = instance.getEnum("Selected", {
  Yes: "true",
  No: "false",
});
const disabled = instance.getEnum("State", {
  Disabled: "true",
  Default: "false",
  Hover: "false",
  "Focus-visible": "false",
});

export default {
  example: figma.code`
    <FilterChip
      label="Future"
      selected={${selected}}
      disabled={${disabled}}
      onSelectedChange={setFutureSelected}
      onRemove={removeFutureFilter}
    />
  `,
  imports: ['import { FilterChip } from "./src/ui/FilterChip"'],
  id: "arcaea-companion-filter-chip",
};
