import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import ThemedImage from "@theme/ThemedImage";
import styles from "./index.module.css";

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <ThemedImage
          className={styles.logoWide}
          sources={{ light: "img/wide.svg", dark: "img/wide-dark.svg" }}
        />
        <Heading as="h1" className={styles.heroTitle}>
          Prettier Java Next Line
        </Heading>
        <p className={styles.heroSubtitle}>
          Prettier Java, with opening braces on the next line.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--warning button--lg" to="/playground">
            Try It Online
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/installation"
          >
            Install the Fork
          </Link>
        </div>
      </div>
    </header>
  );
}

function PurposeSection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.sectionInner}`}>
        <Heading as="h2">Structure you can see at a glance</Heading>
        <p className={styles.lead}>
          Putting each brace on its own line makes a block&apos;s outline
          visible before you read it.
        </p>
        <div className={styles.codeComparison}>
          <div>
            <Heading as="h3">Same line</Heading>
            <pre>
              <code>{`if (ready) {
\trun();
}`}</code>
            </pre>
          </div>
          <div>
            <Heading as="h3">Next line</Heading>
            <pre>
              <code>{`if (ready)
{
\trun();
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function RationaleSection() {
  return (
    <section className={`${styles.section} ${styles.rationaleSection}`}>
      <div className={`container ${styles.sectionInner}`}>
        <Heading as="h2">Why this is worth a fork</Heading>
        <p>
          Same-line formatting made sense on small, low-resolution CRT displays
          where every row counted.
        </p>
        <p>
          On a modern display, we would rather spend one extra line and see the
          shape of the block.
        </p>
        <p>
          Upstream Prettier Java declined the option, so this fork carries it.
        </p>
        <Link to="https://github.com/jhipster/prettier-java/pull/840">
          Read the upstream proposal
        </Link>
      </div>
    </section>
  );
}

function ChoiceSection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.sectionInner}`}>
        <Heading as="h2">Next line by default, not by force</Heading>
        <p>
          The fork defaults to <code>braceStyle: &quot;next-line&quot;</code>;
          select <code>braceStyle: &quot;same-line&quot;</code> when needed.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--warning button--lg" to="/playground">
            Compare Both Styles
          </Link>
          <Link className="button button--primary button--lg" to="/docs">
            Read the Rationale
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Next-line Java formatting"
      description="Prettier Java with next-line opening braces by default."
    >
      <HomepageHeader />
      <main>
        <PurposeSection />
        <RationaleSection />
        <ChoiceSection />
      </main>
    </Layout>
  );
}
