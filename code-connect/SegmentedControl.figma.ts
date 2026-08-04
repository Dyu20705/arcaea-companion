// url=https://www.figma.com/design/QJGevc16EkYfnOttxan2iK/Arcaea-Companion-%E2%80%94-MVP-UI-Foundation?node-id=81-45
import figma from "figma";

const instance = figma.selectedInstance;
const value = instance.getEnum("Value", {
  Comfortable: '"comfortable"',
  Compact: '"compact"',
});
const disabled = instance.getEnum("State", {
  Disabled: "true",
  Default: "false",
  "Focus-visible": "false",
});

export default {
  example: figma.code`
    <SegmentedControl
      label="Result density"
      value={${value}}
      options={densityOptions}
      disabled={${disabled}}
      onValueChange={setDensity}
    />
  `,
  imports: ['import { SegmentedControl } from "./src/ui/SegmentedControl"'],
  id: "arcaea-companion-segmented-control",
};
