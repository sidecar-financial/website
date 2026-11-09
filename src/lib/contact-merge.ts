/**
 * Which values from a new form submission may be written onto a contact that already exists.
 * Only blank fields are filled; a name or company someone already set is never replaced, so a
 * repeat submit (or someone typing a different company) cannot clobber real CRM data.
 */
export function fillBlankProperties(
  existing: Record<string, string | null | undefined>,
  incoming: Record<string, string>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(incoming)) {
    if (!value) continue;
    if ((existing[key] ?? "").trim() === "") result[key] = value;
  }
  return result;
}
