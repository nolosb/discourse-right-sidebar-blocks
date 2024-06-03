import { apiInitializer } from "discourse/lib/api";
import HomepageBlocks from "../components/homepage-blocks";

export default apiInitializer("1.14.0", (api) => {
  api.renderInOutlet("custom-homepage", HomepageBlocks);
});
