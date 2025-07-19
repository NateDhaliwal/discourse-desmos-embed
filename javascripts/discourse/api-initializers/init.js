import { apiInitializer } from "discourse/lib/api";
import loadScript from "discourse/lib/load-script";

export default apiInitializer((api) => {
  api.onToolBarCreate(toolbar => {
    toolbar.addButton({
      id: 'add-desmos',
      group: 'extras',
      icon: 'chart-line',
      title: 'pop_format.title',
      perform: (e) => e.applySurround('[wrap="desmos-graph"]\n', '\n[/wrap]', 'add_desmos_graph')
    });
  });

  api.decorateCookedElement((element, helper) => {
    let apiKey = settings.desmos_api_key;
    let graphParent = element.querySelector('[data-wrap="desmos-graph"]');
    let graphEq = graph.textContent;
    loadScript(`https://www.desmos.com/api/v1.11/calculator.js?apiKey=${apiKey}`).then(() => {
      let graphEmbed = element.createElement("div");
      graphEmbed.id = "graph";
      graphParent.appendChild(graphEmbed);
      let calculator = Desmos.GraphingCalculator(graphEmbed);
      calculator.setExpression({
        id: 'graph1',
        latex: graphEq.toString()
      });
    });
  });
});
