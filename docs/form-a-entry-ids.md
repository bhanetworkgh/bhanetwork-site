# Form A — entry IDs

Read from the live Form A page data (`FB_PUBLIC_LOAD_DATA_`) on 2026-09-23:

https://docs.google.com/forms/d/e/1FAIpQLSfQkBm4lz4UuyL0TnbuJ7iUeE4PmWfDlfTLrKkDd23WL7gtnQ/viewform

Form title: **vFarm Digital Twin Early Access - Founding Buyer / Pilot Interest**

Option strings are copied exactly as Form A stores them, in backticks. In
Form A's data, questions 14 and 17 and the scale's low label each end in one
trailing space (`… operate in? `, `… pilot partner? `, `Just exploring `);
the table shows the scale label with its space and the question text without. The last column is the JSON key the
`/vfarm` form sends each answer under (`src/lib/formA.ts`).

## Sections and pageHistory

- **7 sections (pages)**: the untitled first page plus 6 section headers.
- No option carries go-to-section branching, so every respondent passes
  through every page in order.
- **pageHistory for a full submission: `0,1,2,3,4,5,6`**

| Page | Section |
|---|---|
| 0 | (untitled first page) |
| 1 | Location |
| 2 | What Would You Use vFarm For? |
| 3 | Your Potential Site |
| 4 | How You’d Use the vFarm Experience |
| 5 | Early Access Readiness |
| 6 | Founding Buyer Fit |

## Questions

| # | Page | Question | Entry ID | Type | Required | Options (exact, in order) | Site JSON key |
|---|---|---|---|---|---|---|---|
| 1 | 0 | Full name | `entry.50840312` | Short answer | Yes | — | `full_name` |
| 2 | 0 | Email address | `entry.2104531410` | Short answer | Yes | — | `email` |
| 3 | 0 | Organization / household name | `entry.2077476838` | Short answer | Yes | — | `organization_name` |
| 4 | 0 | Which best describes you or your organization? | `entry.1936985677` | Multiple choice (single-select) | Yes | `Individual / Household`<br>`Multi-unit residential`<br>`School / Education`<br>`Grocery / Retail`<br>`Restaurant / Hospitality`<br>`Community / Nonprofit`<br>`City / Municipality`<br>`Commercial operator`<br>`Research institution`<br>`Other` | `describes_you` |
| 5 | 1 | City | `entry.1514885324` | Short answer | Yes | — | `city` |
| 6 | 1 | State / Province / Region | `entry.1163339328` | Short answer | Yes | — | `region` |
| 7 | 1 | Country | `entry.1604495871` | Short answer | Yes | — | `country` |
| 8 | 2 | What is your primary use case for vFarm? | `entry.1058215081` | Multiple choice (single-select) | Yes | `Home food production`<br>`Multi-unit / residential food production`<br>`School / education`<br>`Grocery / local produce`<br>`Restaurant / food service`<br>`Community food access`<br>`City / local resilience`<br>`Research / testing`<br>`Commercial growing`<br>`Other` | `primary_use_case` |
| 9 | 2 | What would you like vFarm to help you accomplish? | `entry.1682579475` | Paragraph | Yes | — | `goal` |
| 10 | 3 | Approximately how much space could you make available? | `entry.999495372` | Multiple choice (single-select) | Yes | `Less than approximately 4 ft × 6 ft`<br>`Approximately 4 ft × 6 ft`<br>`Larger than 4 ft × 6 ft`<br>`Space for multiple units may be available`<br>`Not sure yet` | `space_available` |
| 11 | 3 | Do you have an indoor or protected space available? | `entry.9402884` | Multiple choice (single-select) | Yes | `Yes`<br>`No`<br>`Maybe/Not sure yet` | `indoor_space` |
| 12 | 3 | Is electrical power available near the potential installation area? | `entry.882046320` | Multiple choice (single-select) | Yes | `Yes`<br>`No`<br>`Maybe/Not sure yet` | `power_available` |
| 13 | 3 | Is a water source available near the potential installation area? | `entry.2133981396` | Multiple choice (single-select) | Yes | `Yes`<br>`No`<br>`Maybe/Not sure yet` | `water_available` |
| 14 | 3 | What type of environment would the first vFarm most likely operate in?  | `entry.1585575209` | Multiple choice (single-select) | Yes | `Indoor residential`<br>`Indoor commercial`<br>`School / education environment`<br>`Grocery / retail environment`<br>`Community / municipal environment`<br>`Controlled research environment`<br>`Protected non-indoor environment`<br>`Site not selected yet`<br>`Other` | `environment` |
| 15 | 3 | Are there any site constraints we should know about? | `entry.987370645` | Paragraph | No | — | `site_constraints` |
| 16 | 4 | How would you most want to monitor or interact with your vFarm? | `entry.644207337` | Checkboxes (multi-select) | No | `On-unit kiosk / display`<br>`Mobile phone`<br>`Web dashboard`<br>`Alerts / notifications`<br>`API / system integration`<br>`Not sure yet` | `monitor_preference` |
| 17 | 5 | How serious is your interest in becoming an early vFarm buyer or pilot partner?  | `entry.1676035490` | Linear scale 1–5 | Yes | `1`<br>`2`<br>`3`<br>`4`<br>`5`<br>Low label: `Just exploring ` · High label: `Ready to discuss an early pilot` | `interest_level` |
| 18 | 5 | When could you realistically consider a vFarm pilot or purchase? | `entry.1671208608` | Multiple choice (single-select) | Yes | `Just exploring - no timeline yet`<br>`More than 12 months`<br>`Within 6–12 months`<br>`Within 3–6 months`<br>`Ready to discuss within the next 3 months` | `timeline` |
| 19 | 5 | Which best describes your current budget readiness? | `entry.1863155229` | Multiple choice (single-select) | Yes | `Exploring - no budget identified yet`<br>`Planning / evaluating a budget`<br>`Budget may be available once details and pricing are clearer`<br>`Ready to discuss a paid pilot` | `budget_readiness` |
| 20 | 5 | Would you consider a small Early Access reservation commitment in exchange for priority consideration as pilot units become available? | `entry.1934982349` | Multiple choice (single-select) | Yes | `Yes`<br>`Maybe - I'd like more details first`<br>`No - I'm interested in updates only` | `reservation_openness` |
| 21 | 6 | Would you be willing to provide structured feedback during an Early Access pilot? | `entry.693333079` | Multiple choice (single-select) | Yes | `Yes`<br>`No`<br>`Maybe` | `feedback_willingness` |
| 22 | 6 | Anything else you'd like us to know? | `entry.1384991095` | Paragraph | No | — | `anything_else` |
| 23 | 6 | How did you hear about vFarm? | `entry.1893119528` | Multiple choice (single-select) | No | `LinkedIn`<br>`Short-form video`<br>`Bays Horizon team`<br>`Referral`<br>`Event`<br>`Partner`<br>`Search`<br>`Other` | `heard_about` |

Notes:

- "Other" in questions 4, 8, 14 and 23 is a plain option named `Other`, not
  Google Forms' free-text "Other:" choice, so there is no
  `entry.NNN.other_option_response` field.
- Question 16 is the only multi-select. In a direct submission each checked
  option is its own repeated `entry.644207337` value; in the response sheet
  Google Forms writes them joined with `, `.
- Question 17 submits the number as a string: `1` to `5`.
