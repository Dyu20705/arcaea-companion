// url=https://www.figma.com/design/QJGevc16EkYfnOttxan2iK/Arcaea-Viewer-%E2%80%94-MVP-UI-Foundation?node-id=21-223
import figma from "figma";

const instance = figma.selectedInstance;
const disabled = instance.getEnum("State", {
  Disabled: "true",
  Closed: "false",
  Open: "false",
  Hover: "false",
  "Focus-visible": "false",
  Error: "false",
});
const error = instance.getEnum("State", {
  Error: '"Select a valid sort option"',
  Closed: "undefined",
  Open: "undefined",
  Hover: "undefined",
  "Focus-visible": "undefined",
  Disabled: "undefined",
});

export default {
  example: figma.code`
    <SelectField
      label="Sort results"
      value="title"
      options={sortOptions}
      disabled={${disabled}}
      error={${error}}
      onChange={handleSortChange}
    />
  `,
  imports: ['import { SelectField } from "./src/ui/SelectField"'],
  id: "arcaea-viewer-select-field",
};
