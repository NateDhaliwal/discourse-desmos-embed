import { apiInitializer } from "discourse/lib/api";

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
});
