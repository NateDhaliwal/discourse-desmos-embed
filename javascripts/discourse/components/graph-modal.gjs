import Component from "@glimmer/component";
import { action } from "@ember/action";
import DModal from "discourse/components/d-modal";

export default class GraphModal extends Component {
  get modalTitle() {
    return `Graph of ${this.args.model.graphEq}`;
  }

  @action
  loadGraph() {
    
  }
  
  <template>
    <DModal @title={{this.modalTitle}} @closeModal={{@closeModal}} {{on "load" this.loadGraph}} id="graph-modal">
      <div id="graph-eq"></div>
    </DModal>
  </template>
}
