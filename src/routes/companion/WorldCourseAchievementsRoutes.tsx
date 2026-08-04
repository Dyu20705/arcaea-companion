import { useState } from "react";

import { achievements, courses, worldFamilies, worldMap } from "../../app/companion-data";
import { AccentCard, MetricRow, PageIntro, Trivia } from "./primitives";

export function WorldRoute() {
  return (
    <div className="page-stack">
      <PageIntro eyebrow="World Mode · Overview" title="World Mode" description="Explore active events, standard chapters, Lost Chapter: Beyond, and Breached chapters through one extensible map model." />
      <div className="world-family-grid">{worldFamilies.map((family, index) => <AccentCard key={family.id} title={family.title} tone={["magenta", "violet", "cyan", "amber"][index] as "magenta" | "violet" | "cyan" | "amber"}><p>{family.description}</p></AccentCard>)}</div>
      <section className="content-section">
        <h2>Map detail</h2>
        <article className="detail-card">
          <header><h3>{worldMap.name}</h3><span className="status-badge status-badge--active">Active event</span></header>
          <dl className="metric-grid"><MetricRow label="Map" value={worldMap.id} /><MetricRow label="Stamina cost" value={worldMap.staminaCost} /><MetricRow label="Tiles (steps)" value={`${worldMap.tiles} tiles · ${worldMap.steps} steps`} /><MetricRow label="Unlock requirement" value={worldMap.unlockRequirement} /><MetricRow label="Total rewards" value={worldMap.rewards.join(", ")} /><MetricRow label="Mechanics" value={worldMap.mechanics.join(", ")} /></dl>
          <div className="inline-trivia"><strong>Trivia</strong><span>{worldMap.trivia[0]}</span></div>
        </article>
      </section>
    </div>
  );
}

export function CourseRoute() {
  return (
    <div className="page-stack">
      <PageIntro eyebrow="Course Mode · List" title="Course Mode" description="Review each course and phase as a chart sequence with explicit rewards." />
      <div className="filter-pills">{[1, 2, 3, 4].map((phase) => <button type="button" key={phase}>Phase {phase}</button>)}<button type="button">All courses</button></div>
      <div className="course-list">{courses.map((course) => <article className="course-card" key={course.id}><header><h2>{course.title}</h2><span className={`status-badge status-badge--${course.available ? "active" : "upcoming"}`}>{course.available ? "Available" : "Locked"}</span></header><div className="course-chart-grid">{course.charts.map((chart) => <div key={chart.title}><strong>{chart.title}</strong><span>{chart.difficulty}</span></div>)}</div><p>Rewards · {course.rewards.join(", ")}</p></article>)}</div>
      <Trivia><p>Course-level and phase-level notes belong to the course record.</p></Trivia>
    </div>
  );
}

export function AchievementsRoute() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Gameplay", "World Mode", "Story", "Course"];
  const visible = category === "All" ? achievements : achievements.filter((achievement) => achievement.category === category);
  return (
    <div className="page-stack">
      <PageIntro eyebrow="Achievements · Table" title="Achievements" description="A sortable reference table for conditions, points, XP, and notes." />
      <div className="filter-pills">{categories.map((item) => <button type="button" className={item === category ? "is-active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="table-scroll"><table className="data-table"><thead><tr><th>Achievement</th><th>Conditions</th><th>Points</th><th>XP</th><th>Notes</th></tr></thead><tbody>{visible.map((achievement) => <tr key={achievement.id}><th scope="row">{achievement.title}</th><td>{achievement.conditions}</td><td>{achievement.points}</td><td>{achievement.xp}</td><td>{achievement.notes}</td></tr>)}</tbody></table></div>
    </div>
  );
}
