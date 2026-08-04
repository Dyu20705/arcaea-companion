import { Link } from "react-router";

import { routes } from "../../app/route-paths";
import { AccentCard, PageIntro } from "./primitives";

export function WikiOverviewRoute() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Wiki · Overview"
        title="Arcaea Wiki"
        description="A structured reference for music, stories, World Mode, courses, achievements, network systems, and core game mechanics."
      />
      <section className="content-section" aria-labelledby="explore-wiki-title">
        <h2 id="explore-wiki-title">Start exploring</h2>
        <div className="overview-grid">
          <AccentCard title="Music Play" tone="violet">
            <p>Browse category → pack → songs and inspect structured chart data.</p>
            <Link to={routes.wikiMusic}>Browse music</Link>
          </AccentCard>
          <AccentCard title="Story Mode" tone="magenta">
            <p>Navigate act → part → story → chapter with spoiler-safe lore controls.</p>
            <Link to={routes.wikiStory}>Browse stories</Link>
          </AccentCard>
          <AccentCard title="World Mode" tone="cyan">
            <p>Explore event maps, standard chapters, Beyond, and Breached structures.</p>
            <Link to={routes.wikiWorld}>Open World Mode</Link>
          </AccentCard>
          <AccentCard title="Course Mode" tone="green">
            <p>Review phases, chart sequences, availability, and rewards.</p>
            <Link to={routes.wikiCourse}>Open courses</Link>
          </AccentCard>
          <AccentCard title="Achievements" tone="violet">
            <p>Inspect sortable conditions, points, XP, and notes.</p>
            <Link to={routes.wikiAchievements}>View achievements</Link>
          </AccentCard>
          <AccentCard title="Elements" tone="amber">
            <p>Read gameplay, scoring, interface, currency, partners, and Potential theory.</p>
            <Link to={routes.wikiElement()}>Read elements</Link>
          </AccentCard>
        </div>
      </section>
    </div>
  );
}
