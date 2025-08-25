import { apiInitializer } from "discourse/lib/api";
import I18n from "discourse-i18n";

export default apiInitializer((api) => {
  const currentLocale = I18n.currentLocale();
  I18n.translations[currentLocale].js.composer.graph_equation_placeholder = settings.graph_equation_placeholder;

  api.onToolbarCreate(toolbar => {
    toolbar.addButton({
      id: 'add-graph',
      group: 'extras',
      icon: 'chart-line',
      title: themePrefix('graph.graph_button_title'),
      perform: e => e.applySurround('[wrap="graph-embed"]\n', '\n[/wrap]', 'graph_equation_placeholder') // add_desmos_graph_euqation is a locale string: edit the text in locales/en.yml.
    });
  });

  api.decorateCookedElement((element, helper) => {
    let graphParentAll = element.querySelectorAll('div[data-wrap="graph-embed"]');

    if (graphParentAll !== null) {
      let graphParentArray = [...graphParentAll];

      // Iterate, in case there are multiple graphs in a single post
      graphParentArray.forEach(graphParent => {
        // Create new `div` element to show graph in
        let graphEq = graphParent.textContent.trim();
        let graphEmbed = document.createElement("div");
        graphEmbed.id = `graph-${graphParentArray.indexOf(graphParent)}`;
        graphParent.appendChild(graphEmbed);

        try {
          // Compile the expression
          const expression = graphEq;
          const expr = math.compile(expression);
  
          // Evaluate the expression/equation repeatedly for different values of x
          const xValues = math.range(-10, 10, 0.5).toArray();
          const yValues = xValues.map(function (x) {
            return expr.evaluate({x: x});
          });
          
          // Render the plot using Plotly
          const trace1 = {
            x: xValues,
            y: yValues,
            type: 'scatter'
          };
          const data = [trace1];
          
          // Plot the graph
          Plotly.newPlot(graphEmbed, data);
        } catch (err) {}
      });
    }
  });
});
