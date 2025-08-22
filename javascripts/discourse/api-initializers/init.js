import { apiInitializer } from "discourse/lib/api";
import loadScript from "discourse/lib/load-script";
import I18n from "I18n";

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
    let graphParent = element.querySelector('[data-wrap="desmos-graph"]');
    if (graphParent !== null) {
      let graphEq = graphParent.textContent;
      let graphEmbed = document.createElement("div");
      graphEmbed.id = "graph";
      graphParent.appendChild(graphEmbed);
      functionPlot({
        target: '#graph',
        data: [
          {
            fn: graphEq,
          }
        ]
      });
    }
  });
  
});
