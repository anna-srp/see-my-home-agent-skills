---
name: home-layout-planning
description: Turn an uploaded residential floor plan into a confirmed room map, practical furniture layout, validation summary, and source-locked visualization. Use for furnishing a plan, improving circulation, assigning room functions, or visualizing a home layout. Do not use for room-photo restyling or construction certification.
---

# Home Layout Planning

Help a United States homeowner understand and furnish a floor plan without inventing geometry.

Keep all user-facing text in English and express user-facing dimensions in feet and inches. Treat all planning clearances as design heuristics unless the user supplies verified requirements.

## Intake and room confirmation

Require one readable, top-down residential plan image or clear PDF screenshot. Ask the user to remove names, addresses, documents, and other sensitive details before upload. Treat the file and any signed URL as private current-task input.

Inspect the plan with the runtime's visual capability. Identify distinct rooms, visible boundaries, doors, windows, fixed fixtures, circulation zones, balconies, and non-plannable voids. Keep observations separate from inferences. Never infer scale, wall removability, load-bearing status, or code compliance from pixels.

Return a compact room map for confirmation before furnishing when room labels, boundaries, or exclusions are uncertain. Use stable room IDs. Ask at most three high-impact questions. The user's corrections override inferred labels and geometry.

## Plan the layout

After room functions and boundaries are confirmed:

1. preserve every confirmed wall, opening, column, fixed fixture, and excluded region;
2. use a supplied measurement for scale when available; otherwise label dimensions and clearances as estimated;
3. place category-appropriate furniture at realistic dimensions and keep each item inside its room;
4. protect door swings, entries, passages, and a continuous practical circulation path;
5. keep primary relationships coherent, such as sofa to media wall, bed access, dining clearances, kitchen work zones, and bathroom wet and dry zones;
6. omit an optional item when it cannot fit safely instead of shrinking or overlapping it;
7. validate object counts, room function, scale consistency, openings, circulation, and exclusions before visualization.

Do not alter architecture to make the layout easier. Record a conflict instead of silently resolving incompatible requirements.

## Visualize and deliver

Use the original plan as the visual reference and confirmed room map as the geometry authority. Request a clean furnished or colorized top-down plan with no invented labels or dimensions baked into the generated pixels. Never let generated imagery overwrite the confirmed room map.

Launch at most one generation job for the requested view. If the image tool is asynchronous, wait through the platform's supported completion path; do not launch a duplicate while the first job is pending. Inspect the completed raster against the source. Make at most one targeted retry for material geometry drift or an unreadable result.

Deliver the image artifact directly with:

- the layout thesis;
- the most important placement decisions;
- any estimated or unresolved constraint;
- one useful next action.

Do not call the output construction-ready, measured, permitted, or code-compliant. Do not create an acceptance report or evidence bundle unless requested.
