| Route                  | User goal                   | Primary content             | Static entity/index      | URL state        | Required states                     | Primary nav |
| ---------------------- | --------------------------- | --------------------------- | ------------------------ | ---------------- | ----------------------------------- | ----------- |
| `/`                    | Hiểu dự án, xem highlight   | releases, featured entities | homepage view model      | none             | loading, stale, missing media       | Yes         |
| `/explore`             | Search/browse catalog       | song/chart results          | search index             | query params     | loading, empty, error, offline      | Yes         |
| `/songs/:songId`       | Lookup song/chart           | song + charts + relations   | song by ID               | route ID         | not found, uncertain, missing media | No          |
| `/packs/:packId`       | Xem pack và songs           | pack + song refs            | pack by ID               | route ID         | empty, not found                    | No          |
| `/partners/:partnerId` | Xem partner                 | partner + relations         | partner by ID            | route ID         | spoiler, missing media              | No          |
| `/story`               | Browse story structure      | story index                 | story index              | optional section | spoiler, unavailable                | Yes/Wiki    |
| `/game/:topic`         | Đọc system/topic            | topic content               | topic by ID              | route ID         | stale, unavailable                  | Yes/Wiki    |
| `/information`         | Current/project information | releases/events/status      | information model        | optional section | stale, unavailable                  | Yes         |
| `/wiki`                | Category hub                | taxonomy                    | generated category index | none             | empty                               | Yes         |
| `/about`               | Hiểu fan project            | editorial                   | static content           | none             | normal                              | Footer      |
| `/legal`               | Disclaimer/correction path  | legal content               | static content           | none             | normal                              | Footer      |
| `/settings`            | Theme/preferences           | settings controls           | local preferences        | none             | storage error                       | Header      |
| `*`                    | Recovery                    | navigation/help             | none                     | attempted URL    | 404                                 | No          |
