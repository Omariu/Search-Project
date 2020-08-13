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
    });

    ViewUI();
  });
};

const ViewUI = () => {
  require([
    "esri/widgets/Home",
    "esri/widgets/Compass",
    "esri/widgets/ScaleBar",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Search",
  ], function (Home, Compass, ScaleBar, BasemapToggle, Search) {
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
        nextBasemap: "dark-gary",
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
  });
};
