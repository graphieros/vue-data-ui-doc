## Chart exports fixes

- PDF and PNG downloads can both finish when requested together programamtically.
- PNG and SVG export indicators stay active until all in-progress callbacks finish.
- Chart PDF downloads center the entire chart on a single page with margins on all sides, preserving its proportions. This also applies to very tall or wide charts.
- PDF downloads use A4 by default and support custom page aspect ratios. Automatic orientation chooses the portrait or landscape layout that displays the chart at the largest size. An explicit portrait or landscape setting takes precedence.
