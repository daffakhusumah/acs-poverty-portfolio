import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACS 2024 Poverty Overview",
  description:
    "A portfolio-style poverty analysis report using the ACS 2024 S1701 public CSV export.",
};

const overview = {
  population: "332.1M",
  below: "40.4M",
  rate: "12.1%",
  source: "U.S. Census Bureau ACS 1-Year 2024, S1701",
};

const ageData = [
  { label: "Under 18", rate: 15.5, below: "11.1M" },
  { label: "18 to 64", rate: 11.2, below: "22.5M" },
  { label: "65+", rate: 11.2, below: "6.7M" },
];

const sexData = [
  { label: "Male", rate: 11.0, below: "18.0M" },
  { label: "Female", rate: 13.3, below: "22.4M" },
];

const raceData = [
  { label: "Black or African American alone", rate: 20.3, below: "8.0M" },
  { label: "American Indian and Alaska Native alone", rate: 19.6, below: "651k" },
  { label: "Some other race alone", rate: 17.8, below: "4.4M" },
  { label: "Hispanic or Latino origin", rate: 16.2, below: "10.8M" },
  { label: "Native Hawaiian and Other Pacific Islander alone", rate: 15.7, below: "99k" },
  { label: "Two or more races", rate: 14.0, below: "6.2M" },
  { label: "Asian alone", rate: 9.7, below: "2.0M" },
  { label: "White alone", rate: 9.5, below: "19.0M" },
  { label: "White alone, not Hispanic or Latino", rate: 9.1, below: "17.1M" },
];

const educationData = [
  { label: "Less than high school", rate: 24.0, below: "5.5M" },
  { label: "High school graduate", rate: 14.3, below: "8.5M" },
  { label: "Some college or associate degree", rate: 9.7, below: "6.2M" },
  { label: "Bachelor's degree or higher", rate: 4.6, below: "3.9M" },
];

const workData = [
  { label: "Unemployed", rate: 28.5, below: "2.3M" },
  { label: "Did not work", rate: 21.3, below: "19.0M" },
  { label: "Part-time or part-year", rate: 14.9, below: "8.6M" },
  { label: "Employed", rate: 5.5, below: "9.1M" },
  { label: "Full-time, year-round", rate: 2.3, below: "2.8M" },
];

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </div>
  );
}

