import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  LEADERSHIP_HEADING,
  TEAM_EXPERIENCE_LABEL,
  TEAM_INTRO,
  advisors,
  team,
  teamExperienceLogos,
} from "./data";

type LiveEntry = { name: string; role: string; bio: string };

/** Name/title/bio text scraped verbatim from https://www.navable.com/about-us. */
const live: LiveEntry[] = JSON.parse(
  readFileSync(join(__dirname, "live-team.fixture.json"), "utf8"),
);

test("team intro is the exact approved copy", () => {
  assert.equal(
    TEAM_INTRO,
    "Our team of financial services and technology professionals launched Navable as an end-to-end digital platform for automating some of the most complex internal financial workflows at private funds, including carried interest, employee co-investment, and compensation.",
  );
});

test("the first group is headed Leadership", () => {
  assert.equal(LEADERSHIP_HEADING, "Leadership");
});

test("every person's name, title and bio equals the live About page text", () => {
  const people = [...team, ...advisors];
  assert.equal(people.length, live.length);
  for (const entry of live) {
    const person = people.find((p) => p.name === entry.name);
    assert.ok(person, `${entry.name} is missing from the roster`);
    assert.equal(person.role, entry.role, `${entry.name} title`);
    assert.equal(person.bio, entry.bio, `${entry.name} bio`);
  }
});

test("roster order and groups are unchanged", () => {
  assert.deepEqual(
    team.map((p) => p.name),
    ["Jen Anderson", "Anna Enns"],
  );
  assert.deepEqual(
    advisors.map((p) => p.name),
    ["Ethan Kennedy", "Josh Anbil", "Michelle Brown", "Kristine Tech", "Leonard Speiser", "Ronnie Mongan"],
  );
});

test("LinkedIn links added earlier are kept", () => {
  const byName = new Map([...team, ...advisors].map((p) => [p.name, p.linkedin]));
  assert.equal(byName.get("Anna Enns"), "https://www.linkedin.com/in/anna-enns");
  assert.equal(byName.get("Leonard Speiser"), "https://www.linkedin.com/in/leonardspeiser");
  assert.equal(byName.get("Ronnie Mongan"), "https://www.linkedin.com/in/ronnie-mongan");
});

test("team experience logo strip lists the six firms in order", () => {
  assert.deepEqual(
    teamExperienceLogos.map((l) => l.name),
    ["Morgan Stanley", "Citi", "Carlyle Group", "KPMG", "PwC", "General Catalyst"],
  );
  assert.ok(TEAM_EXPERIENCE_LABEL.length > 0);
  for (const logo of teamExperienceLogos) {
    const file = join(__dirname, "../../../public", logo.src);
    const svg = readFileSync(file, "utf8");
    assert.match(svg, /^<svg\b/, `${logo.src} is a bare SVG`);
    assert.doesNotMatch(svg, /<script|<metadata|inkscape|sodipodi/i, `${logo.src} is clean`);
  }
});
