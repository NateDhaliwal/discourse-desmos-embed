import { apiInitializer } from "discourse/lib/api";
import loadScript from "discourse/lib/load-script";
import I18n from "I18n";
//import functionPlot from "function-plot";

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
    console.log(graphParentAll);
    if (graphParentAll !== null) {
      // loadScript("https://unpkg.com/function-plot/dist/function-plot.js");
      // loadScript("https://cdnjs.cloudflare.com/ajax/libs/function-plot/1.25.1/function-plot.js");
      let graphParentArray = [...graphParentAll];
      console.log(graphParentArray);
      graphParentArray.forEach(graphParent => {
        let graphEq = graphParent.textContent;
        let graphEmbed = document.createElement("div");
        graphEmbed.id = "graph";
        graphParent.appendChild(graphEmbed);
        
        functionPlot({
          target: "#graph",
          width: 500,
          height: 500,
          grid: true,
          data: [
            {
              fn: graphEq.toString()
            }
          ]
        });
      });
    }
  });
});
