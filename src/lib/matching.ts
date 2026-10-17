import { techSkills } from "../data/techMatrixData";
import type { Project } from "../data/resume";

const norm = (s: string) => s.trim().toLowerCase();

/**
 * Decides whether a project matches the active filter.
 * The filter is either a Tech Matrix skill name (e.g. "React 18 / 19") or a
 * raw tech-stack chip from a project card (e.g. "React"). Skill names are not
 * always identical to the tech strings, so a skill match uses the skill's own
 * project links, which are the source of truth shown on its card.
 */
export function projectMatchesFilter(
  project: Pick<Project, "title" | "tech">,
  filter: string | null | undefined,
): boolean {
  if (!filter) return false;
  const skill = techSkills.find((s) => norm(s.name) === norm(filter));
  if (skill) {
    return skill.projects.some((p) => norm(p) === norm(project.title));
  }
  return project.tech.some((t) => norm(t) === norm(filter));
}
