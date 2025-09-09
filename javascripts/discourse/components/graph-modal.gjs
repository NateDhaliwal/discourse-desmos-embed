import Component from "@glimmer/component";
import { action } from "@ember/object";
import { on } from "@ember/modifier";
import DModal from "discourse/components/d-modal";

export default class GraphModal extends Component {
  get modalTitle() {
    return `Graph of ${this.args.model.graphEq}`;
  }

  get graphEmbedId() {
    return `graph-${this.args.model.graphIndex}`;
  }

  @action
  loadGraph() {
    try {
      console.log(`${this.args.model.postEl}\n${this.args.model.graphIndex}\n${this.args.model.graphEq}`)
      const graphEmbed = this.args.model.postEl.getElementById(`graph-${this.args.model.graphIndex}`);
      // Compile the expression
      const expression = this.args.model.graphEq;
      const expr = math.compile(expression); // eslint-disable-line no-undef

      // Evaluate the expression/equation repeatedly for different values of x
      const xValues = math.range(-10, 10, 0.5).toArray(); // eslint-disable-line no-undef
      const yValues = xValues.map(function (x) {
        return expr.evaluate({ x });
      });

      // Render the plot using Plotly
      const trace1 = {
        x: xValues,
        y: yValues,
        type: "scatter",
      };
      const data = [trace1];

      // Plot the graph
      Plotly.newPlot(graphEmbed, data); // eslint-disable-line no-undef
    } catch {
      // Do nothing
    }
  }
  
  <template>
    <DModal @title={{this.modalTitle}} @closeModal={{@closeModal}} {{on "click" this.loadGraph}} id="graph-modal">
      <div id={{this.graphEmbedId}}></div>
    </DModal>
  </template>
}