function BarList({ data, max = 30 }: { data: { label: string; rate: number; below: string }[]; max?: number }) {
  return (
    <div className="bar-list">
      {data.map((item) => (
        <div className="bar-row" key={item.label}>
          <div className="bar-label">
            <span>{item.label}</span>
            <strong>{item.rate.toFixed(1)}%</strong>
          </div>
          <div className="bar-track" aria-hidden="true">
            <div className="bar-fill" style={{ width: `${Math.min((item.rate / max) * 100, 100)}%` }} />
          </div>
          <p>{item.below} people below poverty level</p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio data report</p>
          <h1>ACS 2024 Poverty Overview</h1>
          <p className="lede">
            A concise analysis of poverty in the United States using a public ACS S1701 CSV export,
            designed to demonstrate data cleaning, comparison, visualization, and business-style reporting skills.
          </p>
        </div>
        <div className="hero-panel" aria-label="National poverty summary">
          <span>National poverty rate</span>
          <strong>{overview.rate}</strong>
          <p>{overview.below} people below the poverty level out of {overview.population} measured.</p>
        </div>
      </section>

      <section className="summary-section" aria-labelledby="summary-title">
        <div className="section-heading">
          <p className="eyebrow">Executive summary</p>
          <h2 id="summary-title">The highest poverty rates are concentrated by education, work status, and race or ethnicity.</h2>
        </div>
        <div className="metrics-grid">
          <MetricCard label="Population measured" value={overview.population} note="People for whom poverty status was determined." />
          <MetricCard label="Below poverty level" value={overview.below} note="Estimated U.S. population below the poverty threshold." />
          <MetricCard label="Overall poverty rate" value={overview.rate} note="National benchmark used for group comparisons." />
        </div>
        <div className="insight-grid">
          <p><strong>Education shows the widest gap.</strong> People with less than a high school education had a 24.0% poverty rate, compared with 4.6% for people with a bachelor's degree or higher.</p>
          <p><strong>Work status is a major dividing line.</strong> Unemployed people had a 28.5% poverty rate, while full-time, year-round workers were at 2.3%.</p>
          <p><strong>Children remain above the national average.</strong> People under 18 had a 15.5% poverty rate compared with the overall 12.1% rate.</p>
        </div>
      </section>

      <section className="report-section" aria-labelledby="age-title">
        <div className="section-heading compact">
          <p className="eyebrow">Age and gender</p>
          <h2 id="age-title">Children and women are above the national poverty rate.</h2>
          <p>Age and sex comparisons help identify which population groups have higher exposure to poverty in the national ACS table.</p>
        </div>
        <div className="two-column">
          <div className="chart-card">
            <h3>Poverty by age group</h3>
            <BarList data={ageData} max={20} />
          </div>
          <div className="chart-card">
            <h3>Poverty by sex</h3>
            <BarList data={sexData} max={20} />
          </div>
        </div>
      </section>

      <section className="report-section" aria-labelledby="race-title">
        <div className="section-heading compact">
          <p className="eyebrow">Race and ethnicity</p>
          <h2 id="race-title">Race and ethnicity categories show large differences around the 12.1% national benchmark.</h2>
          <p>The highest rates in this file are for Black or African American alone, American Indian and Alaska Native alone, some other race alone, and Hispanic or Latino origin.</p>
        </div>
        <div className="chart-card wide">
          <h3>Poverty rate by race or ethnicity</h3>
          <BarList data={raceData} max={25} />
        </div>
      </section>

      <section className="report-section" aria-labelledby="education-title">
        <div className="section-heading compact">
          <p className="eyebrow">Education and work</p>
          <h2 id="education-title">Education and steady work are associated with much lower poverty rates.</h2>
          <p>These comparisons are useful for policy, workforce, and nonprofit audiences because they connect poverty outcomes to practical intervention areas.</p>
        </div>
        <div className="two-column">
          <div className="chart-card">
            <h3>Poverty by education level</h3>
            <BarList data={educationData} max={30} />
          </div>
          <div className="chart-card">
            <h3>Poverty by work status</h3>
            <BarList data={workData} max={30} />
          </div>
        </div>
      </section>

      <section className="location-section" aria-labelledby="location-title">
        <div>
          <p className="eyebrow">Location comparison</p>
          <h2 id="location-title">This CSV supports a national view, not a state-by-state comparison.</h2>
          <p>
            The uploaded file contains United States columns only. A true location comparison would need the same S1701 table exported with state, county, city, or ZIP-level geographies. The recommended next dataset is an ACS S1701 export with multiple geography columns so the report can rank locations by poverty rate and population affected.
          </p>
        </div>
        <div className="next-data-card">
          <span>Next data collection target</span>
          <strong>ACS S1701 by state or county</strong>
          <p>Best for comparing places, mapping high-poverty areas, and building a more client-ready dashboard.</p>
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="portfolio-title">
        <div className="section-heading compact">
          <p className="eyebrow">Upwork portfolio framing</p>
          <h2 id="portfolio-title">What this project demonstrates</h2>
        </div>
        <div className="portfolio-grid">
          <div><strong>Data cleaning</strong><p>Cleaned Census labels, percentages, counts, and grouped rows into usable analysis categories.</p></div>
          <div><strong>Analysis</strong><p>Compared poverty rates across demographic groups and identified where gaps are largest.</p></div>
          <div><strong>Visualization</strong><p>Built readable bar charts with plain-language labels and a clear benchmark story.</p></div>
          <div><strong>Reporting</strong><p>Translated public data into a concise report for policy, nonprofit, or business readers.</p></div>
        </div>
      </section>

      <footer>
        <p>Source: {overview.source}. Dataset file: ACSST1Y2024.S1701-2026-07-22T100017.csv.</p>
      </footer>
    </main>
  );
}
