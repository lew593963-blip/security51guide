import {
  Activity,
  ArrowRight,
  Biohazard,
  ExternalLink,
  Fingerprint,
  ScanSearch,
  ShieldCheck,
  Siren,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {rootConfig} from "@/config";
import type {Locale} from "@/i18n/routing";
import type {Messages} from "@/lib/messages";
import {routes} from "@/lib/site";

import styles from "./home-content.module.css";

type HomeContentProps = {
  locale: Locale;
  messages: Messages;
};

const guideIcons = [ShieldCheck, ScanSearch, Fingerprint, Biohazard, Activity];

export function HomeContent({messages}: HomeContentProps) {
  const guideRoutes = [
    routes.checkpointGuide,
    routes.anomalies,
    routes.medicalTests,
    routes.quarantine,
    routes.walkthrough,
  ];

  return (
    <main id="main-content">
      <section className={`${styles.hero} security-hero`} aria-labelledby="home-title">
        <div className="security-hero__media" aria-hidden="true">
          <Image
            src="/og.png"
            alt=""
            fill
            sizes="50vw"
            priority
          />
        </div>
        <div className={`page-width ${styles.heroInner} security-hero__inner`}>
          <div className="security-clearance" aria-hidden="true">
            <span>AREA 51</span>
            <strong>SECURITY</strong>
            <b>LEVEL 03</b>
          </div>
          <p className="eyebrow">{messages.hero.eyebrow}</p>
          <h1 id="home-title">{messages.hero.title}</h1>
          <p className={styles.heroDescription}>{messages.hero.description}</p>
          <div className={styles.heroActions}>
            <Link className="button button--primary" href={routes.checkpointGuide}>
              {messages.hero.primaryCta}<ArrowRight aria-hidden="true" size={16} />
            </Link>
            <a
              className={`button ${styles.secondaryButton}`}
              href={rootConfig.links.steam}
              target="_blank"
              rel="noreferrer"
            >
              {messages.hero.secondaryCta}<ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>
          <ul className={styles.heroStats} aria-label={`${rootConfig.game.name} facts`}>
            {messages.hero.stats.map((stat) => <li key={stat}>{stat}</li>)}
          </ul>
        </div>
      </section>

      <section className="security-protocol-strip" aria-label="Editorial protocol">
        <div className="page-width">
          <span><ShieldCheck size={15} aria-hidden="true" /> Official facts first</span>
          <span><ScanSearch size={15} aria-hidden="true" /> Current-build checks</span>
          <span><Siren size={15} aria-hidden="true" /> Unknowns stay unknown</span>
        </div>
      </section>

      <section id="guides" className={styles.startSection} aria-labelledby="start-title">
        <div className="page-width">
          <header className={styles.sectionHeader}>
            <p className="eyebrow">{messages.start.eyebrow}</p>
            <h2 id="start-title">{messages.start.title}</h2>
            <p>{messages.start.description}</p>
          </header>
          <div className={`${styles.startGrid} security51-guide-grid`}>
            {messages.start.cards.map((card, index) => {
              const Icon = guideIcons[index] ?? ShieldCheck;
              const href = guideRoutes[index] ?? routes.checkpointGuide;
              return (
                <article key={card.number} className={styles.startCard} data-testid="start-card">
                  <div className={styles.startCardTop}>
                    <span className={styles.startIcon} aria-hidden="true">
                      <Icon size={21} strokeWidth={1.5} />
                    </span>
                    <span className={styles.cardNumber}>{card.number.padStart(2, "0")}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link href={href} aria-label={`Read ${card.title}`}>
                    {messages.start.read}<ArrowRight aria-hidden="true" size={14} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className={`page-width ${styles.aboutSection}`} aria-labelledby="about-title">
        <div className={styles.aboutCopy}>
          <p className="eyebrow">{messages.about.eyebrow}</p>
          <h2 id="about-title">{messages.about.title}</h2>
          {messages.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <Link className="button button--primary" href={routes.walkthrough}>
            {messages.about.cta}<ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className={styles.aboutStats}>
          {messages.about.stats.map((stat, index) => {
            const Icon = index < 2 ? ShieldCheck : index === 2 ? Siren : Activity;
            return (
              <div key={stat.label} className={styles.aboutStat}>
                <Icon aria-hidden="true" size={18} strokeWidth={1.5} />
                <span>{stat.label}</span><strong>{stat.value}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="final-cta-title">
        <div className={`page-width ${styles.finalCtaInner}`}>
          <div>
            <p className="eyebrow">{messages.finalCta.eyebrow}</p>
            <h2 id="final-cta-title">{messages.finalCta.title}</h2>
            <p>{messages.finalCta.description}</p>
          </div>
          <div className={styles.finalActions}>
            <Link className="button button--primary" href={routes.checkpointGuide}>
              {messages.finalCta.primary}<ArrowRight aria-hidden="true" size={16} />
            </Link>
            <a
              className={`button ${styles.secondaryButton}`}
              href={rootConfig.links.steam}
              target="_blank"
              rel="noreferrer"
            >
              {messages.finalCta.secondary}<ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
