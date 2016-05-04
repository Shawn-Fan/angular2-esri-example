import { Component, ViewChild } from 'angular2/core';
import { MapComponent } from './map.component';
import { SearchComponent } from './search.component';
import { LayerComponent } from './layer.component';
import { BasemapSelect } from './basemapselect.component';

@Component({
  directives: [MapComponent, SearchComponent, LayerComponent, BasemapSelect],
    selector: 'my-app',
    template:
    `
    <div class="row">
      <div class="col-sm-8 col-md-9 col-lg-10 map-col">
        <esri-map [itemId]="itemId" [options]="mapOptions" (mapLoaded)="onMapLoad($event)">
          <esri-search [options]="searchOptions"></esri-search>
        </esri-map>
      </div>
      <div class="col-sm-4 col-md-3 col-lg-2">
        <h3>{{title}}</h3>
        <esri-layer></esri-layer>
        <h4>Basemap</h4>
        <div>
          <basemap-select (basemapSelected)="onBasemapSelected($event)"></basemap-select>
        </div>
      </div>
    </div>
    `
})
export class AppComponent {

  // references to child components
  @ViewChild(MapComponent) mapComponent:MapComponent;
  @ViewChild(SearchComponent) searchComponent:SearchComponent;
  @ViewChild(LayerComponent) layerComponent:LayerComponent;
  @ViewChild(BasemapSelect) basemapSelect:BasemapSelect;

  title = 'Map Title';

  // map config
  itemId = '8e42e164d4174da09f61fe0d3f206641';
  public mapOptions = {
    basemap: "gray",
    center: [-97, 38], // lon, lat
    zoom: 5
  };

  // search config
  public searchOptions = {
    enableButtonMode: true, //this enables the search widget to display as a single button
    enableLabel: false,
    enableInfoWindow: true,
    showInfoWindowOnSelect: false,
  };

  // once the map loads
  onMapLoad(response) {
    const map = response.map;
    // bind the search dijit to the map
    this.searchComponent.setMap(map);
    // initialize the leged dijit with map and layer infos
    // this.layerComponent.init(map, response.layerInfos);
    // set the selected basemap
    this.basemapSelect.selectedBasemap = response.basemapName;
    // bind the map title
    this.title = response.itemInfo.item.title;
    //bind the layer list
    this.layerComponent.init(response);
  }

  // set map's basemap in response to user changes
  onBasemapSelected(basemapName) {
    this.mapComponent.setBasemap(basemapName);
  }
}
