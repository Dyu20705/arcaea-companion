import { gameEvents, gameNews } from "../app/companion-data";

export function HomeRoute() {
  return (
    <div className="home-page">
      <section className="home-banner" aria-labelledby="home-title">
        <div className="home-banner__copy">
          <p className="banner-label">Banner artwork reserved</p>
          <h1 id="home-title">A shattered archive, rebuilt for discovery.</h1>
          <p>
            Follow current events and news, then move into the Wiki for structured
            game information.
          </p>
        </div>
        <div className="home-banner__shard" aria-hidden="true" />
      </section>

      <section className="content-section" aria-labelledby="events-title">
        <div className="section-heading">
          <h2 id="events-title">Active game events</h2>
        </div>
        <div className="event-grid">
          {gameEvents.map((event) => (
            <article className="event-card" key={event.id}>
              <span className={`status-badge status-badge--${event.status}`}>
                {event.status}
              </span>
              <h3>{event.title}</h3>
              <p>Active window · {event.timing}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="news-title">
        <div className="section-heading">
          <h2 id="news-title">Game news</h2>
        </div>
        <div className="news-list">
          {gameNews.map((item) => (
            <article className="news-row" key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <time dateTime={item.date}>{item.date}</time>
              </div>
              <span className="news-category">{item.category}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
