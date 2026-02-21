import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroLogo}>
          <svg viewBox="0 0 122 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g>
              <linearGradient id="hg0" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0.6)"/>
              </linearGradient>
              <path d="M68.325 37.236c0 0-.437 1.935-1.946 4.144c-.419.699-.868 1.333-1.354 1.895c-.795.919-1.728 1.645-2.829 2.127c-3.937 2.449-10.268 3.67-20.324.198c14.389 8.792 22.388 7.478 27.564 1.491c8.014-9.263 6.976-26.65 13.985-36.453c4.952-6.927 14.732-7.822 37.728 8.621C109.559 7.301 88.966-7.148 78.668 7.254C74.73 12.759 73.178 20 71.44 26.471C70.481 30.282 69.531 34.044 68.325 37.236z" fill="url(#hg0)"/>
              <linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0.6)"/>
              </linearGradient>
              <path d="M27.21 27.262c-34.758-30.065 7.576-16.556 42.427-2.996l1.479-5.681C26.818 1.359-34-17.969 23.394 31.673c7.142 6.178 13.245 10.725 18.504 13.935c10.041 3.46 16.365 2.24 20.299-.207c.017-.007.031-.017.048-.024C56.661 47.873 46.643 44.071 27.21 27.262zM108.642 34.107c-.128-.056-12.053-5.342-27.951-11.733l-1.451 5.7c15.124 6.101 26.936 11.333 27.048 11.383C110.894 41.421 112.542 35.995 108.642 34.107z" fill="url(#hg1)"/>
            </g>
          </svg>
        </div>
        <h1 className={styles.heroTitle}>
          The missing <span className={styles.heroAccent}>audit log</span> library.
        </h1>
        <p className={styles.heroSubtitle}>
          A PHP library providing an easy and standardized way to collect audit logs —<br/>
          with first-class Symfony integration.
        </p>
        <div className={styles.heroCta}>
          <Link className={styles.ctaPrimary} to="/auditor/getting-started/installation">
            Get started
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <a className={styles.ctaSecondary} href="https://github.com/DamienHarper/auditor" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}

const projects = [
  {
    name: 'auditor',
    badge: '4.x',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/></svg>
    ),
    description: 'A standalone PHP library providing an easy and standardized way to collect audit logs. Supports Doctrine ORM, multiple databases, and flexible storage providers.',
    docsHref: '/auditor/',
    githubHref: 'https://github.com/DamienHarper/auditor',
    features: ['Doctrine ORM', 'Multi-database', 'Custom providers'],
  },
  {
    name: 'auditor-bundle',
    badge: '7.x',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
    ),
    description: 'A Symfony bundle that seamlessly integrates the auditor library. Auto-wiring, YAML configuration, a built-in audit log viewer and runtime controls.',
    docsHref: '/auditor-bundle/',
    githubHref: 'https://github.com/DamienHarper/auditor-bundle',
    features: ['Symfony integration', 'Audit viewer', 'Runtime controls'],
  },
];

function ProjectCard({ name, badge, icon, description, docsHref, githubHref, features }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <div className={styles.cardTitles}>
          <h2 className={styles.cardName}>{name}</h2>
          <span className={styles.cardBadge}>{badge}</span>
        </div>
      </div>
      <p className={styles.cardDesc}>{description}</p>
      <ul className={styles.cardFeatures}>
        {features.map(f => (
          <li key={f}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            {f}
          </li>
        ))}
      </ul>
      <div className={styles.cardFooter}>
        <Link className={styles.cardLinkDocs} to={docsHref}>
          Documentation
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
        <a className={styles.cardLinkGh} href={githubHref} target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="The missing PHP audit log library — auditor and auditor-bundle documentation">
      <HomepageHeader />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.cards}>
            {projects.map(p => <ProjectCard key={p.name} {...p} />)}
          </div>
        </div>
      </main>
    </Layout>
  );
}
