<h1 align="center">Macrometa Watch Party</h1>

### **Live Demo:** https://macrometacorp.github.io/demo-watch-party/

## Overview

**Dashboard:**

![landing-page.png](landing-page.png)

### Macrometa GDN setup

1. Create the following collections in your federation:

    ```
    assets (global)
    genres (global)
    credits (global)
    watch_party (global)
    asset_credit_edge (graph-edge, global)
    genres_asset_edge (graph-edge, local)
    ```

2. Create the following persistent indexes on the collection:

    | **Collection** | **Field**      |
    | -------------- | -------------- |
    | assets         | id             |
    | assets         | title          |
    | assets         | original_title |
    | assets         | overview       |
    | credits        | name           |

3. Create the following search views in your federation:

    **`asset_credit_view`** with Primary sort field `popularity`
    | **Mapping - Collection** | **Field** | **Analyzer** |
    | ------------------------ | -------------- | ------------ |
    | assets | title | text_en |
    | assets | original_title | text_en |
    | assets | overview | text_en |
    | credits | name | text_en |

    **`asset_type_view`**
    | **Mapping - Collection** | **Field** | **Analyzer** |
    | ------------------------ | ---------- | ------------ |
    | genres_asset_edge | asset_type | identity |

4. Create the following graph in your federation:
   **`OTT`**
   | **Edge Definitions** | **From Collections** | **To Collections** |
   | -------------------- | -------------------- | ------------------ |
   | genres_asset_edge | genres | assets |
   | asset_credit_edge | assets | credits |

5. Create the following Query workers in your federation:

    ```
    getMovieAssetsByGenre
    getTopRatedMovies
    getTopRatedTvSeries
    getTvSeriesAssetsByGenre
    getWatchPartyDetails
    searchByAsset
    searchByCredits
    ```

Refer to this link to add content for each Query worker: **[Query Workers](query-worker/query-worker.md)**

On the development machine, run the following commands in a console:

    git clone https://github.com/Macrometacorp/demo-watch-party.git
    git fetch
    cd demo-watch-party/react-app
    npm install
    npm run start
