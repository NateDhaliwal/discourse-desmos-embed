import { apiInitializer } from "discourse/lib/api";
import loadScript from "discourse/lib/load-script";
import I18n from "I18n";
import functionPlot from "function-plot";

export default apiInitializer((api) => {
  const currentLocale = I18n.currentLocale();
  I18n.translations[currentLocale].js.composer.desmos_graph_equation_placeholder = settings.desmos_graph_equation_placeholder;
  
  api.onToolbarCreate(toolbar => {
    toolbar.addButton({
      id: 'add-desmos',
      group: 'extras',
      icon: 'chart-line',
      title: themePrefix('desmos.desmos_button_title'),
      perform: e => e.applySurround('[wrap="desmos-graph"]\n', '\n[/wrap]', 'desmos_graph_equation_placeholder') // add_desmos_graph_euqation is a locale string: edit the text in locales/en.yml.
    });
  });
  
  api.decorateCookedElement((element, helper) => {
    let graphParentAll = document.querySelector('[data-wrap="desmos-graph"]');
    console.log(graphParentAll);
    if (graphParentAll !== null) {
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
              fn: "x^2"
            }
          ]
        });
      });
    }
  });
});
