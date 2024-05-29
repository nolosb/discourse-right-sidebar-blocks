import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { getOwner } from "@ember/application";

const componentNameOverrides = {
  // avoids name collision with core's custom-html component
  "custom-html": "custom-html-chb",
};

export default class CustomHomepageBlocks extends Component {
  @tracked blocks = [];

  constructor() {
    super(...arguments);

    const blocksArray = [];

    JSON.parse(settings.blocks).forEach((block) => {
      block.internalName =
        block.name in componentNameOverrides
          ? componentNameOverrides[block.name]
          : block.name;

      if (getOwner(this).hasRegistration(`component:${block.internalName}`)) {
        block.classNames = `homepage-blocks__block ${block.name}__wrapper`;
        block.parsedParams = {};
        if (block.params) {
          block.params.forEach((p) => {
            block.parsedParams[p.name] = p.value;
          });
        }
        blocksArray.push(block);
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `The component "${block.name}" was not found, please update the configuration for discourse-right-sidebar-blocks.`
        );
      }
    });

    this.blocks = blocksArray;
  }
}
