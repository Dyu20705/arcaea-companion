// url=https://www.figma.com/design/QJGevc16EkYfnOttxan2iK/Arcaea-Companion-%E2%80%94-MVP-UI-Foundation?node-id=22-128
import figma from "figma";

const instance = figma.selectedInstance;
const selected = instance.getEnum("State", {
  Selected: "true",
  Default: "false",
  Hover: "false",
  "Focus-visible": "false",
  Unavailable: "false",
});
const status = instance.getEnum("State", {
  Unavailable: '"unavailable"',
  Default: '"reviewed"',
  Hover: '"reviewed"',
  "Focus-visible": '"reviewed"',
  Selected: '"reviewed"',
});
const href = instance.getEnum("State", {
  Unavailable: "undefined",
  Default: '"/songs/prism-echo-001"',
  Hover: '"/songs/prism-echo-001"',
  "Focus-visible": '"/songs/prism-echo-001"',
  Selected: '"/songs/prism-echo-001"',
});

export default {
  example: figma.code`
    <SongRow
      song={{
        id: "prism-echo-001",
        title: "Prism Echo 001",
        artist: "Archive Artist 03",
        pack: "Archive Set B",
        difficulty: "FTR 9+",
        bpm: 180,
        status: ${status},
      }}
      href={${href}}
      selected={${selected}}
    />
  `,
  imports: ['import { SongRow } from "./src/ui/SongRow"'],
  id: "arcaea-companion-song-row",
};
