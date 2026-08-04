import { useState } from "react";

import { storyActs, storyChapters, storyParts, storyRecords } from "../../app/companion-data";
import { ColumnHeader, HierarchyItem, PageIntro } from "./primitives";

export function StoryRoute() {
  const [actId, setActId] = useState<string>(storyActs[0].id);
  const visibleParts = storyParts.filter((part) => part.actId === actId);
  const [partId, setPartId] = useState<string>(storyParts[0].id);
  const selectedPartId = visibleParts.some((part) => part.id === partId) ? partId : visibleParts[0]?.id;
  const visibleStories = storyRecords.filter((story) => story.partId === selectedPartId);
  const [storyId, setStoryId] = useState<string>(storyRecords[0].id);
  const selectedStoryId = visibleStories.some((story) => story.id === storyId) ? storyId : visibleStories[0]?.id;
  const visibleChapters = storyChapters.filter((chapter) => chapter.storyId === selectedStoryId);
  const [chapterId, setChapterId] = useState<string>(storyChapters[0].id);
  const selectedChapter = visibleChapters.find((chapter) => chapter.id === chapterId) ?? visibleChapters[0];
  const [revealedChapterId, setRevealedChapterId] = useState<string | null>(null);

  return (
    <div className="page-stack page-stack--compact">
      <PageIntro eyebrow="Story Mode · Lore-only browser" title="Story Mode" description="Navigate nested story collections without assuming one Act contains only one Part or one Story." />
      <div className="selection-path"><span>{storyActs.find((act) => act.id === actId)?.name}</span><b>›</b><span>{visibleParts.find((part) => part.id === selectedPartId)?.name}</span><b>›</b><span>{visibleStories.find((story) => story.id === selectedStoryId)?.name}</span><b>›</b><span>{selectedChapter?.name}</span></div>
      <div className="hierarchy-browser hierarchy-browser--story">
        <section id="acts" className="browser-column"><ColumnHeader title="Acts" count={storyActs.length} /><div className="browser-column__list">{storyActs.map((act) => <HierarchyItem key={act.id} title={act.name} summary={act.summary} selected={act.id === actId} onSelect={() => setActId(act.id)} />)}</div></section>
        <section id="parts" className="browser-column"><ColumnHeader title="Parts" count={visibleParts.length} /><div className="browser-column__list">{visibleParts.map((part) => <HierarchyItem key={part.id} title={part.name} summary={part.summary} selected={part.id === selectedPartId} onSelect={() => setPartId(part.id)} />)}</div></section>
        <section id="stories" className="browser-column"><ColumnHeader title="Stories" count={visibleStories.length} /><div className="browser-column__list">{visibleStories.map((story) => <HierarchyItem key={story.id} title={story.name} summary={story.summary} selected={story.id === selectedStoryId} onSelect={() => setStoryId(story.id)} />)}</div></section>
        <section id="chapters" className="browser-column"><ColumnHeader title="Chapters" count={visibleChapters.length} /><div className="browser-column__list">{visibleChapters.map((chapter) => <HierarchyItem key={chapter.id} title={chapter.name} summary="Lore entry · hidden" selected={chapter.id === selectedChapter?.id} onSelect={() => setChapterId(chapter.id)} />)}</div></section>
      </div>
      {selectedChapter ? (
        <section className="spoiler-panel">
          <div>
            <span className="status-badge status-badge--upcoming">Spoiler alert</span>
            <h2>{selectedChapter.name} · {visibleStories.find((story) => story.id === selectedStoryId)?.name}</h2>
            {revealedChapterId === selectedChapter.id ? <p>{selectedChapter.lore}</p> : <p>Lore remains hidden until you explicitly reveal this chapter.</p>}
            <small>Story records contain text-only lore and trivia.</small>
          </div>
          <button type="button" className="primary-button" onClick={() => setRevealedChapterId(selectedChapter.id)}>{revealedChapterId === selectedChapter.id ? "Lore revealed" : "Reveal lore"}</button>
        </section>
      ) : null}
    </div>
  );
}
