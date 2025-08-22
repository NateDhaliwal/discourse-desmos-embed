import { apiInitializer } from "discourse/lib/api";
import loadScript from "discourse/lib/load-script";
import I18n from "I18n";

export default apiInitializer((api) => {
  const curentLocale = I18n.currentLocale();
  console.log(currentLocale);
  I18n.translations[currentLocale].js.composer.desmos.add_desmos_graph_equation = "Add equation";
  api.onToolbarCreate(toolbar => {
    toolbar.addButton({
      id: 'add-desmos',
      group: 'extras',
      icon: 'chart-line',
      title: themePrefix('desmos.desmos_button_title'),
      perform: e => e.applySurround('[wrap="desmos-graph"]\n', '\n[/wrap]', 'desmos.add_desmos_graph_equation') // add_desmos_graph_euqation is a locale string: edit the text in locales/en.yml.
    });
  });

  api.decorateCookedElement((element, helper) => {
    let apiKey = settings.desmos_api_key;
    let graphParent = element.querySelector('[data-wrap="desmos-graph"]');
    if (graphParent !== null) {
      let graphEq = graphParent.textContent;
      loadScript(`https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6`).then(() => {
        let graphEmbed = element.createElement("div");
        graphEmbed.id = "graph";
        graphParent.appendChild(graphEmbed);
        let calculator = Desmos.GraphingCalculator(graphEmbed);
        calculator.setExpression({
          id: 'graph1',
          latex: graphEq.toString()
        });
      });
    }
  });
});
