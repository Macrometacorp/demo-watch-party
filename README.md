<h1 align="center">Macrometa Watch Party</h1>

## Overview

This demo showcases a video streaming platform with contextual faceted search and a watch party feature where users anywhere around the globe can watch a synchronized video so all viewers can watch the video simultaneously. The watch party can be shared using a unique URL, and all viewers can chat in real-time while watching the video together. 

The app uses Macrometa Query Workers deployed to Akamai Edge Workers, Macrometa Graphs and Search, and videos are streaming from the Akamai CDN.

### **Live Demo:** https://macrometacorp.github.io/demo-watch-party/

**Homepage:**

![landing-page.png](landing-page.png)

### Macrometa GDN setup

Step 1. Create the following collections in your federation.

Follow the following steps for each of these collections:

    ```
    assets (document, global)
    genres (document, global)
    credits (document, global)
    watch_party (document, global)
    asset_credit_edge (graph-edge, global)
    genres_asset_edge (graph-edge, local)
    ```

1. On the side menu, click **Collections**.
2. Click **New Collection**.
3. Click **Document Store** or **Graph Edge** based on the list of collections below.
4. In Collection Name, enter a **Collection** name listed below.
5. Click **Create**.

Step 2. Create the following persistent indexes on the collection.

Follow the following steps for each of these collection indexes:

    | **Collection** | **Field**      |
    | -------------- | -------------- |
    | assets         | id             |
    | assets         | title          |
    | assets         | original_title |
    | assets         | overview       |
    | credits        | name           |
    
1. On the side menu, click **Collections**.
2. Click the **collection** from the list above.
3. Click **indexes** in the upper left of the collections window.
4. Click on the **plus button** in the right side of the collection window.
5. Choose **persistent index** from the dropdown selector.
6. Add the field listed in the table above.
7. Click **Create**.

Step 3. Create the following search views in your federation:

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
    
1. On the side menu, click **Search Views**.
2. Click **New View**.
3. Name the view according to the view description above.
4. Add the primary sort field.
5. Add a mapping definition by choosing the collection from the drop down.
6. Add a **field Name**.
7. Choose the **Analyzer**.
8. Add the other field names for the views listed above.
10. Click **Create**.

Step 4. Create the following graph in your federation:
   
   **`OTT`**
   | **Edge Definitions** | **From Collections** | **To Collections** |
   | -------------------- | -------------------- | ------------------ |
   | genres_asset_edge | genres | assets |
   | asset_credit_edge | assets | credits |
   
1. On the side menu, click **Graphs**.
2. Click **New Graph**
3. Name the graph **OTT**.
4. Name the first edge definition and select the from and to collections from the dropdowns.
5. Click the plus sign to the right of the first edge definition
6. Fill out the information for the second edge definition listed above.
10. Click **Create**.

Step 5. Create the following Query workers in your federation:

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

Do the following steps for each Query Worker listed above. The code for each query workers in lined to in the above sentence.

1. On the side menu, click **Query Workers**.
2. Copy the code of the first Query Worker and paste it into the editor.
3. Click the **run query** button to make sure you see results.
4. Click **Save Query**.
5. Name the query and click **Create**.
6. Click **New Query**.
7. Start back at step one until you have created all 7 Query Workers

On the development machine, run the following commands in a console:

    git clone https://github.com/Macrometacorp/demo-watch-party.git
    git fetch
    cd demo-watch-party/react-app
    npm install
    npm run start
