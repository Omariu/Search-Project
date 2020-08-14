let HerarchicalSearch = {};
let _stateFeatures, _countiesFeatures;

let polygonSymbol = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: [51, 51, 204, 0.2],
  style: "solid",
  outline: {
    color: "red",
    width: 2,
  },
};

HerarchicalSearch.LoadAllStates = () => {
  require(["esri/tasks/QueryTask", "esri/tasks/support/Query"], function (
    QueryTask,
    Query
  ) {
    let queryTask = new QueryTask({
      url:
        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2",
    });

    let query = new Query();
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.where = "1=1";

    queryTask.execute(query).then((results) => {
      let ddlStates = document.querySelector("#ddlStates");
      _stateFeatures = results.features;
      results.features.map((feature) => {
        const state_name = feature.attributes.state_name;
        let opt = document.createElement("option");
        opt.value = state_name;
        opt.innerHTML = state_name;
        ddlStates.appendChild(opt);
      });
    });
  });
};

HerarchicalSearch.LoadCountiesByState = (stateName) => {
  require(["esri/tasks/QueryTask", "esri/tasks/support/Query"], function (
    QueryTask,
    Query
  ) {
    let queryTask = new QueryTask({
      url:
        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/3",
    });

    let query = new Query();
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.where = `state_name = '${stateName}'`;

    queryTask.execute(query).then((results) => {
      let ddlCounties = document.querySelector("#ddlCounties");
      _countiesFeatures = results.features;
      ClearDDl("#ddlCounties");
      results.features.map((feature) => {
        const name = feature.attributes.name;
        let opt = document.createElement("option");
        opt.value = name;
        opt.innerHTML = name;
        ddlCounties.appendChild(opt);
      });
    });
  });
};

HerarchicalSearch.ZoomToState = (statename) => {
  view.graphics.removeAll();

  require(["esri/Graphic"], function (Graphic) {
    _stateFeatures.map((feature) => {
      if (feature.attributes.state_name === statename) {
        var graphic = new Graphic({
          geometry: feature.geometry,
          symbol: polygonSymbol,
          attributes: feature.attributes,
          popupTemplate: {
            title: "{state_name}",
            content: "state_name: {state_name} - pop2000:{pop2000}",
          },
        });

        view.graphics.add(graphic);
        view.goTo(graphic);
      }
    });
  });
};

HerarchicalSearch.ZoomToCounties = (name) => {
  view.graphics.removeAll();
  require(["esri/Graphic"], function (Graphic) {
    _countiesFeatures.map((feature) => {
      if (feature.attributes.name === name) {
        var graphic = new Graphic({
          geometry: feature.geometry,
          symbol: polygonSymbol,
          attributes: feature.attributes,
          popupTemplate: {
            title: "{name}",
            content: "{state_name} -{name}",
          },
        });

        view.graphics.add(graphic);
        view.goTo(graphic);
      }
    });
  });
};

const ClearDDl = (node) => {
  let select = document.querySelector(node);
  let length = select.options.length;
  for (i = length - 1; i >= 0; i--) {
    select.options[i] = null;
  }
};
