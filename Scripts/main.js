var view;

const LoadMap = () => {
  require(["esri/Map", "esri/views/MapView"], (Map, MapView) => {
    var map = new Map({
      basemap: "hybrid",
    });

    view = new MapView({
      id: "view",
      container: "viewDiv",
      map: map,
      zoom: 3,
      popup: {
        dockEnabled: true,
        dockOptions: {
          breakpoint: false,
          buttonEnabled: false,
          position: "bottom-center",
        },
      },
    });

    ViewUI();

    HerarchicalSearch.LoadAllStates();

    document.querySelector("#ddlStates").onchange = () => {
      const stateName = document.querySelector("#ddlStates").value;
      HerarchicalSearch.LoadCountiesByState(stateName);
      HerarchicalSearch.ZoomToState(stateName);
    };

    document.querySelector("#ddlCounties").onchange = () => {
      const name = document.querySelector("#ddlCounties").value;
      HerarchicalSearch.ZoomToCounties(name);
    };
  });
};

const ViewUI = () => {
  require([
    "esri/widgets/Home",
    "esri/widgets/Compass",
    "esri/widgets/ScaleBar",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Search",
    "esri/widgets/Expand",
  ], function (Home, Compass, ScaleBar, BasemapToggle, Search, Expand) {
    view.ui.add(["app-title"], "top-left");

    view.ui.add(
      new Home({
        view: view,
      }),
      "top-left"
    );
    view.ui.move(["zoom"], "top-left");

    view.ui.add(
      new Compass({
        view: view,
      }),
      "top-left"
    );

    view.ui.add(
      new ScaleBar({
        view: view,
      }),
      "bottom-left"
    );

    view.ui.add(
      new BasemapToggle({
        view: view,
        nextBasemap: "dark-gray",
      }),
      "bottom-right"
    );

    const searchWidget = new Search({
      view: view,
    });

    view.ui.add(searchWidget, {
      position: "top-right",
      index: 2,
    });

    let hSearch = new Expand({
      expandIconClass: "esri-icon-layer-list", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
      view: view,
      content: document.querySelector("#app-search"),
      expanded: true,
    });
    view.ui.add(hSearch, "top-right");
  });
};
