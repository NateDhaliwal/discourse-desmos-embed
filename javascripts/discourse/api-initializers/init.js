import { apiInitializer } from "discourse/lib/api";
import loadScript from "discourse/lib/load-script";
import I18n from "I18n";

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
  api.onPageChange((url, title) =>{
    const router = api.container.lookup('service:router');
    console.log(router.currentRoute.name);
  }
  api.decorateCookedElement((element, helper) => {
    let graphParentAll = element.querySelectorAll('div[data-wrap="graph-embed"]');
    console.log(graphParentAll);
    if (graphParentAll !== null) {
      // loadScript("https://unpkg.com/function-plot/dist/function-plot.js");
      // loadScript("https://cdnjs.cloudflare.com/ajax/libs/function-plot/1.25.1/function-plot.js");
      let graphParentArray = [...graphParentAll];
      console.log(graphParentArray);
      graphParentArray.forEach(graphParent => {
        let graphEq = graphParent.textContent;
        console.log(typeof graphEq);
        let graphEmbed = document.createElement("div");
        graphEmbed.id = "graph";
        graphParent.appendChild(graphEmbed);
        
        try {
          // compile the expression once
          const expression = graphEq;
          const expr = math.compile(expression);
    
          // evaluate the expression repeatedly for different values of x
          const xValues = math.range(-10, 10, 0.5).toArray();
          const yValues = xValues.map(function (x) {
            return expr.evaluate({x: x});
          });
    
          // render the plot using plotly
          const trace1 = {
            x: xValues,
            y: yValues,
            type: 'scatter'
          };
          const data = [trace1];
          Plotly.newPlot('graph', data);
        }
        catch (err) {
          console.error(err);
        }
        
      });
    }
  });
});
