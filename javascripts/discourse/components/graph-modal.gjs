import Component from "@glimmer/component";
import { action } from "@ember/object";
import { on } from "@ember/modifier";
import DButton from "discourse/components/d-button";
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
      const graphEmbed = document.getElementById(`graph-${this.args.model.graphIndex}`);
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
    } catch (e) {
      console.error(e);
    }
  }
  
  <template>
    <DModal @title={{this.modalTitle}} @closeModal={{@closeModal}} id="graph-modal">
      <DButton
        @icon="chart-line"
        @action={{this.loadGraph}}
        @label={{themePrefix "graph.load_graph_button_label"}}
        @title={{themePrefix "graph.load_graph_button_title"}}
        class="btn-text btn-icon"
      />
      <div id={{this.graphEmbedId}}></div>
    </DModal>
  </template>
}
