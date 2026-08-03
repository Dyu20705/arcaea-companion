// url=https://www.figma.com/design/QJGevc16EkYfnOttxan2iK/Arcaea-Viewer-%E2%80%94-MVP-UI-Foundation?node-id=81-150
import figma from "figma";

const instance = figma.selectedInstance;
const value = instance.getEnum("Value", {
  Past: '"past"',
  Present: '"present"',
  Future: '"future"',
  Beyond: '"beyond"',
});
const beyondUnavailable = instance.getEnum("Unavailable", {
  Beyond: "true",
  None: "false",
});

export default {
  example: figma.code`
    <DifficultySelector
      value={${value}}
      options={[
        { value: "past", label: "PAST", rating: "3" },
        { value: "present", label: "PRESENT", rating: "7" },
        { value: "future", label: "FUTURE", rating: "9+" },
        { value: "beyond", label: "BEYOND", rating: "10", unavailable: ${beyondUnavailable} },
      ]}
      onValueChange={setDifficulty}
    />
  `,
  imports: ['import { DifficultySelector } from "./src/ui/DifficultySelector"'],
  id: "arcaea-viewer-difficulty-selector",
};
